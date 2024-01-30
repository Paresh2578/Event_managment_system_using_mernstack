import React from "react";



//mui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Button from "@mui/material/Button";

//compontes
import RegistreFrom from './registreFrom';


import img from '../assets/client-2.jpg'

export default function SubEventCard({data , open , setOpen }){
    const registerPopup = (name)=>{
        // setEeventName(name);
        setOpen(true);
       }
      
    return <>
      <RegistreFrom open={open} setOpen={setOpen} eventName={data.subEventname} group={data.isGroup} numberOfNumber={data.groupMember}/>
    <div>
                <div className="card-container">
                  <div className="img-text">
                    <span className="text-center">
                      <EventSeatIcon /> {data.seats} Seat
                    </span>
                  </div>
                  <img
                    src={data.subEventPosterUrl}
                    alt="Your Alt Text"
                    className="overlay-image"
                  />
                </div>
                <CardContent>
                  <p style={{ textAlign: "left" }}>
                    <CalendarMonthIcon color="#6372ff" /> <span>{data.time}</span>
                  </p>
                  <p>{data.subEventname}</p>
                </CardContent>
                <CardActions>
                  <Button  variant="outlined" onClick={()=>registerPopup("App-A-Thon")}>register</Button>
                </CardActions>
              </div>
    </>
}