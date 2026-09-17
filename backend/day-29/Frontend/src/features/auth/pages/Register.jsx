import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from "../hooks/useAuth"
import FormGroup from "../components/FormGroup"

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
                <FormGroup value={username} onChange={(e)=>setUsername(e.target.value)} label="Username" placeholder="Enter your username" />
                <FormGroup value={email} onChange={(e)=>setEmail(e.target.value)} label="Email" placeholder="Enter your email" />
                <FormGroup value={password} onChange={(e)=>setPassword(e.target.value)} label="Password" placeholder="Enter your password" />
                <button type='submit' className="button primary-button">Register</button>
            </form>
            <p>Don't have an account? <Link to="/login" className="link">Login</Link></p>
        </div>
    </main>
  )
}

export default Register