import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import "../style/form.scss"
import {useAuth} from "../hooks/useAuth"

const Login = () => {

  const [username, setUsername] = useState("")
  const [password,setPassword] = useState("")

  const{loading,handleLogin} = useAuth()
  const navigate = useNavigate()

  if(loading){
    return (<main>
      <h1>loading...</h1>
    </main>)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    await handleLogin(username,password)

    navigate('/')
  }

  return (
    <main>
      <div className="form-container">
      <h1>Login</h1>
      <form 
        onSubmit={handleSubmit}>
        <input 
        onInput={(e)=>setUsername(e.target.value)}
        type="text" 
        name="username" 
        placeholder="Enter Username" />
        <input 
        onInput={(e)=>setPassword(e.target.value)}
        type="password" 
        name="password" 
        placeholder="Enter Password" />
        <button
        type="submit"
        className="button primary-button">
          Login</button>
      </form>
      <p>Create new account <Link className="link" to="/register">Register</Link></p>
    </div>
    </main>
  );
};

export default Login;
