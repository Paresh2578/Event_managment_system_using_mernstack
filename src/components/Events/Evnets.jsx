import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../../users/compontes/Event/Events.css";
import "./Events.css";

//componets
import CreateEvent from "./CreateEvent";
import EditEvent from "./EditEvent";

//mui
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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

import img2 from "../../users/compontes/Event/assets/client-1.jpg";

export default function Events() {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [editEventOpen, setEditEventOpen] = useState(false);
  // const [category , setCategory] = useState(["Civil" , "Computer" , "Electrical" , "Mechanical" , "Management" , "Microbiology" , "General"]);
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

    setEvent([{name : "abc" , date : "mm/dd/yy" , posterUrl : img2}]);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };

  }, []);

  const eventFillter = (itemData , index) =>{
    // const filterData = GalleryData.filter((item)=> item == itemData);
    // setData(filterData);
      setActiveFillter(index);
  }

  const handleCreateNewEvent = (data)=>{
       setEvent([...event , data]);
  }

  return (
    <>
      <div id="Events" className="text-center">
        <div className="container">
          <div className="col-md-8 col-md-offset-2 section-title">
            <h2>Events</h2>
            {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p> */}

          </div>
          {/* <div className="filterItem"> */}
          <div className="row">
            <div className="col mb-3"><button className={activeFillter != -1 ? 'filter-btn' : 'filter-btn-active'} onClick={()=>{eventFillter("All" , -1)}}>All</button></div>
            {
              category.map((item , index)=> <div  className="col mb-3 "><button className={activeFillter != index ? 'filter-btn' : 'filter-btn-active'} onClick={()=>{eventFillter(item , index)}}>{item}</button></div>)
            }
          </div>
        {/* </div> */}
          <div className="row">
            {event && event.map((e)=>(
              <div className="col-md-4 col-sm-6 trending__card p-0">
              <div>
                <CardMedia
                  component="img"
                  onClick={() => navigate("/admin/events/2")}
                  height="200"
                  image={img2}
                  alt="Paella dish"
                />
                <CardContent>
                  <p style={{ textAlign: "left" }}>
                    <CalendarMonthIcon htmlColor="#6372ff" />{" "}
                    <span>January 21, 2021</span>
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
            ))}
            {/* <div
              className="col-md-3 col-sm-6 team"
              onClick={() => navigate("event/2")}
            ></div> */}
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
      <EditEvent open={editEventOpen} setOpen={setEditEventOpen} />
    </>
  );
}
