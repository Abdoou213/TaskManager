import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login',  {
        email: email,
        password: password,
      });
      console.log('Login successful:', response.data);
      localStorage.setItem('jwtToken', response.data.token);
      setLoginSuccess(true);
      setLoginError(null);
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Login failed. Please check your credentials.');
      setLoginSuccess(false);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {loginSuccess && <p className="success-message">Login successful!</p>}
      {loginError && <p className="error-message">{loginError}</p>}
    </div>
  );
}

export default LoginForm;
