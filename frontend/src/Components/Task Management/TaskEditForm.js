import React, { useState } from 'react';
import axios from 'axios';

function TaskEditForm({ task }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          title: title,
          description: description,
        }
      );
      console.log('Task updated:', response.data);
      // Handle any success notifications or redirects here
    } catch (error) {
      console.error('Task update error:', error);
      // Handle error notifications here
    }
  };

  return (
    <div className="task-edit-form">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
}

export default TaskEditForm;
