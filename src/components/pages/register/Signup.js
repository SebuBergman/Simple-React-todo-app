import React, {useState} from 'react';
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';

import '../../../Forms.css'

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navigate('/todolist');
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <main>
      <section>
          <div className="center">
            <div className="auth">
            <h1 className="title">Register</h1>
            <form className="form">
              <div>
                <input
                  className="input"
                  type="email"
                  label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <input
                  className="input"
                  type="password"
                  label="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
              <Button type="submit" onClick={onSubmit} variant="contained" className="button">Sign up</Button>
            </form>
            <p>
              Already have an account?
              <NavLink to="/">
                Sign in
              </NavLink>
            </p>
            </div>
          </div>
      </section>
    </main>
  );
};

export default Signup;