import React, { use, useState } from 'react'
import { Link,useNavigate } from 'react-router'
import "../style/form.scss"
import {useAuth} from "../hooks/useAuth"

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {handleRegister,loading} = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()

        await handleRegister(username,email,password)
        navigate("/")
    

        if(loading){
            return (<main><h1>Loading.....</h1></main>)
        }
    }

  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input 
                onInput={(e)=>{setUsername(e.target.value)}}
                type="text" 
                name='username' 
                placeholder='Enter Username'/>
                <input 
                onInput={(e)=>{setEmail(e.target.value)}}
                type="email" 
                name='email' 
                placeholder='Enter Email'/>
                <input 
                onInput={(e)=>{setPassword(e.target.value)}}
                type="password" 
                name='password' 
                placeholder='Enter Password'/>
                <button className='button primary-button'>Register</button>
            </form>
                <p>Already have an account? <Link to="/Login" className="toggleAuthForm">Login</Link></p>
            
        </div>
    </main>
  )
}

export default Register