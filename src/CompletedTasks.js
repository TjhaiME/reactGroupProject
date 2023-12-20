import React from "react";
import { format, parseISO } from "date-fns";
import "./styles/TaskList.css"; // Reusing the TaskList styles

export default function CompletedTasks({ completedTasks , handleDelete}) {

  const handleAction = (event, taskId) => {
    event.stopPropagation();
    //setShowOverlay(false);
    handleDelete(taskId);
  };

  return (
    <div className="task-list">
      <h2>Completed Tasks</h2>
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
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {completedTasks.map((task) => {
            const formattedDate = format(parseISO(task.taskDate), "MMM do yy");
            const formattedTime = format(
              parseISO(`1970-01-01T${task.taskTime}`),
              "h:mm a"
            );

            return (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{formattedDate}</td>
                <td>{formattedTime}</td>
                <td>{task.priority}</td>
                <td>{task.assignee}</td>
                <td>{task.status}</td>
                <td>
                <button onClick={(e) => handleAction(e, task.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
