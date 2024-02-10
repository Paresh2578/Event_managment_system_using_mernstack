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
      <div>
        <div class="box">
          <img src={data.eventPosterUrl} alt="" />
          <h3 class="title"> {data.name}</h3>
        </div>
        <div className="pt-3 pb-3 cardInfo">
          <p style={{ textAlign: "left" , color:"white" }} className="">
            <CalendarMonthIcon htmlColor="#6372ff"  style={{fontSize:"2rem"}}/> <span style={{fontSize:"2rem"}}>{data.date}</span>
          </p>
          <p style={{ textAlign: "center" , color:"white"  ,}}>
            <span style={{borderBottom:"4px solid #6372ff"   , fontSize:"2rem"}}>
              {data.name}
              </span>
            </p>
        </div>
      </div>

      

      {/* <div class="card p-0" data-name="nature">
          <img src="images/nature-1.jpg" alt="img"/>
          <div class="card-body">
            <h6 class="card-title">Mountains</h6>
            <p class="card-text">Lorem ipsum dolor..</p>
          </div>
        </div> */}
      {/* <div className="m-2">
              <CardMedia
                component="img"
                className={`image-container`}
                height="250"
                image={data.eventPosterUrl}
                alt="not found"
              />
              <CardContent>
                <p style={{textAlign : 'left'}}>
                  <CalendarMonthIcon htmlColor="#6372ff"/> <span>{data.date}</span>
                </p>
                <p>
                  {data.name}
                </p>
              
              </CardContent>
              
            </div> */}
    </>
  );
}
