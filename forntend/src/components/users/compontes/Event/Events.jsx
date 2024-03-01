import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';


import "./Events.css";


//utils
import { URL } from "../../../../util/URL";

//mui
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

//componets
import EventCard from "./EventCard";
import Empty from "../../../admin/EmptyEvent";
import EventCardLoading from "../../../Loading/EventCardLoading";

export default function Events() {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [event, setEvent] = useState([]);
  const [loading , setLoading] = useState(false);

  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    setLoading(true);
    let result = await fetch(`${URL}/api/event/getUpcomingEvents`);
    // let result = await fetch(`${URL}/api/event/getUpcomingEvents`);
    result = await result.json();

    if (result.success) {
      setLoading(false);
      setEvent(result.data);
    } else {
      setLoading(false);
      toast.error("Fetch event fail");
    };
  };

  return (
    <section id="event" class="team section-bg">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Event</h2>
          <h3>Upcoming <span>Events</span></h3>
         </div>

        <div class="row">
        {event && event.length != 0 && !loading ?
          event.map((data, index) => (
            <div key={index} onClick={()=>navigate(`/subevent/${data.name}/${data._id}`)} class="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
              <EventCard data={data}/>
          </div>
          )) : loading ? <EventCardLoading/> : <Empty/>}

        </div>

      </div>
    </section>
  );
}
