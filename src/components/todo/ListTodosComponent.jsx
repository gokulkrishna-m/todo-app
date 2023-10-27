import { useEffect, useState } from "react";
import { retrievAllTodosForUserName,deleteTodo } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodosComponent(){

  const authContext = useAuth()
  const userName = authContext.username
  const navigate = useNavigate()
  // console.log(userName)
  // const today = new Date();

  // const targetDate = new Date(today.getFullYear()+12,today.getMonth(),today.getDay());

  const [todos,setTodos] = useState([])

  useEffect(
    ()=>{
      refreshTodos()
    }
  ,[])

  function refreshTodos(){
    retrievAllTodosForUserName(userName).then(
      (success)=>{
        // console.log(success)
        setTodos(success.data)
      }
    ).catch(
      (error)=>{
        console.log(error)
      }
    ).finally(
      // console.log('success')
    )
  }

  // const todos = 
  // [
  //   {id:1,description:'Learn AWS',done:false,targetDate:targetDate},
  //   {id:2,description:'Learn Azure',done:false,targetDate:targetDate},
  //   {id:3,description:'Learn DevOps',done:false,targetDate:targetDate}
  // ]
  // console.log(todos.length);

  const handleDelete = (id) => {
    console.log(id)
    deleteTodo(userName,id)
    .then(
      ()=>{
        refreshTodos()
      }
    ).catch(
      (error)=>{
        console.log(error)
      }
    )
  }

  const handleUpdate = (id) =>{
    // console.log(id)
    navigate(`/todo/${id}`)
  }

  const handleInsert = () =>{
    // console.log(id)
    navigate(`/todo/-1`)
  }

  return(
    <div className="container">
      <h1>Things you want to do!</h1>
      <div>
        <table className="table">
          <thead>
            <tr>
              {/* <th>Id</th> */}
              <th>Description</th>
              <th>Is Done?</th>
              <th>Target Date</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {
              todos.map(
                todo => (
                  <tr key={todo.id}>
                    {/* <td>{todo.id}</td> */}
                    <td>{todo.description}</td>
                    <td>{todo.done.toString()}</td>
                    {/* <td>{todo.targetDate.toDateString()}</td> */}
                    <td>{todo.targetDate.toString()}</td>
                    <td><button className="btn btn-warning" onClick={()=>handleDelete(todo.id)}>Delete</button></td>
                    <td><button className="btn btn-success" onClick={()=>handleUpdate(todo.id)}>Update</button></td>
                  </tr>
                )
              )
            }
          </tbody>
        </table>
        <button className="btn btn-success m-5" onClick={handleInsert}>Add New</button>
      </div>
    </div>
  )
}

export default ListTodosComponent
