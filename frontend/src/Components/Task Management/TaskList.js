import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TaskList({ userId }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: {
          Authorization: token, // Include the token in the headers
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Fetching tasks error:', error);
    }
  };



  return (
    <div className="task-list">
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
