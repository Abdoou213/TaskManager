import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegistrationForm from './Components/Registration/RegistrationForm';
import LoginForm from './Components/Login/LoginForm';
import TaskForm from './Components/Task Management/TaskForm'; 
import TaskList from './Components/Task Management/TaskList'; 
import TaskDetail from './Components/Task Management/TaskDetail'; 
import TaskEditForm from './Components/Task Management/TaskEditForm'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} /> 
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/create" element={<TaskForm />} />
        <Route path="/tasks/:taskId" element={<TaskDetail />} /> 
        <Route path="/tasks/:taskId/edit" element={<TaskEditForm />} /> 
        {/* ...other routes */}
      </Routes>
    </Router>
  );
}

export default App;
