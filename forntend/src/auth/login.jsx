import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import './login.css'

export default function Login() {
  const navigate = useNavigate();

  const[data , setData] = useState({email : "" , password : ""});

  const login = (e)=>{
      e.preventDefault();

       localStorage.setItem('adminAuth', JSON.stringify(data));
       navigate('/admin/dashboard')
      }

  return (
    <div className="LogIn-container">
    <div className="wrapper">
      <div className="title"><span>Login</span></div>
      <form onSubmit={login}>
        <div className="row">
          <i className="fas fa-user"></i>
          <input type="email" placeholder="Email" onChange={(e)=>setData({...data , email : e.target.value})} required/>
        </div>
        <div className="row">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Password" onChange={(e)=>setData({...data , password : e.target.value})} required/>
        </div>
        <div className="pass"><a href="#">Forgot password?</a></div>
        <div className="row button">
          <input type="submit" value="Login"/>
        </div>
      </form>
    </div>
  </div>
  );
}
