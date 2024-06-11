import Axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("https://ground-improvement-backend.onrender.com/auth/login", {
      email,
      password,
    })
      .then((response) => {
        console.log(response);
        if (response.data.status) {
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // e.target.reset();
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1>LOGIN</h1>
        <label htmlFor="email">Email : </label>
        <input
          type="email"
          placeholder="Email"
          autoComplete="off"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>

        <label htmlFor="password">Password : </label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>

        <button type="submit">Login</button>
        <Link to="/signup">New User?</Link>
      </form>
    </div>
  );
};

export default Login;
