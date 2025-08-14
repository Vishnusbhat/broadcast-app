import "./login.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  get,
  query,
  orderByChild,
  equalTo,
  orderByKey,
} from "firebase/database";
import { ref, set, rtdb } from "../firebase";
import { useView } from "../context/useView";
import { toast } from "react-toastify";

const Login = () => {
  const { userName, pushView, setUserName, setUserID } = useView();
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible((prev) => !prev);

  const handleLogin = async () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted((prev) => !prev);
    }, 100);
    try {
      const usersRef = ref(rtdb, `users`);
      const q = query(usersRef, orderByChild("userName"), equalTo(userName));
      const querySnapshot = await get(q);
      const userObj = Object.values(querySnapshot.val())

      if (!querySnapshot.exists()) {
        toast.error("User not found");
        return;
      }

      const userID = userObj[0].id;
      setUserID(userID);
      const userIDStr = String(userID);
      const passwordRef = ref(rtdb, `password`);
      const pq = query(passwordRef, orderByKey(), equalTo(userIDStr));
      const passwordSnapshot = await get(pq);
      const passObj = Object.values(passwordSnapshot.val())
      const dbPassword = passObj[0].password;

      if (dbPassword !== password) {
        toast.error("Incorrect Password!");
        setSubmitted(false);
        return;
      }

      await set(ref(rtdb, `status/${userID}`), {
        state: "online",
        last_changed: Date.now()
      });
      pushView("home");
    } catch (error) {
      console.error("Login error:", error.message);
      setSubmitted(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form login-shadow"></div>
      <div className="login-form">
        <div className="logo">SwiftCast</div>
        <div className="input-container">
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="text-input"
            placeholder="User Name"
          />
          <div className="password-container">
            <input
              type={visible ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-input"
              placeholder="Password"
            />
            <div
              onClick={toggleVisibility}
              className="eye"
              aria-label="Toggle password visibility"
            >
              {visible ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </div>
          </div>

          {/* <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setUserPhoneNumber(e.target.value)}
            className="text-input"
            placeholder="Phone Number"
          /> */}
          <div
            className={`submit-button ${submitted && "clicked"}`}
            onClick={handleLogin}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
