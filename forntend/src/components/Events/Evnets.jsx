import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../../users/compontes/Event/Events.css";
import "./Events.css";

//utils
import {URL} from '../../util/URL';

//componets
import CreateEvent from "./CreateEvent";
import EditEvent from "./EditEvent";
import EventCard from "./EventCard";

//mui
import { styled } from "@mui/material/styles";

import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Typography from "@mui/material/Typography";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";


export default function Events() {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
 
  const [category , setCategory] = useState(["completed" ," uncompleted"]);
  const [activeFillter , setActiveFillter]= useState(-1);
  const [event , setEvent] = useState([]);

  ////find scrren width
  const [windowSize, setWindowSize] = useState([window.innerWidth]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth]);
    };

    window.addEventListener("resize", handleWindowResize);

    getAllEvents();

    // setEvent([{name : "florik" , date : "January 21, 2021" , posterUrl : img2} , {name : "florik" , date : "January 21, 2021" , posterUrl : img2}]);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };

  }, [event]);

  const getAllEvents = async()=>{
     let result = await fetch(`${URL}/event/getAllEvent`);
     result = await result.json();


     if(result.success){
       setEvent(result.data);
     }else{
      console.log("get al event error");
     }
      
     console.log(result);
  }

  const eventFillter = (itemData , index) =>{
      setActiveFillter(index);
  }

  const handleCreateNewEvent = (data)=>{
    console.log(data);
       setEvent([...event , data]);
      //  getAllEvents();
       
  }

  const handleEditEvent = (data , index)=>{
    // setEvent([...event , event[index] = data]);
    let newEventData = [];
    
    event.map((e , i)=>{
      if(i == index){
        newEventData.push(data);
      }else{
         newEventData.push(e);
      }
    })

    setEvent(newEventData);
   
 }

 const handleRemoveEvent = (index)=>{
  let newEventData = [];
    
    event.map((e , i)=>{
      if(i != index){
        newEventData.push(e);
      }
    })
    setEvent(newEventData);

 }

  

  return (
    <>
      <div id="Events" className="text-center">
        <div className="container">
          <div className="col-md-8 col-md-offset-2 section-title">
            <h2>Events</h2>
          </div>
          <div className="row">
            <div className="col mb-3"><button className={activeFillter != -1 ? 'filter-btn' : 'filter-btn-active'} onClick={()=>{eventFillter("All" , -1)}}>All</button></div>
            {
              category.map((item , index)=> <div  className="col mb-3 "><button className={activeFillter != index ? 'filter-btn' : 'filter-btn-active'} onClick={()=>{eventFillter(item , index)}}>{item}</button></div>)
            }
          </div>
          <div className="row">
            {event && event.map((data , index)=>(
              <div className="col-md-3 col-sm-6 trending__card p-0 me-3 ">
              <EventCard key={index} data={data} handleEditEvent={handleEditEvent} index={index} handleRemoveEvent={handleRemoveEvent}/>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Fab
        aria-label="like"
        className="bg-primary text-light"
        size={windowSize[0] < 500 ? "small" : ""}
        style={{ position: "fixed", bottom: "2vh", right: "1rem" }}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>
      <CreateEvent open={open} setOpen={setOpen} handleCreateNewEvent={handleCreateNewEvent} />
      
    </>
  );
}