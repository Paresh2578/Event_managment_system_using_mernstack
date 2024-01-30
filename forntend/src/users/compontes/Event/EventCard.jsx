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
     <div>
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
                {/* <Typography variant="body2" color="text.secondary">
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests. Add 1 cup of frozen peas
                  along with the mussels, if you like.
                </Typography> */}
              </CardContent>
              
            </div>
    </>
}