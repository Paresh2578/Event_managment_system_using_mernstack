import { Outlet } from "react-router-dom";
import { Container } from "reactstrap";
import React , {useState , useEffect} from "react";
import {Link , useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


import './AdminLayout.css';

import Footer from '../UserLayout/Footer'

const FullLayout = () => {
    let navigate = useNavigate();
  const [mobileNaigation , setMobileNavigation] = useState(false);
  const [currActiveComponet  , setCurrActiveComponet] = useState(1);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const togaleSidbar = ()=>{

    // if(width)
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
                <li  onClick={width <= 991 ? togaleSidbar :  ()=>{}}>
                    <Link to="dashboard" >
                        <span class="icon">
                            <ion-icon name="logo-apple"></ion-icon>
                        </span>
                        <span class="title">Code Pro Admin</span>
                    </Link>
                </li>

                <li className={currActiveComponet == 1 ? "active-naviation" : ""}  onClick={width < 991 ? togaleSidbar :  ()=>{setCurrActiveComponet(1)}}>
                    <Link to="dashboard" >
                        <span class="icon">
                            <ion-icon name="home-outline"></ion-icon>
                        </span>
                        <span class="title">Dashboard</span>
                    </Link>
                </li>

                <li className={currActiveComponet == 2 ? "active-naviation" : ""}   onClick={width < 991 ? togaleSidbar : ()=>{setCurrActiveComponet(2)}}>
                    <Link to="events">
                        <span class="icon">
                            <ion-icon name="people-outline"></ion-icon>
                        </span>
                        <span class="title">Events</span>
                    </Link>
                </li>

                {/* <li className={currActiveComponet == 3 ? "active-naviation" : ""}  onClick={width < 991 ? togaleSidbar :  ()=>{setCurrActiveComponet(3)}}>
                    <a href="#" >
                        <span class="icon">
                            <ion-icon name="chatbubble-outline"></ion-icon>
                        </span>
                        <span class="title">Create Event</span>
                    </a>
                </li> */}

               


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
    <Footer/>
    </div>

    </>
  );
};

export default FullLayout;
