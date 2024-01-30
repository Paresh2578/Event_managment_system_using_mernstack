import React, { useEffect, useState } from "react";
import { useNavigate , useParams } from "react-router-dom";

import './subEvents.css'
import '../Events.css'

//utils
import {URL} from '../../../../util/URL';

//compontes
import RegistreFrom from './registreFrom';
import Navbar from "../../navbar/Navbar";
import SubEventCard from './SubEventCard';

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
  const {id } = useParams();

  // const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
  // const [eventName , setEeventName] = useState("");
  // const [group , setGroup] =useState(false);
  // const [numberOfNumber , SetNumberOfNumber] = useState(4);
  const [subEvent , setSubEvent] = useState([]);

  useEffect(()=>{
    getAllSubEvents();
  },[]);

  const getAllSubEvents = async()=>{
    let result = await fetch(`${URL}/event/getSubEvent/${id}`);
    result = await result.json();

    if(result.success){
      setSubEvent(result.data);
    }else{
     console.log("get al event error");
    }
   console.log(result);
 }


 
  return (
    <>
    <Navbar/>
      <div className="text-center mt-5" style={{ marginTop: "15vh" }}>
        <div className="container">
          <div className="col-md-8 col-md-offset-2 section-title">
            <h2>All SubEvents</h2>
          </div>
          <div id="row">
            <div
              className="col-md-3 col-sm-6 trending__card"
            >
             {
              subEvent && subEvent.map((data , index)=>(
                <div key={index}>
                  <SubEventCard data={data} open={open} setOpen={setOpen}/>
                </div>
              ))
             } 
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
