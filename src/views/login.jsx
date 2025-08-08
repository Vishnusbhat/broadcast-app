import "./login.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useView } from "../context/useView";

const Login = () => {
  const { userName, phoneNumber, pushView, setUserName, setUserPhoneNumber } = useView();
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible((prev) => !prev);

  const handleSubmit = async () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted((prev) => !prev);
    }, 100);
    try {
      await addDoc(collection(db, "users"), {
        userName: userName,
        phoneNumber: phoneNumber,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      setSubmitted(false);
    }
    localStorage.setItem("userName", userName);
    localStorage.setItem("phoneNumber", phoneNumber);
    pushView('broadcast');
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

          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setUserPhoneNumber(e.target.value)}
            className="text-input"
            placeholder="Phone Number"
          />
          <div
            className={`submit-button ${submitted && "clicked"}`}
            onClick={handleSubmit}
          >
            Submit
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
