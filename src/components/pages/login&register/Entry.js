import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import IconButton from "@mui/material/IconButton";

import "../../../Forms.css";

const Login = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = UserAuth();
  const { createUser } = UserAuth();

  const handleRegistration = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/todolist");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navigate("/todolist");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  const handleActive = (event) => {
    setIsActive((current) => !current);
  };

  return (
    <>
      <main>
        <div
          className={
            isActive ? "entrycontainer right-panel-active" : "entrycontainer"
          }
          id="container"
        >
          <div className="form-container register-container">
            <form name="registration_form">
              <h1>Register here.</h1>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
              <button type="submit" onClick={onLoginSubmit}>
                Register
              </button>
            </form>
          </div>

          <div className="form-container login-container">
            <form action="#">
              <h1>Login here.</h1>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
              <button type="submit" onClick={handleRegistration}>
                Login
              </button>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="title">Hello friends</h1>
                <p>if you have an account, login and add some todos</p>
                <button className="ghost" id="login" onClick={handleActive}>
                  Login
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="title">Start your todo tracking now</h1>
                <p>
                  if you don't have an account yet, join us and register now
                </p>
                <button className="ghost" id="register" onClick={handleActive}>
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
