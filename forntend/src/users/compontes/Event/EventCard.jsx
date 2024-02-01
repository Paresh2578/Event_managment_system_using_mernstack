import React from "react";

//mui
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import img2 from "./assets/client-3.jpg"

export default function EventCard({data}){
    return <>

    {/* <div class="card p-0" data-name="nature">
          <img src="images/nature-1.jpg" alt="img"/>
          <div class="card-body">
            <h6 class="card-title">Mountains</h6>
            <p class="card-text">Lorem ipsum dolor..</p>
          </div>
        </div> */}
     <div className="m-2">
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
              
            </div>
    </>
}