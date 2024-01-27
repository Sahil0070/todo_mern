import React,{useState,useRef,useEffect} from "react"

function Todos(props){
    const [value,setValue] = useState(props.description);
    const [isEditing,setIsEditing] = useState(false)
    const inputRef = useRef(null);
    const id = props.id;
    // console.log(id)
    const editTodo=()=>{
        setIsEditing(true);
    }
    const confirmEdit = async () => {
        if (isEditing) {
          try {
            const response = await fetch(`http://localhost:3000/todos/${id}`, {
              method: "PUT",
              body: JSON.stringify({
                title: props.title,
                description: value,
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            });
    
            if (response.ok) {
              // Fetch updated todos after editing
              props.getTodos();
            }
    
            setIsEditing(false);
          } catch (error) {
            console.error("Error updating todo:", error);
          }
        }
      };
    
    const handleChange=(event)=>{
        setValue(event.currentTarget.value)
    }

    useEffect(() => {
        if (isEditing) {
          inputRef.current.focus();
        }
      }, [isEditing]);
    const handleDeleteTodo= async()=>{
      if(confirm("are your sure you want to delete")){
        try{
          const response = await fetch(`http://localhost:3000/todos/${id}`,{
            method:"DELETE",
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          });
          if(response.ok)
          {
            props.getTodos();
          }

        }catch(error){
          console.error("Error Deleting Todo:", error)
        }
      }
    }
    return (
        <div className="items">
            {isEditing?(<input type="text" value={value}  className="task" onChange={handleChange} ref={inputRef} autoFocus></input>):(<input type="text" value={value}  className="task" disabled ref={inputRef} ></input>)}
        
         <button className="check" onClick={confirmEdit}><i className="fa fa-check" aria-hidden="true"></i></button>
         <button className="edit"  onClick={editTodo}><i className="fas fa-edit" ></i></button>
         <button className="delete" onClick={handleDeleteTodo}><i className="fa fa-trash" aria-hidden="true" ></i>
         </button>
        </div> 
        
    )
}
export default Todos