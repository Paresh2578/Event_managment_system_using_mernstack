import React, { useEffect, useState } from "react";
import { useNavigate , useParams } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';


import './subEvents.css'
import '../Events.css'

//utils
import {URL} from '../../../../../util/URL';

//compontes
import RegistreFrom from './registreFrom';
import Navbar from "../../navbar/Navbar";
import SubEventCard from './SubEventCard';

//mui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {CalendarMonth  , EventSeat, AccessAlarm} from "@mui/icons-material";






export default function SubEvents() {
  const navigate = useNavigate();
  const {id , eventName } = useParams();

  // const [isHovered, setIsHovered] = useState(false);
  
  // const [eventName , setEeventName] = useState("");
  // const [group , setGroup] =useState(false);
  // const [numberOfNumber , SetNumberOfNumber] = useState(4);
  const [category , setCategory] = useState(["Civil" , "Computer" , "Electrical" , "Mechanical" , "Management" , "Microbiology" , "General"]);
  const [subEvent , setSubEvent] = useState([]);
  const [dupSubEvent  ,  setDupSubEvent] = useState([]);
  const [activeFillter , setActiveFillter]= useState(-1);



  useEffect(()=>{
    getAllSubEvents();
  },[]);

  const getAllSubEvents = async()=>{
    let result = await fetch(`${URL}/subEvent/getSubEvent/${id}`);
    result = await result.json();

    if(result.success){
      setSubEvent(result.data);
      setDupSubEvent(result.data);
    }else{
      toast.error("Fetch Subevent fail");
       }
 }

 const eventFillter = (itemData , index) =>{
  // setData(filterData);
    setActiveFillter(index);
    // setSubEvent(subEvent.filter((e)=>e.category.toString().toLowerCase() != category[index]).toString().toLowerCase());
    if(index == -1){
      setSubEvent(dupSubEvent);
    }else{
   setSubEvent(dupSubEvent.filter((e)=>e.category.toString().toLowerCase() == category[index].toString().toLowerCase()));
    }
}

 
  return (
    <div className="user-body" style={{}}>
    <Navbar/>
    <section class="gallery container"  style={{ paddingTop: "20vh" }}>
      <h1 class="heading">
       All sub <span>Events</span>
      </h1>

      <div className="row filter-button">
            <div class="">
            <button className={activeFillter != -1 ? 'filter-btn  mb-2 me-1' : 'filter-btn-active mb-2 me-1'} onClick={()=>{eventFillter("All" , -1)}}>All</button>
            {
              category.map((item , index)=> <button className={activeFillter != index ? 'filter-btn  mb-2 me-1' : 'filter-btn-active  mb-2 me-1'} onClick={()=>{eventFillter(item , index)}}>{item}</button>)
            }

            </div>

            </div>

            <div className="row">
            {subEvent &&
              subEvent.map((data, index) => (
                <div key={index} className="col-md-3 col-sm-6 trending__card">
                  <SubEventCard data={data}  eventName={eventName}/>
                </div>
              ))}
          </div>

      {/* <div class="box-container">
      <div className="text-center " >
        <div className="container">
          
          <div className="row">
             {
              subEvent.length >= 1 && subEvent.map((data , index)=>(
                <div key={index} className="col-md-3 col-sm-6 trending__card">
                  <SubEventCard data={data}  eventName={eventName}/>
                </div>
              ))
             } 
          </div>
        </div>
      </div>
      </div> */}
    </section>
      
    </div>
  );
}