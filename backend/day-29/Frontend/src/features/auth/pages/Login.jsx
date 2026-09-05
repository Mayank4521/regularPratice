import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import {useAuth}  from '../hooks/useAuth'
import { useNavigate } from 'react-router'


const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const {handleLogin,loading} = useAuth()
  const navigate = useNavigate()

  if(loading){
    return (<main><h1>Loading... </h1></main>)
  }

  async function handleSubmit(e){
    e.preventDefault()
    await handleLogin(username,password)
  }

  return (
    <main>
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                  onInput={(e)=>setUsername(e.target.value)}
                 type="text" placeholder='Username' name="username"/>
                <input
                  onInput={(e)=>setPassword(e.target.value)}
                 type="password" placeholder='Password' name="username"/>
                <button type='submit' className="button primary-button">Login</button>
            </form>
            <p>Don't have an account? <Link className="link" to="/register">Register</Link></p>
        </div>
    </main>
  )
}

export default Login