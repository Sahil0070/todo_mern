import { useEffect, useState } from 'react'
import './App.css'
import AddTodos from './components/AddTodos';
import Todos from './components/Todos';


function App() {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      const data = await response.json();
      // console.log(data);
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    // Call getTodos to fetch initial data
    getTodos();
  }, []); // Empty dependency array means this effect runs once on mount

 

  
  return (
<>
    <h1>ADD T<span id="underline">OD</span>O LIST</h1>
    <div  id="container">
        <div className="main">
         
          <AddTodos setTodos={setTodos} Todos={todos} getTodos={getTodos}></AddTodos>
          </div>  
          
        {todos.map((todo)=>{
          return (<Todos  key={todo._id} id={todo._id} getTodos={getTodos} title={todo.title} description={todo.description}></Todos>)
        })}
         
    </div>
</>
  )
}

function Todo(props) {
    // Add a delete button here so user can delete a TODO.
    return <div>
        {props.title}
    </div>
}

export default App
