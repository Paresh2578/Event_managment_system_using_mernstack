import React, {useState , useEffect} from 'react'
import {useNavigate} from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

//mui
import {CircularProgress} from '@mui/material'

//utils
import {URL} from '../../../util/URL';


export default function AddAdmin() {
    const navigate = useNavigate();
    const adminAuth = JSON.parse(localStorage.getItem('adminAuth'));

  const[data , setData] = useState({email : "" , password : "" , name : ""});
  const [loding   , setLoding] = useState(false);



  const handleCreateAdmin = async (e)=>{
      e.preventDefault();

       try{
        setLoding(true);
        let result = await fetch(`${URL}/api/admin/addAdmin` , {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json",
            Authorization: adminAuth.token,
          },
        });
           result = await result.json();
           setLoding(false);
           if(result.success){
            navigate('/admin/dashboard')
            toast.success("sucessfully add new admin");
           }else{
            toast.error(result.message);
           }
          
       }catch(err){
        setLoding(false);
        console.log(err);
        toast.error("Something went wrong");
       }


      }
  return (
    <div className="LogIn-container">
    <div className="wrapper">
      <div className="title"><span>Add Admin</span></div>
      <form onSubmit={handleCreateAdmin}>
        <div className="row">
          <i className="fas fa-user"></i>
          <input type="text" placeholder="name" onChange={(e)=>setData({...data , name : e.target.value})} required/>
        </div>
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
          <button className="loginBtn col me-3" type="submit" disabled={loding ? true : false}>{loding ? <CircularProgress size="2rem" color="inherit"/> : "Create"}</button>
        </div>
      </form>
    </div>
  </div>
  )
}
