import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState( [] )

// Json Server
useEffect ( () => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()

      setTasks(tasksFromServer)
    }
    getTasks()
}, [])

// Json Server
const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')

    const data = await res.json()

    return data
  
  } 

// Json Server
// the below method is used inside Toggle
const fetchSingleTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)

    const data = await res.json()

    return data
  
  }
// Add Task -> Save Task button
const addTask = async (task) => {
  // use these below lines when there is no json server
  // const id = Math.floor(Math.random() * 10000) + 1
  // const newtask = {id, ...task}
  // setTasks([...tasks, newtask])
  // Json Server
  const res = await fetch(
            'http://localhost:5000/tasks/', 
            {
              method:'POST',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(task)
            }
         )
  const data = await res.json()
  setTasks([...tasks, data])

}

//  Delete Task
const deleteTask = async(id) => {
  // 1st line -> Json Server
  await fetch(`http://localhost:5000/tasks/${id}`, 
              {
                method:'DELETE'
              } 
          )
  setTasks(tasks.filter((task)=> task.id!==id))
}

// Toggle Reminder
const toggleReminder = async (id) => {
  // Json Server -> except last line
  // the below lines of code is used to save the toggle State and to render the same toggle state even after a reload
  const taskToToggle = await fetchSingleTask(id)
  const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
  
  const res = await fetch(`http://localhost:5000/tasks/${id}`,
                          {
              method:'PUT',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(updTask)
            }
        )
  const data = await res.json()
  
  setTasks(tasks.map((task)=> task.id === id ? {...task, reminder: !task.reminder} : task))
}


  return (
      <Router>  
        <div className="container">
          {/* pass empty string in title to know how defaultProps work */}
          <Header 
            title='Task Tracker' 
            onAdd={() => setShowAddTask(!showAddTask)} 
            showAdd={showAddTask}
          /> 
          <Route path='/' exact render={(props)=> 
            (
                <>
                  {showAddTask ? <AddTask onAdd={addTask}/> : '' }
                  {/* the below code is a ternary operation to check if any task exists by checking the length of tasks. if there is a task the render Tasks else show the message no tasks */}
                  {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) : 'No Tasks to show' }
                </>
             )
          } />
          <Route path='/about' exact component = {About}/>
          <Footer />
        </div>
      </Router>
    );
}

export default App;
