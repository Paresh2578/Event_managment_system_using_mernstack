import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import "./subEvents.css";
import "../Events.css";

//utils
import { URL } from "../../../../../util/URL";

//compontes
import RegistreFrom from "./registreFrom";
import SubEventCard from "./SubEventCard";

//mui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { CalendarMonth, EventSeat, AccessAlarm } from "@mui/icons-material";
import EmptyEvent from "../../../../admin/EmptyEvent";
import EventCardLoading from "../../../../Loading/EventCardLoading";

export default function SubEvents() {
  const navigate = useNavigate();
  const { id, eventName  , university} = useParams();

  const [category, setCategory] = useState([
    "Civil",
    "Computer",
    "Electrical",
    "Mechanical",
    "Management",
    "Microbiology",
    "General",
  ]);
  const [subEvent, setSubEvent] = useState([]);
  const [dupSubEvent, setDupSubEvent] = useState([]);
  const [activeEventCatagary, setActiveEventCatagary] = useState(-1);
  const [loading , setLoading]=useState(false);

  useEffect(() => {
    getAllSubEvents();
  }, []);

  const getAllSubEvents = async () => {
    setLoading(true);
    let result = await fetch(`${URL}/api/subEvent/getSubEvent/${id}`);
    result = await result.json();

    if (result.success) {
      setSubEvent(result.data);
      setDupSubEvent(result.data);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("Fetch Subevent fail");
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

  return (
    <div className="mt-5">
      <section id="portfolio" className="portfolio section-bg">
        <div className="container section-bg" data-aos="fade-up">
          <div className="section-title">
            <h2>Subevents</h2>
            <h3>
              Upcoming <span>Subevents</span>
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

          <div
            className="row portfolio-container"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {subEvent && subEvent.length != 0 && !loading?
              subEvent.map((data, index) => (
                <div
                  key={index}
                  className="col-lg-3 col-md-6 d-flex  justify-content-center"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
              
                  <SubEventCard data={data} eventName={eventName} university={university} getAllSubEvents={getAllSubEvents} />
                </div>
              )) :  loading ? <EventCardLoading/> : <EmptyEvent student={true}/>}
          </div>
        </div>
      </section>
    </div>
  );
}
