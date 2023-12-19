import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import "./styles/TaskList.css";

export default function TaskList({ tasks, handleDelete, markComplete , handleEdit}) {
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

  const handleComplete = (taskId) => {
    markComplete(taskId);
  };

//<<<<<<< Tasklist-Overlay
  const handleTaskClick = (task) => {
    console.log("task = ")
    console.log(task)
    setSelectedTask(task);
    setShowOverlay(true);
  };

  const handleSave = () => {
    //console.log("handleSave func in TaskList.js")
    handleEdit(selectedTask)

    // tasks.map((task) => {
    //   if (task.id === selectedTask.id) {
    //     return selectedTask;
    //   }
    //   return task;
    // });

    //we need to return this to something and use it
    //we also need to do this in app.jsx as tasks is a state variable and we cant edit it this way

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
                <button onClick={() => handleComplete(task.id)}>Complete</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
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
                Task Date:
                <input
                  type="date"
                  value={selectedTask.taskDate}
                  onChange={(e) =>{
                    console.log("changing date")
                    const newTask = structuredClone(selectedTask)
                    newTask["taskDate"] = e.target.value
                    setSelectedTask(newTask)
                  }
                    //setSelectedTask({ ...selectedTask, taskDate: e.target.value })
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
              <button onClick={() => handleSave()}>Save</button>
              {/* <button onClick={handleSave}>Save</button> */}
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
