import React, { useState } from 'react';
import { format, parse } from 'date-fns';
import './styles/NewTask.css';

function NewTask({ addNewTask = () => {} , mainChangeSortOption}) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [errors, setErrors] = useState({});
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    taskDate: '',
    taskTime: '',
    priority: '',
    assignee: '',
    isReoccurring: false,
    reoccurringDuration: '',
    frequency: 'Weekly'
  });

  const formatTaskDate = (dateString) => {
    if (!dateString) return '';
    const date = parse(dateString, 'yyyy-MM-dd', new Date());
    return format(date, 'MMM do yy');
  };

  const formatTaskTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const time = new Date(0, 0, 0, hours, minutes);
    return format(time, 'h:mm a');
  };

  const validateForm = (task) => {
    let formErrors = {};
    if (!task.title.trim()) formErrors.title = 'Title is required';
    // Additional validations can be added here
    return formErrors;
  };

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formErrors = validateForm(newTask);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      addNewTask(newTask);
      console.log(newTask);
      setNewTask({
        title: '', description: '', taskDate: '', taskTime: '', priority: '', assignee: '', isReoccurring: false, reoccurringDuration: '', frequency: 'Weekly'
      });
      setShowOverlay(false);
    }
  };

  const handleChangeSortOption = (e) => {
    console.log("e = ")
    console.log(e)
    mainChangeSortOption(e.target.value)
  }

  const openOverlay = () => setShowOverlay(true);
  const closeOverlay = () => setShowOverlay(false);




  return (
    <div>
      <button onClick={openOverlay} className="create-task-button">Create Task</button>
      <InputField label="SortTasks" type="select" name="sortTasks" value={newTask.priority} handleChange={handleChangeSortOption} options={["title", "taskDate", "taskTime","priority","assignee","status","id"]} />
      {showOverlay && (
        <div className="overlay">
          <form onSubmit={handleSubmit}>
            <InputField label="Title" name="title" value={newTask.title} handleChange={handleChange} error={errors.title} />
            <label>
              Task Date: {formatTaskDate(newTask.taskDate)}
              <input
                type="date"
                name="taskDate"
                value={newTask.taskDate}
                onChange={handleChange}
              />
            </label>
            <label>
              Task Time: {formatTaskTime(newTask.taskTime)}
              <input
                type="time"
                name="taskTime"
                value={newTask.taskTime}
                onChange={handleChange}
              />
            </label>
            <InputField label="Priority" type="select" name="priority" value={newTask.priority} handleChange={handleChange} options={["High", "Medium", "Low"]} />
            <InputField label="Assignee" name="assignee" value={newTask.assignee} handleChange={handleChange} />
            <label>
              Description:
              <textarea name="description" value={newTask.description} onChange={handleChange} maxLength="500"></textarea>
            </label>
            <label>
              <input type="checkbox" name="isReoccurring" checked={newTask.isReoccurring} onChange={(e) => setNewTask({ ...newTask, isReoccurring: e.target.checked })} />
              Reoccurring Task
            </label>
            {newTask.isReoccurring && (
              <>
                <label>
                  Duration (Months):
                  <input type="number" name="reoccurringDuration" value={newTask.reoccurringDuration} onChange={handleChange} min="1" max="6" />
                </label>
                <InputField
                  label="Frequency"
                  type="select"
                  name="frequency"
                  value={newTask.frequency}
                  handleChange={handleChange}
                  options={['Daily', 'Weekly', 'Fortnightly', 'Monthly']}
                />
              </>
            )}
            <button type="submit" className="submit-button">Add Task</button>
            <button type="button" onClick={closeOverlay} className="cancel-button">Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

function InputField({ label, type = "text", name, value, handleChange, error, options }) {
  return (
    <label>
      {label}:
      {type === "select" ? (
        <select name={name} value={value} onChange={handleChange}>
          <option value="">Select {label}</option>
          {options && options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input type={type} name={name} value={value} onChange={handleChange} />
      )}
      {error && <span className="error">{error}</span>}
    </label>
  );
}

export default NewTask;
