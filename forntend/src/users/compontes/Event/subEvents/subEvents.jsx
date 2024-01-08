import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import './subEvents.css'
import '../Events.css'

//compontes
import RegistreFrom from './registreFrom';
import Navbar from "../../navbar/Navbar";

//mui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Button from "@mui/material/Button";


import img from '../assets/client-2.jpg'




export default function SubEvents() {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [eventName , setEeventName] = useState("");
  const [group , setGroup] =useState(false);
  const [numberOfNumber , SetNumberOfNumber] = useState(4);

 const registerPopup = (name)=>{
  setEeventName(name);
  setOpen(true);
 }

  return (
    <>
    <Navbar/>
      <RegistreFrom open={open} setOpen={setOpen} eventName={eventName} group={group} numberOfNumber={numberOfNumber}/>
      <div className="text-center mt-5" style={{ marginTop: "15vh" }}>
        <div className="container">
          <div className="col-md-8 col-md-offset-2 section-title">
            <h2>All SubEvents</h2>
          </div>
          <div id="row">
            <div
              className="col-md-3 col-sm-6 trending__card"
            >
              <div>
                <div className="card-container">
                  <div className="img-text">
                    <span className="text-center">
                      <EventSeatIcon /> 100 Seat
                    </span>
                  </div>
                  <img
                    src={img}
                    alt="Your Alt Text"
                    className="overlay-image"
                  />
                </div>
                <CardContent>
                  <p style={{ textAlign: "left" }}>
                    <CalendarMonthIcon color="#6372ff" /> <span>00:00:00</span>
                  </p>
                  <p>App-A-Thon</p>
                </CardContent>
                <CardActions>
                  <Button  variant="outlined" onClick={()=>registerPopup("App-A-Thon")}>register</Button>
                </CardActions>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
