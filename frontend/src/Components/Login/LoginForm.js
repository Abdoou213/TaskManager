import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm({ setUserId }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: email,
        password: password,
      });
      console.log('Login successful:', response.data);
      
      localStorage.setItem('token', response.data.token); // Store the token in local storage
      setUserId(response.data.userId); // Set the user ID in App component state
      setLoginError(null);
      
      navigate('/tasks'); // Redirect to tasks page
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Login failed. Please check your credentials.');
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
      {loginError && <p className="error-message">{loginError}</p>}
      
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default LoginForm;
