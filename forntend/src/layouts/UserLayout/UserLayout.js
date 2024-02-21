import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "@mui/icons-material";
import Footer from "./Footer";

export default function UserLayout() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  );
}
