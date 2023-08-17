import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationError, setRegistrationError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', { email, password });
      console.log('Registration successful:', response.data);
      setRegistrationSuccess(true);
      setRegistrationError(null);
    } catch (error) {
      console.error('Registration error:', error);
      setRegistrationError('Registration failed. Please try again.');
      setRegistrationSuccess(false);
    }
  };

  return (
    <div className="registration-form">
      <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
      {registrationSuccess && <p className="success-message">Registration successful!</p>}
      {registrationError && <p className="error-message">{registrationError}</p>}
    </div>
  );
}

export default RegistrationForm;
