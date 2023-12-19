import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import "./styles/TaskList.css";

export default function TaskList({ tasks, handleDelete, markComplete }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  if (!tasks) {
    return <div>No tasks available</div>;
  }

  const formatDate = (dateString) => {
    return dateString ? format(parseISO(dateString), "MMM do yy") : "";
  };

  const formatTime = (timeString) => {
    return timeString ? format(parseISO(`1970-01-01T${timeString}`), "h:mm a") : "";
  };

  const handleAction = (event, taskId, actionType) => {
    event.stopPropagation();
    if (actionType === "complete") {
      markComplete(taskId);
    } else if (actionType === "delete") {
      handleDelete(taskId);
    }
  };

//<<<<<<< Tasklist-Overlay
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowOverlay(true);
  };

  const handleSave = () => {
    tasks.map((task) => {
      if (task.id === selectedTask.id) {
        return selectedTask;
      }
      return task;
    });
    // Update the tasks state with the updatedTasks array
    // You can use a function passed as a prop to update the state in the parent component
    // For example: handleUpdateTasks(updatedTasks);
    setShowOverlay(false);
  };

  const handleCancel = () => {
    setShowOverlay(false);
  };
//=======
//>>>>>>> main

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
            <tr key={task.id} onClick={() => handleTaskClick(task)}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{formatDate(task.taskDate)}</td>
              <td>{formatTime(task.taskTime)}</td>
              <td>{task.priority}</td>
              <td>{task.assignee}</td>
              <td>{task.status || 'In-progress'}</td>
              <td>
                <button onClick={(e) => handleAction(e, task.id, "complete")}>Complete</button>
                <button onClick={(e) => handleAction(e, task.id, "delete")}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <h3>Task Details</h3>
            <div>
              <label>
                Task Title:
                <input
                  type="text"
                  maxLength={50}
                  value={selectedTask.title}
                  onChange={(e) =>
                    setSelectedTask({ ...selectedTask, title: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                Task Date:
                <input
                  type="date"
                  value={selectedTask.taskDate}
                  onChange={(e) =>
                    setSelectedTask({ ...selectedTask, taskDate: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                Task Time:
                <input
                  type="time"
                  value={selectedTask.taskTime}
                  onChange={(e) =>
                    setSelectedTask({ ...selectedTask, taskTime: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                Priority:
                <select
                  value={selectedTask.priority}
                  onChange={(e) =>
                    setSelectedTask({ ...selectedTask, priority: e.target.value })
                  }
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Assignee:
                <input
                  type="text"
                  maxLength={50}
                  value={selectedTask.assignee}
                  onChange={(e) =>
                    setSelectedTask({ ...selectedTask, assignee: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                Status:
                <select
                  value={selectedTask.status}
                  onChange={(e) =>
                    setSelectedTask({ ...selectedTask, status: e.target.value })
                  }
                >
                  <option value="In-progress">In-progress</option>
                  <option value="Review">Review</option>
                </select>
              </label>
            </div>
            <div>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
