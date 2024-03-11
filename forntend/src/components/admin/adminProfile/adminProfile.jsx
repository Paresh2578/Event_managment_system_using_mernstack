import React, { useEffect, useState } from "react";
import "./adminProfile.css";
import { useNavigate } from "react-router-dom";

//UTILS
import { URL } from "../../../util/URL";

import { ToastContainer, toast } from 'react-toastify';

export default function AdminProfile() {
    const navigate = useNavigate();

    let adminAuth = JSON.parse(localStorage.getItem('adminAuth'));
  const [admin, setAdmin] = useState({
    profileImg: "",
    name: "",
    email: "",
    password: "123",
  });

  const [adminEdit, setAdminEdit] = useState({name: false, email: false, password: false,});
  const [loding   , setLoding] = useState(false);

  useEffect(()=>{
    getAdminProfile();
  },[])

   const getAdminProfile =async ()=>{
    let admin = await fetch(`${URL}/api/admin/getAdminProfile/${adminAuth.id}` , {
        method : "GET",
        headers : {
            Authorization: adminAuth.token,
        }
    });
    admin = await admin.json();
    setAdmin({name : admin.admin.name , email : admin.admin.email})
   }

  const handleUpdateAdminProfile = async (e) => {
    e.preventDefault();

    try{
        setLoding(true);
        let result = await fetch(`${URL}/api/admin/updateAdminProfile/${adminAuth.id}` , {
          method: "PUT",
          body: JSON.stringify(admin),
          headers: {
            "content-type": "application/json",
            Authorization: adminAuth.token,
          },
        });
           result = await result.json();
           setLoding(false);
           if(result.success){
            localStorage.setItem('adminAuth', JSON.stringify(result));
            navigate('/admin/dashboard')
            toast.success("sucessfully update profile");
           }else{
            toast.error(result.message);
           }
          
       }catch(err){
        setLoding(false);
        console.log(err);
        toast.error("Something went wrong");
       }

  };

  return (
    <div className="adminProfile-body">
      <div className="wrapper">
        <div className="img-area">
          <div className="inner-area">
            <img
              src="https://images.unsplash.com/photo-1492288991661-058aa541ff43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
        </div>
        <form onSubmit={handleUpdateAdminProfile}>
          <div className="d-flex" >
            {!adminEdit.name ? (
              <div className="name">{admin.name}</div>
            ) : (
              <input
                type="text"
                placeholder="name"
                value={admin.name}
                onChange={(e)=>setAdmin({...admin , name : e.target.value})}
                required
              />
            )}
            <div className="social-icons ms-1" onClick={()=>setAdminEdit({name: !adminEdit.name, email: false, password: false,})}>
            {/* <div className="social-icons ms-1" onClick={()=>setAdminEdit({name: true, email: false, password: false,})}> */}
              <div  className="fb">
                <i className={adminEdit.name ? "fa fa-check" : "fa fa-edit"}></i>
              </div>
            </div>
          </div>

         <div className="d-flex">
         {!adminEdit.email ? (
            <div className="about">{admin.email}</div>
          ) : (
            <input
              type="text"
              placeholder="email"
              value={admin.email}
              onChange={(e)=>setAdmin({...admin , email : e.target.value})}
              required
            />
          )}
          <div className="social-icons ms-1" onClick={()=>setAdminEdit({name: false, email: !adminEdit.email, password: false,})}>
              <div  className="fb">
                <i className={adminEdit.email ? "fa fa-check" : "fa fa-edit"}></i>
              </div>
            </div>
         </div>

         {/* <div className="d-flex">
         {!adminEdit.password ? (
            <div className="about"> password : 123</div>
          ) : (
            <input
              type="text"
              placeholder="password"
              value={admin.password}
              onChange={(e)=>setAdmin({...admin , passewrod : e.target.value})}
              required
            />
          )}
          <div className="social-icons ms-1" onClick={()=>setAdminEdit({name: false, email: false, password: !adminEdit.password,})}>
              <div  className="fb">
                <i className={adminEdit.password ? "fa fa-check" : "fa fa-edit"}></i>
              </div>
            </div>
         </div> */}

          <div className="buttons mt-4">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
