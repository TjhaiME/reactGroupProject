import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import ReactButton from './Button';


//let sortUpdated = false

let initialTasks = {
  //FOR TESTING!!!!
  //DELETE FOR FINAL and use Form to create tasks
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
  "2" : {
    "name" : "other name of task 2",
    "description" : "no_task_description",
    "dateDue" : -1, //-1 means NO DUE DATE, everyother number represents milliseconds since 1960 or whatever it is
    "dateAdded" : -1,
    "priority" : -1, // NO PRIORITY
    "status" : -1, //nothing done yet, various states including: in-progress, completed, review
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
  //sortUpdated = true





  ///////////////////////////////////////
  //    Sorting        //
  function get_sorted_keys(sortBool, whatProperty="status"){

    function compareStatus(a, b) {
      if (a.status < b.status) {
        return -1;
      } else if (a.status > b.status) {
        return 1;
      }
      // a must be equal to b
      return 0;
    }
    function compareKeys(a, b) {
      if (parseInt(a.key) < parseInt(b.key)) {
        return -1;
      } else if (parseInt(a.key) > parseInt(b.key)) {
        return 1;
      }
      // a must be equal to b
      return 0;
    }
    //could have other ones for priority etc
    let newObjs = []
    //for(let objKey of Object.keys(tasks)){
    for(let index = 0; index < Object.keys(tasks).length; index++){
      let objKey = Object.keys(tasks)[index]
      newObjs.push({})

      //ADDING 2 CONSOLE LOGS FIXED A BUG....
      //PERHAPS IT IS AN ASYNC ISSUE
      console.log("key = ",objKey,", this task = ")
      console.log(tasks[objKey])

      newObjs[index]["status"] = tasks[objKey].status
      newObjs[index]["key"] = objKey
    }
    let sortedTempObjs = []
    if (sortBool == true){
      sortedTempObjs = newObjs.toSorted(compareStatus)
    }else{
      sortedTempObjs = newObjs.toSorted(compareKeys)
    }
    let sortedKeys = []
    for(let tempObj of sortedTempObjs){
      sortedKeys.push(tempObj.key)
    }
 

    return sortedKeys
  }////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////
//         Button functions
//////////////////////////////////////////////

  const add_task = (taskElement) => {
    let newTasks = structuredClone(tasks)
    newTasks[String(nextID)] = taskElement //add new task
    setTasks(newTasks) //save to state variable
    nextID += 1
    //make taskElement with from then use this function
  }
  const remove_task = (taskKey) => {
    // let sortBool = isSorted
    // setIsSorted(false)
    //some reason it doesnt work when isSorted == true
    
    let newTasks = structuredClone(tasks)
    delete newTasks[taskKey]
    setTasks(newTasks) //save to state variable
    
    //setIsSorted(sortBool)
    //nextID += 1
  }
  const remove_all_tasks = () => {
    console.log("deleting all tasks = ")
    console.log(tasks)
    // for (let taskKey of Object.keys(tasks)){
    //   remove_task(taskKey)
    // }
    setTasks({})
    console.log("after deleting tasks = ")
    console.log(tasks)
  }

  const button_toggleSort = () => {
    setIsSorted(prev => !prev)
  }

///////////////////////////////////////////////////////////////////////////
  

  function get_actualTasksJSX(){
    let tasksJSX = []

    let orderedKeys = Object.keys(tasks)//unorderedKeys
    if (orderedKeys.length == 0){
      return <></> //null jsx
    }

    // if (sortUpdated == true){
    //   sortUpdated = false
    //   //testing if its an ansync issue
    // }
    if (isSorted == true){
      orderedKeys = get_sorted_keys(true)
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

        <div className='task_options'>
          <h5>Options:</h5>
          <ReactButton buttonFunc={remove_task} argument={taskKey} name={"Remove This"}/>
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
        <div id="global_buttons">
          <ReactButton buttonFunc={remove_all_tasks} argument={undefined} name={"Remove All"}/>
          <ReactButton buttonFunc={button_toggleSort} argument={undefined} name={"Toggle Sort"}/>
        </div>

      </div>

      
      <div id="taskListDiv">
        {actualTasksJSX}
      </div>
      
    </>
    )

  }





  let toDoAppJSX = get_website_structure()


  //RETURN APP.JSX
  return (
    <div className="App">
      {/* <ReactButton buttonFunc={button_clearAll}/> */}
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




