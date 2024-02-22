import React from "react";
import { Outlet } from "react-router-dom";


//compontes
import Footer from "./Footer";
import Navbar from "./Navbar";

const UserLayout = () => {

  return (
    <>
           <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  );
};

export default UserLayout;
