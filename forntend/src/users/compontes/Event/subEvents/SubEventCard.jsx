import React , {useState} from "react";


//utile
import {formetTime} from '../../../../util/FormentTime'

//mui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {EventSeat, AccessAlarm} from "@mui/icons-material";

//compontes
import RegistreFrom from './registreFrom';


import img from '../assets/client-2.jpg'

export default function SubEventCard({data , eventName }){
  const [registerOpen, setregisterOpen] = useState(false);

  const handleRegister = ()=>{
      if((data.seats - data.singleParticipation.length - data.groupParticipation.length )  == 0){
        alert('no seat avalible');
        //  return;
      }else{
        setregisterOpen(true);
      }
  }
      
    return <>
      <RegistreFrom registerOpen={registerOpen} setregisterOpen={setregisterOpen} data={data} eventName={eventName}/>
    <div>
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
                  <p style={{ textAlign: "left" }}>
                    <AccessAlarm color="#6372ff" /> <span>{formetTime(data.time)}</span>
                  </p>
                  <p>{data.subEventname}</p>
                </CardContent>
                <CardActions>
                  <Button  variant="outlined" onClick={()=>handleRegister()}>register</Button>
                </CardActions>
              </div>
    </>
}