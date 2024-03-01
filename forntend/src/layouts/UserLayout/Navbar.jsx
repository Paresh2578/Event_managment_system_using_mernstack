import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
       <header id="header" class="d-flex align-items-center fixed-top ">
    <div class="container d-flex align-items-center justify-content-between">

      <h1 class="logo"><Link to="/">Event<span>X</span></Link></h1>
      <nav id="navbar" class="navbar">
        <ul>
          <li><a class="nav-link scrollto active" href="/#hero">Home</a></li>
          {/* <li><a class="nav-link scrollto" href="#about">About</a></li> */}
          <li><a class="nav-link scrollto" href="/#event">Event</a></li>
          <li><a class="nav-link scrollto" href="/#contact">Contact</a></li>
          <li><Link class="nav-link scrollto" to="/admin/dashboard">Admin</Link></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>
      {/* <!-- .navbar --> */}
    </div>
  </header>
    </div>
  )
}
