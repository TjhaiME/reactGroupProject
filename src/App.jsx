import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import ReactButton from './Button';



let initialTasks = {
  //FOR TESTING!!!!
  "0" : {
    "name" : "short name of task",
    "description" : "no_task_description",
    "dateDue" : -1, //-1 means NO DUE DATE, everyother number represents milliseconds since 1960 or whatever it is
    "dateAdded" : -1,
    "priority" : -1, // NO PRIORITY
    "status" : 0, //nothing done yet, various states including: in-progress, completed, review
    "assignedTo" : "me",//default
    "notes" : "no notes yet"
  },
  "1" : {
    "name" : "other name of task 2",
    "description" : "no_task_description",
    "dateDue" : -1, //-1 means NO DUE DATE, everyother number represents milliseconds since 1960 or whatever it is
    "dateAdded" : -1,
    "priority" : -1, // NO PRIORITY
    "status" : 1, //nothing done yet, various states including: in-progress, completed, review
    "assignedTo" : "me",//default
    "notes" : "no notes yet"
  },
}

function App() {


  let taskDefault = {
    
    "name" : "short name of task",
    "description" : "no_task_description",
    "dateDue" : -1, //-1 means NO DUE DATE, everyother number represents milliseconds since 1960 or whatever it is
    "dateAdded" : -1,
    "priority" : -1, // NO PRIORITY
    "status" : 0, //nothing done yet, various states including: in-progress, completed, review
    "assignedTo" : "me",//default
    "notes" : "no notes yet"


  }


  let nextID = 0 //GOING TO HAVE TO BE SAVED IF WE DO LOCAL STORAGE


  // tasks = {}
  let [tasks, setTasks] = useState(initialTasks) //let tasks = {}
  //let isSorted = true
  let [isSorted,setIsSorted] = useState(true)





  ///////////////////////////////////////
  //    Sorting        //
  function get_sorted_keys(whatProperty="status"){

    function compareStatus(a, b) {
      if (a.status < b.status) {
        return -1;
      } else if (a.status > b.status) {
        return 1;
      }
      // a must be equal to b
      return 0;
    }

    //could have other ones for priority etc
    let newObjs = []
    for(let objKey of Object.keys(tasks)){
      newObjs.push({})
      newObjs[objKey]["status"] = tasks[objKey].status
      newObjs[objKey]["key"] = objKey
    }
    const sortedTempObjs = newObjs.toSorted(compareStatus)
    let sortedKeys = []
    for(let tempObj of sortedTempObjs){
      sortedKeys.push(tempObj.key)
    }

    return sortedKeys
  }////////////////////////////////////////






  // let tasks = {}
  // function setTasks(newTasksObj){
  //   //FOR TESTING ONLY,. REPLACE WITH useState Hook
  //   tasks = newTasksObj
  // }




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
  function remove_all_tasks(){
    console.log("deleting all tasks = ")
    console.log(tasks)
    for (let taskKey of Object.keys(tasks)){
      remove_task(taskKey)
    }
    console.log("after deleting tasks = ")
    console.log(tasks)
  }


  

  function get_actualTasksJSX(){
    let tasksJSX = []

    let orderedKeys = Object.keys(tasks)//unorderedKeys
    if (isSorted == true){
      orderedKeys = get_sorted_keys()
    }
    for(let taskKey of orderedKeys){ //tasks is an object
      const newTaskJSX = get_single_task_JSX(taskKey)
      tasksJSX.push(newTaskJSX)
    }
    return tasksJSX
  }

  function get_single_task_JSX(taskKey){
    return (
      <div className='task' key={taskKey}>
        <h3>{tasks[taskKey].name}</h3>
        <div className='task_desc'>
          <p>{tasks[taskKey].description}</p>
        </div>
        <div className='task_mid'>
          <div className='task_mid_Dates'>
            <h6>Dates:</h6>
            <p>{tasks[taskKey].dateAdded+" --> "+tasks[taskKey].dateDue}</p>
          </div>
          <div className='task_mid_Status'>
            <p>{"Status : "+ tasks[taskKey].status}</p>
            <p>{"Priority : "+tasks[taskKey].priority}</p>
            
          </div>
          <div className='task_mid_Assign'>
            <h6>Assigned To:</h6>
            <p>{tasks[taskKey].assignedTo}</p>
          </div>

          
        </div>
        <div className='task_notes'>
          <h5>Notes:</h5>
          <p>{tasks[taskKey].notes}</p>
        </div>

      </div>
    )
  }


  function get_website_structure(){
    //main react JSX


    //TEST_make_test_tasks() //FOR TESTING ONLY

    let actualTasksJSX = get_actualTasksJSX()
    
    return (
    <>
      <div id="optionsDiv">
        <h1>Options 'n' Stuff</h1>
        {/* put add task button here */}
      </div>

      
      <div id="taskListDiv">
        {actualTasksJSX}
      </div>
      
    </>
    )

  }

  // function TEST_make_test_tasks(){
  //   //FOR TESTING ONLY
  //   console.log("test set initial tasks")
  //   //BAD RUNS EVERY FRAME!!!
  //   let taskKey = String(0)
  //   let newTask = structuredClone(taskDefault)
  //   newTask.name = "test task"
  //   add_task(newTask)
  //   // tasks[taskKey] = structuredClone(taskDefault)
  //   // tasks[taskKey].name = "test task"

  //   //taskKey = String(1)
  //   let newTask2 =structuredClone(taskDefault)
  //   newTask2.name = "more test'n' tasks"
  //   newTask2.status = -1
  //   add_task(newTask2)
  // }















  let toDoAppJSX = get_website_structure()


  const button_clearAll = () => {
    remove_all_tasks()
  }

  //RETURN APP.JSX
  return (
    <div className="App">
      <ReactButton buttonFunc={button_clearAll}/>
      {toDoAppJSX}
      {/* <Custom_Task_Component/> */}
    </div>
  );
}

export default App;





///TODO:

// 8) done, just needs to be prettier
// 9) done as it is just object manipulation

// 10)Have a method to sort and display tasks by status
    //write sort function

// 13)Make use of semantic HTML and the correct syntax extension for React code
    //Add alts and stuff?




