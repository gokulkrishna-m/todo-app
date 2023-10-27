import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import AuthContext, { useAuth } from './security/AuthContext';

function LoginComponent(){

  const[username,setUsername] = useState('in28minutes')
  const[password,setPassword] = useState('dummy')

  const[showSuccessMessage,setSuccessMessage] = useState(false)
  const[showErrorMessage,setErrorMessage] = useState(false)

  const navigate = useNavigate()
  const authContext = useAuth()

  function handleUsernameChange(event){
    // console.log(event.target.value);
    setUsername(event.target.value)
  }

  function handlePasswordChange(event){
    setPassword(event.target.value)
  }

  async function handleSubmit(){
    // console.log(username);
    // console.log(password);
    if(await authContext.login(username,password)){
      // console.log('Success');
      // setSuccessMessage(true)
      // setErrorMessage(false)
      navigate(`/welcome/${username}`)
    }else{
      // console.log('Failed');
      setSuccessMessage(false)
      setErrorMessage(true)
    }
  }

  // function SuccessMessageComponent(){
  //   if(showSuccessMessage){
  //     return <div className="successMessage">Authenticated Successfully</div>
  //   }
  //
  //   return null
  // }
  //
  // function ErrorMessageComponent(){
  //   if(showErrorMessage){
  //     return <div className="errorMessage">Authentication Failed. Please check your credentials</div>
  //   }
  //
  //   return null
  // }

  return(
    <div className="Login">
      {/* {showSuccessMessage && <div className="successMessage">Authenticated Successfully</div>} */}
      {showErrorMessage && <div className="errorMessage">Authentication Failed. Please check your credentials</div>}
      {/*<SuccessMessageComponent />
      <ErrorMessageComponent /> */}
      <div className="LoginForm">
        <div>
          <label>User Name </label>
          <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
        </div>
        <div>
          <label>Password </label>
          <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
        </div>
        <div>
          <button type="button" name="login" onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent
