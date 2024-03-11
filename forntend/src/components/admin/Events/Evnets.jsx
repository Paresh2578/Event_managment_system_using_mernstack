import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';


import "../../users/compontes/Event/Events.css";
import "./Events.css";

//utils
import { URL } from "../../../util/URL";


//componets
import CreateEvent from "./CreateEvent";
import EditEvent from "./EditEvent";
import EventCard from "./EventCard";
import EmptyEvent from '../EmptyEvent';
import EventCardLoading from '../../Loading/EventCardLoading'

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
  let adminAuth = JSON.parse(localStorage.getItem('adminAuth'));

  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const [category, setCategory] = useState(["completed", " uncompleted"]);
  const [activeEventCatagary, setActiveEventCatagary] = useState(-1);
  const [event, setEvent] = useState([]);
  const [dupEvent, setDupEvent] = useState([]);
  const [loading , setLoading] = useState(false);
  

  ////find scrren width
  const [windowSize, setWindowSize] = useState([window.innerWidth]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth]);
    };

    window.addEventListener("resize", handleWindowResize);

    getAllEvents();
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

 

  const getAllEvents = async () => {
    try{
      setLoading(true);
      let result = await fetch(`${URL}/api/event/getAllEvent`);
    result = await result.json();
    setLoading(false);

    if (result.success) {
      setEvent(result.data);
      setDupEvent(result.data);
    } else {
      // setLoading(false);
      toast.error("something worng");
    }
    }catch(error){
      setLoading(false);
      console.log(error);
    }
  };

  const eventFillter = (index) => {
    setActiveEventCatagary(index);

    if (index == -1) {
      setEvent(dupEvent);
    } else if (index == 0) {
      setEvent(
        dupEvent.filter((e) => 
        {
          const currentDate = new Date();
          let eventDateArr = e.date.split("/");
          eventDateArr[1] = parseInt(eventDateArr[1]) + 1;
          const eventDate = new Date(
            `${eventDateArr[0]}/${eventDateArr[1]}/${eventDateArr[2]}`
          ); // December 31, 2023 (month is 0-based, so 11 is December)
          if (currentDate >= eventDate) {
            return true;
          } else{
            return false;
          }
        }
        )
      );
    } else if (index == 1) {
      setEvent(
        dupEvent.filter((e) => {
          const currentDate = new Date();
          let eventDateArr = e.date.split("/");
          eventDateArr[1] = parseInt(eventDateArr[1]) + 1;
          const eventDate = new Date(
            `${eventDateArr[0]}/${eventDateArr[1]}/${eventDateArr[2]}`
          ); // December 31, 2023 (month is 0-based, so 11 is December)
          if (currentDate >= eventDate) {
            return false;
          } else{
            return true;
          }
        })
      );
    }
  };

  const handleCreateNewEvent = (data) => {
    setEvent([...event, data]);
    getAllEvents();
  };

  const handleEditEvent = (data, index) => {
    // setEvent([...event , event[index] = data]);
    let newEventData = [];

    event.map((e, i) => {
      if (i == index) {
        newEventData.push(data);
      } else {
        newEventData.push(e);
      }
    });

    setEvent(newEventData);
  };

  const handleRemoveEvent = (index) => {
    let newEventData = [];

    event.map((e, i) => {
      if (i != index) {
        newEventData.push(e);
      }
    });
    setEvent(newEventData);
  };

  return (
    <>

<div className="mt-0">
      <section id="portfolio" className="portfolio section-bg">
        <div className="container section-bg" data-aos="fade-up">
          <div className="section-title">
            <h2>Events</h2>
            <h3>
              All <span>Events</span>
            </h3>
          </div>

          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-12 d-flex justify-content-center">
              <ul id="portfolio-flters">
                <div className="col mb-3 ">
                <li onClick={()=>eventFillter(-1)} className={activeEventCatagary == -1 ?  "filter-active" : ""}>
                  All
                </li>
              {category.map((categoryItem, index) => (
                <li key={index} className={activeEventCatagary == index ?  "filter-active" : ""} onClick={()=>eventFillter(index)}>{categoryItem}</li>
                ))}
                </div>
               
              </ul>
            </div>
          </div>
          <div className="row ms-xl-2 ms-sm-0 ">
            {event && event.length !=0 && !loading ?
              event.map((data, index) => {
               return (<div key={index} className="col-xl-3 col-md-4 col-sm-6   p-0  ms-xl-2 ms-sm-0 me-3 mb-3 d-flex  justify-content-center">
                  <EventCard
                    data={data}
                    handleEditEvent={handleEditEvent}
                    index={index}
                    handleRemoveEvent={handleRemoveEvent}
                  />
                </div>);
              }
              ) :  loading ? <EventCardLoading/> : <EmptyEvent/>}
              
          </div>
        </div>
      </section>
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
      <CreateEvent
        open={open}
        setOpen={setOpen}
        handleCreateNewEvent={handleCreateNewEvent}
      />
    </>
  );
}
