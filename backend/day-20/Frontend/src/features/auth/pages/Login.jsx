import React, { useState } from "react";
import { Link } from "react-router";
import "../style/form.scss";
import {useAuth} from "../hooks/useAuth"
import {useNavigate} from "react-router"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {handleLogin,user,loading} = useAuth()
  const navigate = useNavigate()

  if (loading) {
        return (<main>
            <h1>Loading.....</h1>
        </main>)
    }



  function handleSubmit(e) {
    e.preventDefault();

    handleLogin(username,password).then(
      res=>{console.log(res)
      navigate("/")}
    )
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Enter Username"
          />
          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="Enter Password"
          />
          <button className="button primary-button">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="toggleAuthForm">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
