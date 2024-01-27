import React, { useState,useEffect } from 'react';
function AddTodos(props){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
const addTodo= async()=>{
    if(title!=='' && description!==''){
    let newTodo={title:title,description:description}
    try {
        const response = await fetch("http://localhost:3000/todos", {
          method: "POST",
          body: JSON.stringify({
            title: title,
            description: description,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
  
        if (response.ok) {
          // Fetch updated todos after adding a new one
          props.getTodos();
          setTitle('');
          setDescription('');
        }
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
    else{
        alert("Title and description cannot be blank")
    }
}
const handleClear=()=>{
    setTitle('');
    setDescription('');
}

return (
    
    <>
  
  <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                className="insert"
                placeholder="Add Title here..."
                contentEditable="false"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                className="insert"
                placeholder="Add Description here..."
                contentEditable="false"
            />
        <button id="add" onClick={addTodo}><i className="fa fa-plus-circle" aria-hidden="true"></i>
</button>
        <button id="clear" onClick={handleClear}><i className="fa fa-trash" aria-hidden="true" ></i>
        </button>
    </>
)
}
export default AddTodos