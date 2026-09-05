import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from "../hooks/useAuth"

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {loading,handleRegister} = useAuth()
    const navigate = useNavigate()

    const handleSubmit=async (e)=>{
        e.preventDefault()

        await handleRegister(username,email,password)

    }

  return (
    <main>
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                  onInput={(e)=>setUsername(e.target.value)}
                 type="text" placeholder='Username' name="username"/>
                <input
                  onInput={(e)=>setEmail(e.target.value)}
                 type="email" placeholder='email' name="email"/>
                <input
                  onInput={(e)=>setPassword(e.target.value)}
                 type="password" placeholder='Password' name="username"/>
                <button type='submit' className="button primary-button">Register</button>
            </form>
            <p>Don't have an account? <Link to="/login" className="link">Login</Link></p>
        </div>
    </main>
  )
}

export default Register