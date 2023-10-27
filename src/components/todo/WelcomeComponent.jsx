import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { retrievAllTodosForUserName } from './api/TodoApiService';

function WelcomeComponent(){

  const {username} = useParams()
  const [message,setMessage] = useState(null)

  // console.log(username);

  function handleHelloWorld(){
    console.log('clicked')

    // axios.get('http://localhost:8080/hello-world')
    //       .then(
    //         (success) =>successResponse(success)
    //       ).catch(
    //         (error)=>errorResponse(error)
    //       ).finally(
    //         console.log('Finally clean up')
    //       )
    
    axios.get('http://localhost:8080/users/in28minutes/todos')
          .then(
            (success) =>successResponse(success)
          ).catch(
            (error)=>errorResponse(error)
          ).finally(
            console.log('Finally clean up')
          )

    // retrievAllTodosForUserName('in28minutes').then(
    //   (success)=>{
    //     console.log(success)
    //   }
    // ).catch(
    //   (error)=>{
    //     console.log(error)
    //   }
    // ).finally(
    //   console.log('success')
    // )
  }

  function successResponse(success){
    // console.log(success.data.message)
    setMessage(success.data.message)
  }

  function errorResponse(error){
    console.log(error)
  }

  return(
    <div className="Welcome">
      <h1>Welcome {username}</h1>
      <div>Manage your todos - <Link to="/todos">Go Here</Link></div>
      <div>
        <button className='btn btn-success m-5' onClick={handleHelloWorld}>hello world</button>
      </div>
      <div className='text-info'>{message}</div>
    </div>
  )
}

export default WelcomeComponent
