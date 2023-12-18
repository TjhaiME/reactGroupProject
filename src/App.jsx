import React, { useState } from 'react';
import NewTask from './NewTask.js';
import TaskList from './TaskList.js';
import CompletedTasks from './CompletedTasks.js';
import { format, addDays, parseISO } from 'date-fns';
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
      const taskFreqMapMonth = {
        'Daily' : 30,
        'Weekly' : 4,
        'Fortnightly' : 2,
        'Monthly' : 1,
      }
      const taskFreqMapDays = {
        'Daily' : 1,
        'Weekly' : 7,
        'Fortnightly' : 14,
        'Monthly' : 30,
      }

      //const totalOccurrences = parseInt(task.reoccurringDuration, 10) * (task.frequency === 'Fortnightly' ? 2 : 4);
      const totalOccurrences = parseInt(task.reoccurringDuration, 10) * taskFreqMapMonth[task.frequency];
      // console.log("totalOccurances = ", totalOccurrences)
      // console.log("task.reoccurringDuration = ", task.reoccurringDuration)
      // console.log("task.frequency = ", task.frequency)
      for (let i = 0; i < totalOccurrences; i++) {
        //const frequencyOffset = (task.frequency === 'weekly' ? i : i * 2);
        const newDate = addDays(parseISO(task.taskDate), taskFreqMapDays[task.frequency]*i);//used to be addWeeks
        newTasks.push({
          ...task,
          id: taskIdCounter + newTasks.length,
          taskDate: newDate.toISOString().split('T')[0]
        });
      }
      //////WHAT I DID /////////////////////
    }//This bracket was added since the one below was commented out (COMMENT TO RESTORE TO PREVIOUS VERSION WHEN UNCOMMENTING BELOW)
    ///BELOW HAS BEEN COMMENTED OUT
    //seems this was meant to be part of if( isReOccuring){} but wasnt in the right spot
    // removed so we do with an object instead
    // } else if (task.frequency === 'daily') {
    //   for (let i = 0; i < task.reoccurringDuration; i++) {
    //     const newDate = addWeeks(parseISO(task.taskDate), i * 30);
    //     newTasks.push({
    //       ...task,
    //       id: taskIdCounter + newTasks.length,
    //       taskDate: newDate.toISOString().split('T')[0]
    //     });
    //   }
    // } else {
    //   newTasks.push({ ...task, id: taskIdCounter });
    // }
    //////////////////////////////////////////

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


//on each task we need an edit button
//reoccuring task needs fixing in:
//addNewTask