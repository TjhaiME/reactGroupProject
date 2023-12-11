import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';


function App() {





  // tasks = {}
  let [tasks, setTasks] = useState({}) //let tasks = {}



  // let tasks = {}
  // function setTasks(newTasksObj){
  //   //FOR TESTING ONLY,. REPLACE WITH useState Hook
  //   tasks = newTasksObj
  // }


  let taskDefault = {
    
    "name" : "short name of task",
    "description" : "no_task_description",
    "dateDue" : -1, //-1 means NO DUE DATE, everyother number represents milliseconds since 1960 or whatever it is
    "dateAdded" : -1,
    "priority" : -1, // NO PRIORITY
    "status" : 0, //nothing done yet


  }


  let nextID = 0 //GOING TO HAVE TO BE SAVED IF WE DO LOCAL STORAGE

  function add_task(taskElement){
    let newTasks = structuredClone(tasks)
    newTasks[String(nextID)] = taskElement //add new task
    setTasks(newTasks) //save to state variable
    nextID += 1
  }
  function remove_task(taskKey){
    let newTasks = structuredClone(tasks)
    delete newTasks[taskKey]
    setTasks(newTasks) //save to state variable
    //nextID += 1
  }




  function get_actualTasksJSX(){
    let tasksJSX = []
    for(let taskKey of Object.keys(tasks)){ //tasks is an object
      const newTaskJSX = get_single_task_JSX(taskKey)
      tasksJSX.push(newTaskJSX)
    }
    return tasksJSX
  }

  function get_single_task_JSX(taskKey){
    return (
      <div className='task'>
        <h3>{tasks[taskKey].name}</h3>
        <p>{tasks[taskKey].description}</p>
        <p>{tasks[taskKey].dateAdded}</p>
        <p>{tasks[taskKey].dateDue}</p>
        <p>{tasks[taskKey].status}</p>
        <p>{tasks[taskKey].priority}</p>



      </div>
    )
  }


  function get_website_structure(){
    //main react JSX


    TEST_make_test_tasks() //FOR TESTING ONLY

    let actualTasksJSX = get_actualTasksJSX()
    
    return (
    <>
      <div id="optionsDiv">
        {/* put add task button here */}
      </div>

      
      <div id="taskListDiv">
        {actualTasksJSX}
      </div>
      
    </>
    )

  }

  function TEST_make_test_tasks(){
    //FOR TESTING ONLY

    let taskKey = String(0)
    tasks[taskKey] = structuredClone(taskDefault)
    tasks[taskKey].name = "test task"

    taskKey = String(1)
    tasks[taskKey] = structuredClone(taskDefault)
    tasks[taskKey].name = "more test'n' tasks"
  }













  let toDoAppJSX = get_website_structure()


  //RETURN APP.JSX
  return (
    <div className="App">
      {toDoAppJSX}
      {/* <Custom_Task_Component/> */}
    </div>
  );
}

export default App;

