import React, { useState, useEffect } from "react";
import { useParams , useNavigate } from 'react-router-dom';

import "../../../users/compontes/Event/Events.css";

//utils
import {URL} from '../../../util/URL';

//componets
import CeateSubEvents from "./ceateSubEvents";
import EditSubEvent from './EditSubEvent'
import SubEventCard from './subEventCard';

//mui
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
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

import img from "../../../users/compontes/Event/assets/client-1.jpg";

export default function SubEvents() {
  const navigate = useNavigate();
  const {id } = useParams();

  const [subEvent , setSubEvent] = useState([]);
  const [open, setOpen] = useState(false);


  
    const [category , setCategory] = useState(["Civil" , "Computer" , "Electrical" , "Mechanical" , "Management" , "Microbiology" , "General"]);
    const [activeFillter , setActiveFillter]= useState(-1);
  

  ////find scrren width
  const [windowSize, setWindowSize] = useState([window.innerWidth]);

  useEffect(() => {

    // setSubEvent([{
    //   name: "app-thon",
    //   category: "Computer",
    //   time: "10:20",
    //   seats : 10,
    //   grupMember: 4,
    //   isGroup: 'true',
    //   posterUrl: img,
    // }]);

    const handleWindowResize = () => {
      setWindowSize([window.innerWidth]);
    };

    window.addEventListener("resize", handleWindowResize);

    getAllSubEvents();

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [subEvent]);

  const getAllSubEvents = async()=>{
    let result = await fetch(`${URL}/event/getSubEvent/${id}`);
    result = await result.json();

    if(result.success){
      setSubEvent(result.data);
    }else{
     console.log("get al event error");
    }
 }

  const eventFillter = (itemData , index) =>{
    // const filterData = GalleryData.filter((item)=> item == itemData);
    // setData(filterData);
      setActiveFillter(index);
  }

  // handleCreateSubEvent
  const handleCreateSubEvent = (data)=>{
       setSubEvent([...subEvent , {...data , time : data.time.toDateString()}]);
      //  getAllEvents();
  }

  const handleEditSubEvent = (data , index)=>{
    // setEvent([...event , event[index] = data]);
    let temp = [];
    
    subEvent.map((e , i)=>{
      if(i == index){
        temp.push(data);
      }else{
         temp.push(e);
      }
    })

    setSubEvent(temp);
 }

 const handleRemoveSubEvent = (index)=>{
  let newEventData = [];
    
    subEvent.map((e , i)=>{
      if(i != index){
        newEventData.push(e);
      }
    })
    setSubEvent(newEventData);
 }


  return (
    <>
     <div className="text-center mt-5" style={{ marginTop: "15vh" }}>
        <div className="container">
          <div className="col-md-8 col-md-offset-2 section-title">
            <h2>All SubEvents</h2>
            {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p> */}
          </div>

          <div className="row">
            <div className="col mb-3"><button className={activeFillter != -1 ? 'filter-btn' : 'filter-btn-active'} onClick={()=>{eventFillter("All" , -1)}}>All</button></div>
            {
              category.map((item , index)=> <div  className="col mb-3 "><button className={activeFillter != index ? 'filter-btn' : 'filter-btn-active'} onClick={()=>{eventFillter(item , index)}}>{item}</button></div>)
            }
          </div>
          
          <div className="row">
          {subEvent && subEvent.map((data , index)=>(
              <div className="col-md-3 col-sm-6 trending__card p-0 me-3 ">
              <SubEventCard key={index} data={data} handleEditSubEvent={handleEditSubEvent} index={index} handleRemoveSubEvent={handleRemoveSubEvent}/>
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
     <CeateSubEvents open={open} setOpen={setOpen}  handleCreateSubEvent={handleCreateSubEvent} eventID={id}/>
    </>
  );
}
