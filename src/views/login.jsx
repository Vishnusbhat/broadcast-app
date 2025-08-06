import Common from "../common";
import "./login.css";
import { useState } from "react";
const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);


  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted((prev) => !prev);
    }, 100);
    localStorage.setItem("userName", userName);
    localStorage.setItem("phoneNumber", phoneNumber);
    window.location.reload();
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
          {/* <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-input"
            placeholder="Password"
          /> */}
          
          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
