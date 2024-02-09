import React , {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

import './Events.css'

//utils
import {URL} from '../../../util/URL';

//mui
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

//componets
import EventCard from './EventCard';

import img2 from "./assets/client-3.jpg"


export default function Events() {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [event  , setEvent] = useState([]);


  useEffect(()=>{
    console.log("load");
    getAllEvents();
  },[]);

  const getAllEvents = async()=>{
    let result = await fetch(`${URL}/event/getAllEvent`);
    result = await result.json();


    if(result.success){
      setEvent(result.data);
    }else{
     console.log("get all event error");
    }
     
    console.log(result);
 }


  return (
    <div id="Events" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Events</h2>
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p> */}
        </div>
        <div className="p-4">
        <div className="row mt-4 gap-4 container" >
                {
                event && event.map((data , index)=>(
                    // <div key={index}  onClick={()=>navigate(`subevent/${data.name}/${data._id}`)} >
                    <div key={index} className="col-md-3 col-sm-6 trending__card p-0" onClick={()=>navigate(`subevent/${data.name}/${data._id}`)} >
                    <EventCard data={data}/>
                    </div>
                )) 
                 }
        </div>
        </div>
      </div>
    </div>
  );
}
