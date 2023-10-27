import React, { useEffect, useState } from 'react'
import { retrieveTodo,updateTodo,createTodo } from './api/TodoApiService'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from './security/AuthContext'
import { Formik,Form,Field,ErrorMessage } from 'formik'

const TodoComponent = () => {

    const{id} = useParams()
    const [description,setDescription] = useState('')
    const [targetDate,setargetDate] = useState('')

    const navigate = useNavigate()

    const buttonName = id==='-1'?'Save':'Update'
    // console.log(buttonName)
    // console.log(typeof id)

    const authContext = useAuth()
    const userName = authContext.username

    // console.log(userName)

    useEffect(()=>{
        handletodos()
    },[id])

    function handletodos(){

        if(id !=-1){
            retrieveTodo(userName,id)
            .then(
                (response) => {
                    // console.log(response)
                    setDescription(response.data.description)
                    setargetDate(response.data.targetDate)
                }
            ).catch(

            )
        }
    }

    function handleSubmit(values){
        console.log(values)

        const todo = {
            id:id,
            username:userName,
            description:values.description,
            targetDate:values.targetDate,
            done:false
        }

        console.log(todo)

        if(id == -1){
            createTodo(userName,todo)
            .then(
                (response) =>{
                    console.log(`success ${response}`)
                    navigate(`/todos`)
                }
            ).catch(
                (error)=>{
                    console.log(error)
                }
            )
        }else{
            updateTodo(userName,id,todo)
            .then(
                (response) =>{
                    console.log(`success ${response}`)
                    navigate(`/todos`)
                }
            ).catch(
                (error)=>{
                    console.log(error)
                }
            )
        }
        
    }

    function handleValidate(values){
        
        // console.log(values)

        let error = {
            // description:'Enter a valid Description',
            // targetDate:'Enter a valid Target Date'
        }

        if(values.description.length<5){
            error.description = 'Enter atleast 5 characters'
        }
        if(values.targetDate == null || values.targetDate === ''){
            error.targetDate = 'Enter valid date'
        }

        return error;
    }
    
  return (
    <div className='container'>
        <h1>Enter the details to update</h1>
        {/* {description} */}
        <div>
            <Formik initialValues={{description,targetDate}} enableReinitialize={true} onSubmit={handleSubmit} validate={handleValidate} validateOnChange={false} validateOnBlur={false}>
                {
                    (props) => (
                        <Form>
                            <ErrorMessage 
                                component='div'
                                className='alert alert-warning'
                                name='description'
                            />
                            <ErrorMessage 
                                component='div'
                                className='alert alert-warning'
                                name='targetDate'
                            />
                           <fieldset className='form-group'>
                            <label>Description</label>
                            <Field type='text' className='form-control' name='description' autoComplete='off'/>
                           </fieldset>
                           <fieldset className='form-group'>
                            <label>Target Date</label>
                            <Field type='date' className='form-control' name='targetDate' />
                           </fieldset>
                           {/* {
                            id >=1 && 
                            <div>
                                <button className='btn btn-success m-5' type='submit'>Update</button>
                            </div>
                           }
                           {
                            id ==-1 && 
                            <div>
                                <button className='btn btn-success m-5' type='submit'>Save</button>
                            </div>
                           } */}
                           <div>
                                <button className='btn btn-success m-5' type='submit'>{buttonName}</button>
                           </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    </div>
  )
}

export default TodoComponent