import { FaTimes} from 'react-icons/fa';

function Task({task, onDelete, onToggle}) {
    return (
        // className is initialised through a ternary operator which sets className to task if reminder=false else it sets classname to reminder.
        <div className= {`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick= {()=> onToggle(task.id)}>
            <h3> {task.text} <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={()=> onDelete(task.id)}/></h3>
            <p> {task.day} </p>
        </div>
    )
}

export default Task
