import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Make sure to import Routes from 'react-router-dom'
import RegistrationForm from './Components/Registration/RegistrationForm';
import LoginForm from './Components/Login/LoginForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        {/* ...other routes */}
      </Routes>
    </Router>
  );
}

export default App;
