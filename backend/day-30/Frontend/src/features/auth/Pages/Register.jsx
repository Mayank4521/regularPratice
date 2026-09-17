import React, { useState } from "react";
import FormGroup from "../components/FormGroup";
import { Link, useNavigate } from "react-router";
import "../style/form.scss";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  if (loading)
    return (
      <main>
        <h1>Loading</h1>
      </main>
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
  };

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup label="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <FormGroup label="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <FormGroup label="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="button primary-button">
            Register
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
