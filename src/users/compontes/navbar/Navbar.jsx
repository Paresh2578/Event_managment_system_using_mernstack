import React from 'react'
import './navbar.css';

import { useNavigate , Link } from "react-router-dom";




export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav>
    <input type="checkbox" id="check"/>
    <label for="check" class="checkbtn">
        <i class="fa-solid fa-bars"></i>
    </label>
    <label ></label>
       <label class="logo">DesignaX</label>
       <ul>
           <li><a class="" href="#">home</a></li>
           <li><a href="#">Events</a></li>
           <li><Link to="/admin/login">Admin</Link></li>
       </ul>
   </nav>
  )
}
