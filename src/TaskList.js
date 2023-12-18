import React from "react";
import { format, parseISO } from "date-fns";
import "./styles/TaskList.css";

export default function TaskList({ tasks, handleDelete, markComplete }) {
  if (!tasks) {
    return <div>No tasks available</div>;
  }

  const formatDate = (dateString) => {
    return dateString ? format(parseISO(dateString), "MMM do yy") : "";
  };

  const formatTime = (timeString) => {
    return timeString ? format(parseISO(`1970-01-01T${timeString}`), "h:mm a") : "";
  };

  const handleComplete = (taskId) => {
    markComplete(taskId);
  };


  return (
    <div className="task-list">
      <h2>Todo List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Task Date</th>
            <th>Task Time</th>
            <th>Priority</th>
            <th>Assignee</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{formatDate(task.taskDate)}</td>
              <td>{formatTime(task.taskTime)}</td>
              <td>{task.priority}</td>
              <td>{task.assignee}</td>
              <td>{task.status || 'In-progress'}</td>
              <td>
                <button onClick={() => handleComplete(task.id)}>Complete</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
