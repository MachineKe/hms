import axios from 'axios';
import React, { useState } from 'react';
import Error from '../Components/Error';
import Loader from '../Components/Loader';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', { email, password });
      setLoading(false);
      const result = response.data;
      localStorage.setItem('currentUser', JSON.stringify(result));
      window.location.href = '/home';
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && <Error message={error} />}
          <div className="bs">
            <h2>Login</h2>
            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary mt-3" onClick={login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
