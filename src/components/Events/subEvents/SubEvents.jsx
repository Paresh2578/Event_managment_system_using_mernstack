import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../../../users/compontes/navbar/Event/Events.css";

//componets
import CeateSubEvents from "./ceateSubEvents";
import EditSubEvent from './EditSubEvent'

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

import img from "../../../users/compontes/navbar/Event/assets/client-1.jpg";

export default function SubEvents() {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [editEventOpen , setEditEventOpen] = useState(false);
    const [category , setCategory] = useState(["Civil" , "Computer" , "Electrical" , "Mechanical" , "Management" , "Microbiology" , "General"]);
    const [activeFillter , setActiveFillter]= useState(-1);
  

  ////find scrren width
  const [windowSize, setWindowSize] = useState([window.innerWidth]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const eventFillter = (itemData , index) =>{
    // const filterData = GalleryData.filter((item)=> item == itemData);
    // setData(filterData);
      setActiveFillter(index);
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
          
          <div id="row">
            <div
              className="col-md-4 col-sm-6 trending__card"
            >
              <div>
                <div className="card-container">
                  {/* <p className="img-text">Your Text Goes Here</p> */}
                  <div className="img-text">
                    <span className="text-center">
                      <EventSeatIcon /> 100 Seat
                    </span>
                    {/* <p>100</p> */}
                  </div>
                  <img
                    src={img}
                    style={{height :'200px'}}
                    alt="Your Alt Text"
                    className="overlay-image"
              onClick={()=>navigate('/admin/events/subevent/id')}
                  />
                </div>
                <CardContent>
                  <p style={{ textAlign: "left" }}>
                    <CalendarMonthIcon color="#6372ff" /> <span>00:00:00</span>
                  </p>
                  <p>App-A-Thon</p>
                  <Button color="secondary" onClick={() => setEditEventOpen(true)} startIcon={<EditIcon size="small" />} ></Button>
                  <Button color="error" startIcon={<DeleteIcon 
                    className="ms-2"
                    size="small" />}>
                  </Button>
                </CardContent>
              </div>
            </div>
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
     <CeateSubEvents open={open} setOpen={setOpen} />
      <EditSubEvent open={editEventOpen} setOpen={setEditEventOpen}/>
    </>
  );
}
