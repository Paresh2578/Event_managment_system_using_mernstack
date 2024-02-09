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
    <div style={{backgroundColor : "#333"}}>
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
              </div>
    </>
}