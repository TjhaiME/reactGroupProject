import React, { useState } from 'react';
import NewTask from './NewTask.js';
import TaskList from './TaskList.js';
import CompletedTasks from './CompletedTasks.js';
import { format, addWeeks, parseISO } from 'date-fns';
import './App.css';

export default function App() {
  const [allTasks, setAllTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskIdCounter, setTaskIdCounter] = useState(1);

  const formatDateTime = (date, time) => {
    const formattedDate = date ? format(parseISO(date), 'MMM do yy') : '';
    const formattedTime = time ? format(parseISO(`1970-01-01T${time}`), 'h:mm a') : '';
    return { formattedDate, formattedTime };
  };

  const addNewTask = (task) => {
    let newTasks = [];
    if (task.isReoccurring) {
      const totalOccurrences = parseInt(task.reoccurringDuration, 10) * (task.frequency === 'fortnightly' ? 2 : 4);
      for (let i = 0; i < totalOccurrences; i++) {
        const frequencyOffset = task.frequency === 'weekly' ? i : i * 2;
        const newDate = addWeeks(parseISO(task.taskDate), frequencyOffset);
        newTasks.push({
          ...task,
          id: taskIdCounter + newTasks.length,
          taskDate: newDate.toISOString().split('T')[0]
        });
      }
    } else if (task.frequency === 'daily') {
      for (let i = 0; i < task.reoccurringDuration; i++) {
        const newDate = addWeeks(parseISO(task.taskDate), i * 30);
        newTasks.push({
          ...task,
          id: taskIdCounter + newTasks.length,
          taskDate: newDate.toISOString().split('T')[0]
        });
      }
    } else {
      newTasks.push({ ...task, id: taskIdCounter });
    }

    setAllTasks([...allTasks, ...newTasks]);
    setTaskIdCounter(taskIdCounter + newTasks.length);
  };

  const handleDelete = (taskIdToRemove) => {
    setAllTasks(allTasks.filter(task => task.id !== taskIdToRemove));
  };

  const markComplete = (taskId) => {
    const completedTask = allTasks.find(task => task.id === taskId);
    if (completedTask) {
      console.log(`Task completed: ${completedTask.title}`);
      setCompletedTasks([...completedTasks, { ...completedTask, status: 'closed' }]);
      setAllTasks(allTasks.filter(task => task.id !== taskId));
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <h1 className="tasks-title">New Tasks</h1>
        <NewTask addNewTask={addNewTask} />
        <TaskList tasks={allTasks.map(task => ({ ...task, ...formatDateTime(task.taskDate, task.taskTime) }))} handleDelete={handleDelete} markComplete={markComplete} />
      </div>
      <div className="completed-tasks-section">
        <h1 className="completed-tasks-title">Completed Tasks</h1>
        <CompletedTasks completedTasks={completedTasks.map(task => ({ ...task, ...formatDateTime(task.taskDate, task.taskTime) }))} />
      </div>
    </div>
  );
}