import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';

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
        <div>
          <div>
            <h1>Todo-app</h1>
            <form>
              <div>
                <label htmlFor="email-address">Email address</label>
                <input
                  type="email"
                  label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  label="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create password"
                />
              </div>
              <button type="submit" onClick={onSubmit}>
                Sign up
              </button>
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