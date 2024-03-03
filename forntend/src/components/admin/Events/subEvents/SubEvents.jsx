import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "../../../users/compontes/Event/Events.css";

//utils
import { URL } from "../../../../util/URL";

//componets
import CeateSubEvents from "./ceateSubEvents";
import EditSubEvent from "./EditSubEvent";
import SubEventCard from "./subEventCard";
import EmptyEvent from "../../EmptyEvent";

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

export default function SubEvents() {
  const navigate = useNavigate();
  const { id , competed } = useParams();
  const adminAuth = JSON.parse(localStorage.getItem('adminAuth'));

  const [subEvent, setSubEvent] = useState([]);
  const [open, setOpen] = useState(false);
  const [winners, setWinners] = useState([]);

  const [category, setCategory] = useState([
    "Civil",
    "Computer",
    "Electrical",
    "Mechanical",
    "Management",
    "Microbiology",
    "General",
  ]);
  const [activeEventCatagary, setActiveEventCatagary] = useState(-1);
  const [dupSubEvent, setDupSubEvent] = useState([]);

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
    getAllWinners();

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const getAllWinners =async ()=>{
    let result = await fetch(`${URL}/api/winner/getAllWinner`, {
         headers: {
           "content-type": "application/json",
           "Authorization": adminAuth.token
                  },
       });

       result = await result.json();
       if(result.success){
        setWinners(result.data);
       }else{
        toast.error(result.message)
       }

       }

  const getAllSubEvents = async () => {
    let result = await fetch(`${URL}/api/subEvent/getSubEvent/${id}`);
    result = await result.json();

    if (result.success) {
      setSubEvent(result.data);
      setDupSubEvent(result.data);
    } else {
      toast.error("something worng");
    }
  };

  const eventFillter = (index) => {
    setActiveEventCatagary(index);
    if (index == -1) {
      setSubEvent(dupSubEvent);
    } else {
      setSubEvent(
        dupSubEvent.filter(
          (e) =>
            e.category.toString().toLowerCase() ==
            category[index].toString().toLowerCase()
        )
      );
    }
  };

  // handleCreateSubEvent
  const handleCreateSubEvent = (data) => {
    setSubEvent([...subEvent, { ...data, startTime: data.startTime.toDateString()  , endTime: data.endTime.toDateString()}]);
    getAllSubEvents();
  };

  const handleEditSubEvent = (data, index) => {
    // setEvent([...event , event[index] = data]);
    let temp = [];

    subEvent.map((e, i) => {
      if (i == index) {
        temp.push(data);
      } else {
        temp.push(e);
      }
    });

    setSubEvent(temp);
  };

  const handleRemoveSubEvent = (index) => {
    let newEventData = [];

    subEvent.map((e, i) => {
      if (i != index) {
        newEventData.push(e);
      }
    });
    setSubEvent(newEventData);
  };

  return (
    <>
  

      <div className="mt-0">
        <section id="portfolio" class="portfolio section-bg">
          <div class="container section-bg" data-aos="fade-up">
            <div class="section-title">
              <h2>Subevents</h2>
              <h3>
                All <span>subEvents</span>
              </h3>
            </div>

            <div class="row" data-aos="fade-up" data-aos-delay="100">
              <div class="col-lg-12 d-flex justify-content-center">
                <ul id="portfolio-flters">
                  <div className="col mb-3 ">
                    <li
                      onClick={() => eventFillter(-1)}
                      class={activeEventCatagary == -1 ? "filter-active" : ""}
                    >
                      All
                    </li>
                    {category.map((categoryItem, index) => (
                      <li
                        key={index}
                        class={
                          activeEventCatagary == index ? "filter-active" : ""
                        }
                        onClick={() => eventFillter(index)}
                      >
                        {categoryItem}
                      </li>
                    ))}
                  </div>
                </ul>
              </div>
            </div>
            <div   class="row portfolio-container"
            data-aos="fade-up"
            data-aos-delay="200">
            {subEvent &&
              subEvent.map((data, index) => (
                <div className="col-lg-3 col-md-6 d-flex align-items-stretch m-sm-3 me-xl-2 ">
                  <SubEventCard
                    key={index}
                    data={data}
                    competed={competed}
                    winner = {winners}
                    handleEditSubEvent={handleEditSubEvent}
                    index={index}
                    handleRemoveSubEvent={handleRemoveSubEvent}
                  />
                </div>
              ))}
              {SubEventCard.length == 0 && <EmptyEvent />}
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
      <CeateSubEvents
        open={open}
        setOpen={setOpen}
        handleCreateSubEvent={handleCreateSubEvent}
        eventID={id}
      />
    </>
  );
}
