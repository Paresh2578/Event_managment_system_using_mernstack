import React from "react";
import { useNavigate } from "react-router-dom";

import './login.css'

//mui
import PersonIcon from '@mui/icons-material/Person';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="LogIn-container">
    <div className="wrapper">
      <div className="title"><span>Login</span></div>
      <form action="#">
        <div className="row">
          <i className="fas fa-user"></i>
          <input type="text" placeholder="Email or Phone" required/>
        </div>
        <div className="row">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Password" required/>
        </div>
        <div className="pass"><a href="#">Forgot password?</a></div>
        <div className="row button" onClick={()=>navigate('/admin/dashboard')}>
          <input type="button" value="Login"/>
        </div>
      </form>
    </div>
  </div>
  );
}
