import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import "../style/form.scss";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (<main>
      <h1>loading...</h1>
    </main>)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(username, email, password);

    navigate("/");
  };

  return (
    <main>
      <div className="form-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          onInput={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          name="email"
          placeholder="Enter Email"
        />
        <input
          onInput={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          placeholder="Enter Username"
        />
        <input
          onInput={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Enter Password"
        />
        <button type="submit"
        className="button primary-button">Register</button>
      </form>
      <p>
        Already have an account?{" "}
        <Link className="link" to="/login">
          Login
        </Link>
      </p>
    </div>
    </main>
  );
};

export default Register;
