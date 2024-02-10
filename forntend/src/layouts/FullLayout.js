import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import React , {useState} from "react";
import {Link , useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


import './fullLayout.css';

const FullLayout = () => {
    let navigate = useNavigate();
  const [mobileNaigation , setMobileNavigation] = useState(false);


  const togaleSidbar = ()=>{
    setMobileNavigation(mobileNaigation => !mobileNaigation);
  }


  const handleLogout = ()=>{
    localStorage.clear("adminAuth");
    navigate('/');
    toast.success("sucessfully Logout");
  }

  return (
    <>
      <div class="admin-container">
        <div class={mobileNaigation ? "navigation active" : "navigation"}>
            <ul>
                <li>
                    <Link to="dashboard">
                        <span class="icon">
                            <ion-icon name="logo-apple"></ion-icon>
                        </span>
                        <span class="title">Code Pro Admin</span>
                    </Link>
                </li>

                <li>
                    <Link to="dashboard">
                        <span class="icon">
                            <ion-icon name="home-outline"></ion-icon>
                        </span>
                        <span class="title">Dashboard</span>
                    </Link>
                </li>

                <li>
                    <Link to="events">
                        <span class="icon">
                            <ion-icon name="people-outline"></ion-icon>
                        </span>
                        <span class="title">Events</span>
                    </Link>
                </li>

                <li>
                    <a href="#">
                        <span class="icon">
                            <ion-icon name="chatbubble-outline"></ion-icon>
                        </span>
                        <span class="title">Create Event</span>
                    </a>
                </li>

               


                <li onClick={handleLogout}>
                    <a href="#">
                        <span class="icon">
                            <ion-icon name="log-out-outline"></ion-icon>
                        </span>
                        <span class="title">Sign Out</span>
                    </a>
                </li>
            </ul>
        </div>

        {/* <!-- ========================= Main ==================== --> */}
        <div class={mobileNaigation ? "main active" : "main"}>
            <div class="topbar">
                <div class="toggle" onClick={togaleSidbar}>
                    <ion-icon name="menu-outline"></ion-icon>
                </div>
            </div>

               <Outlet/>
        </div>
    </div>
    </>
  );
};

export default FullLayout;
