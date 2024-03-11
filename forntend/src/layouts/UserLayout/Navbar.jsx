import React , {useState} from 'react'
import { Link } from 'react-router-dom'

//mui
import CloseIcon from '@mui/icons-material/Close';

export default function Navbar() {
  const [mobileNavbar , setMobileNavbar] = useState(false);

  return (
    <div>
       <header id="header" className="d-flex align-items-center fixed-top ">
    <div className="container d-flex align-items-center justify-content-between">

      <h1 className="logo"><Link to="/">Event<span>X</span></Link></h1>
      {/* <nav id="navbar" className="navbar"> */}
      <nav id="navbar" className={mobileNavbar ? "navbar navbar-mobile bi-list bi-x" : "navbar"}>
        <ul>
        { mobileNavbar && <li  onClick={()=>setMobileNavbar(false)} className='d-flex justify-content-end me-3'><CloseIcon/></li>}
          <li  ><a className="nav-link scrollto active d-flex justify-content-center" href="/#hero">Home</a></li>
          {/* <li><a className="nav-link scrollto" href="#about">About</a></li> */}
          <li onClick={()=>setMobileNavbar(false)}><a className="nav-link scrollto d-flex justify-content-center" href="/#event">Event</a></li>
          <li onClick={()=>setMobileNavbar(false)} ><a className="nav-link scrollto d-flex justify-content-center" href="/#contact">Contact</a></li>
          <li onClick={()=>setMobileNavbar(false)}><Link className="nav-link scrollto d-flex justify-content-center" to="/admin/dashboard">Admin</Link></li>
        </ul>
        <i className="bi bi-list mobile-nav-toggle" onClick={()=>setMobileNavbar(true)}></i>
      </nav>
      {/* <!-- .navbar --> */}
    </div>
  </header>
    </div>
  )
}
