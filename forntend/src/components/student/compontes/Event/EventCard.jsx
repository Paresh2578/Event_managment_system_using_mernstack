import React from "react";

//mui
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function EventCard({ data }) {
  return (
    <>

<div className="member">
              <div className="member-img">
                {/* <img src={data.eventPosterUrl} class="" alt={data.name}/> */}
                <img src={data.eventPosterUrl} className="" alt={data.name} height={'auto'} width={'auto'}/>
              </div>
              <div className="member-info">
                <h4>{data.name}</h4>
                <span><CalendarMonthIcon/> {data.date}</span>
              </div>
            </div>
    </>
  );
}
