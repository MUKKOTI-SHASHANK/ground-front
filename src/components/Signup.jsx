import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //  setTimeout(()=>{
  //   console.log(username,email,password);
  //  },1000)

  // console.log(username,email,password);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email, password, username);
    Axios.post("https://ground-backend.onrender.com/auth/signup", {
    // Axios.post("http://localhost:5050/auth/signup", {
      username,
      email,
      password,
    })
      .then((response) => {
        console.log(response);
        if (response.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error(err);
      });
    // e.target.reset();
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1>SIGN UP</h1>
        <label htmlFor="username">Username : </label>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>

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

        <button type="submit">Sign Up</button>
        <Link to="/login">Login</Link>
      </form>
    </div>
  );
};

export default Signup;
