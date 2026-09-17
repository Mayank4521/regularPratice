import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import {useAuth}  from '../hooks/useAuth'
import { useNavigate } from 'react-router'
import FormGroup from "../components/FormGroup"


const Login = () => {

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const {handleLogin,loading} = useAuth()
  const navigate = useNavigate()

  if(loading){
    return (<main><h1>Loading... </h1></main>)
  }

  async function handleSubmit(e){
    e.preventDefault()
    await handleLogin({email,username,password})
    navigate("/")
  }

  return (
    <main>
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <FormGroup label="Username" placeholder="Enter your username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                <FormGroup label="Password" placeholder="Enter your password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <button type='submit' className="button primary-button">Login</button>
            </form>
            <p>Don't have an account? <Link className="link" to="/register">Register</Link></p>
        </div>
    </main>
  )
}

export default Login