import React, { useState } from "react";

//utile
import { formetTime } from "../../../../../util/FormentTime";

//mui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { EventSeat, AccessAlarm } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";

//compontes
import RegistreFrom from "./registreFrom";
import EventDiscriptionDialog from "./eventDiscriptionDialog";

export default function SubEventCard({ data, eventName,university , getAllSubEvents }) {
  const [registerOpen, setregisterOpen] = useState(false);
  const [eventDiscriptionOpen, setEventDiscriptionOpen] = useState(false);

  const handleRegister = () => {
    if (
      data.seats -
        data.singleParticipation.length -
        data.groupParticipation.length ==
      0
    ) {
      toast.error("No avalible seats");
      //  return;
    } else {
      setregisterOpen(true);
    }
  };

  return (
    <>
      <RegistreFrom
        registerOpen={registerOpen}
        setregisterOpen={setregisterOpen}
        data={data}
        eventName={eventName}
        university={university}
        getAllSubEvents={getAllSubEvents}
      />
      <EventDiscriptionDialog
        open={eventDiscriptionOpen}
        setOpen={setEventDiscriptionOpen}
        data={data}
        eventName={eventName}
      />

      <div className="card" style={{ width: "18rem" }}>
      <div className="card-container ">
       
       <div className="img-text">
         <span className="text-center">
           <EventSeat />  {data.seats - data.singleParticipation.length - data.groupParticipation.length}  Seat
         </span>
      
       </div>
       <img
         src={data.subEventPosterUrl}
         style={{ height: "200px" }}
         alt="Your Alt Text"
         className="overlay-image"
       
       />
     </div>
        <div className="card-body member">
          <div className="d-flex justify-content-between">
          <h5 className="card-title fs-4">{data.subEventname}</h5>
          <div className="">{data.paid ?<span className="bg-light font-weight-bold rounded-1 p-1">₹ {data.pay}</span> :<span className="bg-success text-light font-weight-bold rounded-1 p-1">Free</span>}</div>
          </div>
          <p className="card-text">
          <AccessAlarm color="#6372ff" /> <span >{`${formetTime(data.startTime)}-${formetTime(data.endTime)}`}</span>
          </p>

          <div className="row">
            <div className="col btn btn-primary me-2 ms-2" onClick={()=>handleRegister()}>Register</div>
            <div className="col btn btn-info me-2" onClick={()=>setEventDiscriptionOpen(true)}>more details</div>
          </div>
          
        </div>
      </div>

      {/* <div class="member">
       
        <div className="">
          <div className="img-text">
            <span className="text-center">
              <EventSeat />{" "}
              {data.seats -
                data.singleParticipation.length -
                data.groupParticipation.length}{" "}
              Seat
            </span>
          </div>
          
                <img src={data.subEventPosterUrl} class="" alt=""/>
              
        </div>
        <div class="member-info">
          <h4>ssdd</h4>
          <span>
            <AccessAlarm />
            "dddd
          </span>
        </div>
      </div> */}

      {/* <div  style={{backgroundColor : "#333"}}>
      <div className="card-container ">
       
        <div className="img-text">
          <span className="text-center">
            <EventSeat />  {data.seats - data.singleParticipation.length - data.groupParticipation.length}  Seat
          </span>
       
        </div>
        <img
          src={data.subEventPosterUrl}
          style={{ height: "200px" }}
          alt="Your Alt Text"
          className="overlay-image"
        
        />
      </div>
      <CardContent >
        <p style={{ textAlign: "left"}}>
          <AccessAlarm color="" style={{color : 'white'}}/> <span style={{color : 'white'}}>{formetTime(data.time)}</span>
        </p>
        <p style={{fontSize:'1.5rem' , color : 'white'}}>{data.subEventname}</p>
      </CardContent>
      <CardActions>
                  <Button  variant="outlined" style={{color:"white" }} onClick={()=>handleRegister()}>register</Button>
                  <Button  variant="outlined" style={{color:"white" }} onClick={()=>setEventDiscriptionOpen(true)}>Information</Button>
       </CardActions>
    </div> */}

      {/* <div style={{backgroundColor : "#333"}}>
                <div className="card-container">
                  <div className="img-text">
                    <span className="text-center">
                      <EventSeat /> {data.seats - data.singleParticipation.length - data.groupParticipation.length} Seat
                    </span>
                  </div>
                  <img
                    src={data.subEventPosterUrl}
                    alt="Your Alt Text"
                    className="overlay-image"
                  />
                </div>
                <CardContent>
                  <p style={{ textAlign: "left" , color:"white" }}>
                    <AccessAlarm color="#6372ff" style={{fontSize:"2rem"}} /> <span style={{fontSize:"2rem"}}>{formetTime(data.time)}</span>
                  </p>
                  <p style={{ textAlign: "center" , color:"white"  ,}}>
            <span style={{borderBottom:"4px solid #6372ff"   , fontSize:"2rem"}}>
            {data.subEventname}
              </span>
            </p>
                </CardContent>
                <CardActions>
                  <Button  variant="outlined" style={{color:"white"  , fontSize:"1.5rem"}} onClick={()=>handleRegister()}>register</Button>
                </CardActions>
              </div> */}
    </>
  );
}
