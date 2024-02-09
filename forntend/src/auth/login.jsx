import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import './login.css'

//utils
import {URL} from '../util/URL';

//mui
import {CircularProgress} from '@mui/material'

export default function Login() {
  const navigate = useNavigate();

  const[data , setData] = useState({email : "" , password : ""});
  const [loding   , setLoding] = useState(false);

  const login = async (e)=>{
      e.preventDefault();

       try{
        // fetch(`${URL}/admin/login/${data.email}/${data.password}`).then((res)=>res.json).then((data)=>console.log(data)).catch((err)=>console.log(err));
        setLoding(true);
        let result = await fetch(`${URL}/admin/login/${data.email}/${data.password}`);
           result = await result.json();
           setLoding(false);
           console.log(result);
           if(result.success){
            localStorage.setItem('adminAuth', JSON.stringify(result));
            navigate('/admin/dashboard')
           }else{
            console.log("not valid")
           }
          
       }catch(err){
        setLoding(false);
        console.log(err);
       }


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
        {/* <div className="pass"><a href="#">Forgot password?</a></div> */}
        <div className="row button">
          {/* <input type="submit" value="Login"/> */}
          {/* <button type="submit">login</button> */}
          <button className="loginBtn" type="submit" disabled={loding ? true : false}>{loding ? <CircularProgress size="2rem" color="inherit"/> : "Login"}</button>
        </div>
      </form>
    </div>
  </div>
  );
}