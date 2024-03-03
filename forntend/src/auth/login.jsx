import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';

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
        let result = await fetch(`${URL}/api/admin/login/${data.email}/${data.password}`);
           result = await result.json();
           setLoding(false);
           if(result.success){
            localStorage.setItem('adminAuth', JSON.stringify(result));
            navigate('/admin/dashboard')
            toast.success("sucessfully login");
           }else{
            toast.error(result.message);
           }
          
       }catch(err){
        setLoding(false);
        toast.error("Something went wrong");
       }


      }

  return (
    <div style={{ background: 'linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%)', height: '100vh', paddingTop: '150px' }}>
      <div className="d-flex justify-content-center">
        <div class="containers">
          <form onSubmit={login}>
            <div class="title">Login</div>
            <div class="input-box underline">
              <input type="text" placeholder="Enter Your Email" onChange={(e)=>setData({...data , email : e.target.value})} required  />
              <div class="underline"></div>
            </div>
            <div class="input-box">
              <input type="password" placeholder="Enter Your Password" onChange={(e)=>setData({...data , password : e.target.value})} required />
              <div class="underline"></div>
            </div>
            <div class="input-box button d-flex justify-content-center">
            <div className="row d-flex justify-content-center">
                     <div className="col">
                       <button className="btn" type="submit" disabled={loding ? true : false}>{loding ? <CircularProgress size="2rem" color="inherit"/> : "Login"}</button>
                     </div>
                     <div className="col">
                       <button className="btn" type="click" onClick={()=>navigate('/')}>Home</button>
                     </div>
                   </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  //   <div className="LogIn-container">
  //   <div className="wrapper">
  //     <div className="title"><span>Login</span></div>
  //     <form onSubmit={login}>
  //       <div className="row">
  //         <i className="fas fa-user"></i>
  //         <input type="email" placeholder="Email" onChange={(e)=>setData({...data , email : e.target.value})} required/>
  //       </div>
  //       <div className="row">
  //         <i className="fas fa-lock"></i>
  //         <input type="password" placeholder="Password" onChange={(e)=>setData({...data , password : e.target.value})} required/>
  //       </div>
  //       {/* <div className="pass"><a href="#">Forgot password?</a></div> */}
  //       <div className="row button">
  //         <button className="loginBtn col me-3" type="submit" disabled={loding ? true : false}>{loding ? <CircularProgress size="2rem" color="inherit"/> : "Login"}</button>
  //         <button className="loginBtn col" onClick={()=>navigate('/')}>Home</button>
  //       </div>
  //     </form>
  //   </div>
  // </div>
  );
}
