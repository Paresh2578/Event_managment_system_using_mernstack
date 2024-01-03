import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../../../users/compontes/navbar/Event/Events.css";

//componets
// import CreateEvent from "./CreateEvent";
// import EditEvent from './EditEvent'

//mui
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
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

import img2 from "../../../users/compontes/navbar/Event/assets/client-1.jpg";

export default function SubEvents() {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [editEventOpen , setEditEventOpen] = useState(false);

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
          <div className="row">
            <div
              className="col-md-3 col-sm-6 trending__card p-0"
              
            >
              <div>
                <CardMedia
                  component="img"
                  className={`image-container ${
                    isHovered ? "hovered" : ""
                  } seller__card`}
                  onClick={() => navigate("/events/2")}
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
                  <Fab color="secondary" size="small" aria-label="edit" onClick={()=>setEditEventOpen(true)}>
                    <EditIcon />
                  </Fab>
                  <Fab color="error" className="ms-2" size="small" aria-label="Delet">
                    <DeleteIcon />
                  </Fab>
                </CardContent>
              </div>
            </div>
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
      {/* <CreateEvent open={open} setOpen={setOpen} />
      <EditEvent open={editEventOpen} setOpen={setEditEventOpen}/> */}
    </>
  );
}
