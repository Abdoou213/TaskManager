import React from 'react';

function TaskDetail({ task }) {
  return (
    <div className="task-detail">
      <h2>Task Detail</h2>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      {/* Display other task details */}
    </div>
  );
}

export default TaskDetail;
