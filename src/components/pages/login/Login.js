import React, {useState} from 'react';
import Button from '@mui/material/Button';
import { useNavigate, NavLink } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';

import '../../../Forms.css'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
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

  return (
    <>
      <main>
        <section>
          <div className="center">
            <div className="auth">
              <h1 className="title">Login</h1>
              <form name="registration_form" className="form">
                <div>
                  <input
                    className="input"
                    id="email-address"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <input
                    className="input"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Button type="submit" onClick={handleSubmit} variant="contained" className="button">Login</Button>
                </div>
              </form>

            <p className="LoginText">
              No account yet?
              <NavLink to="/signup">
                Sign up
              </NavLink>
            </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;