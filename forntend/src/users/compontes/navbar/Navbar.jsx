// import React from 'react'
// import './navbar.css';

// import { useNavigate , Link } from "react-router-dom";

// // let menu = document.querySelector("#menu-bars");
// // let navbar = document.querySelector(".navbar");

// const handleTogalMenu = () => {
// //   menu.classList.toggle("fa-times");
// //   navbar.classList.toggle("active");
// };

// // window.onscroll = () => {
// //   menu.classList.remove("fa-times");
// //   navbar.classList.remove("active");
// // };


// export default function Navbar() {
//   const navigate = useNavigate();
//   return (
//     <>
//     <div class="user-header">
//       <a href="#" class="logo"><span>k</span>anasu</a>

//       <div class="user-navbar">
//         <Link to="/#home" ><a href='#home'>home</a></Link>
//         <a href="#about">about</a>
//         <a href="#gallery">events</a>
//         <a href="#contact">contact</a>
//         <Link to="/admin">admin</Link>
//       </div>

//       <div id="menu-bars" class="fas fa-bars fa-times active" onClick={()=>handleTogalMenu}></div>
//     </div>
//    </>
//   )
// }









import React, { useState, useEffect } from 'react';
// import './navbar.css';
import '../Home.css'
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  const handleScroll = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="user-header">
        <a href="#" className="logo">
          <span>k</span>anasu
        </a>

        <div className={`user-navbar ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/#home">
            <a href="#home">home</a>
          </Link>
          <a href="#about">about</a>
          <a href="#gallery">events</a>
          <a href="#contact">contact</a>
          <Link to="/admin">admin</Link>
        </div>

        <div
          id="menu-bars"
          className={`fas fa-bars ${isMenuOpen ? 'fa-times active' : ''}`}
          onClick={handleToggleMenu}
        ></div>
      </div>
    </>
  );
}
