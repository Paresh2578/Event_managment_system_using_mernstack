import React , {useState} from 'react'
import { useNavigate } from "react-router-dom";

//componets
import EditEvent from './EditEvent';

//utils
import {URL} from '../../util/URL';

//mui
import {Button , CardContent , CardMedia , CircularProgress} from "@mui/material"
import {CalendarMonth , Edit , Delete} from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";

export default function EventCard({data  , handleEditEvent , index , handleRemoveEvent}) {
  const navigate =useNavigate();
  let adminAuth = JSON.parse(localStorage.getItem("adminAuth"));

  const [editEventOpen, setEditEventOpen] = useState(false);
  const [deleteEventLoding , setDeleteEventLoding] = useState(false);

  const deleteEvent = async()=>{
    try{
      setDeleteEventLoding(true);
      let result = await fetch(`${URL}/event/delete/${data._id}`, {
        method: "DELETE",
        headers: {
          "Authorization": adminAuth.token
                 },
      });

      result = await result.json();
      setDeleteEventLoding(false);
      if(result.success){
      handleRemoveEvent(index);
      }else{
        console.log("edit event error");
      }

    }catch(error){
      setDeleteEventLoding(false);
      console.log("edit event error ")
    }
  }

  return (
    <>
      <EditEvent open={editEventOpen} setOpen={setEditEventOpen} handleEditEvent={handleEditEvent} data={data} index={index}/>
      <div >
              <div>
                <CardMedia
                  component="img"
                  onClick={() => navigate(`/admin/events/${data._id}`)}
                  height="250"
                  image={data.eventPosterUrl}
                  alt="Paella dish"
                />
                <CardContent>
                  <p style={{ textAlign: "left" }}>
                    <CalendarMonth htmlColor="#6372ff" />{" "}
                    <span>{data.date}</span>
                  </p>
                  <p>{data.name}</p>
                  <div className='roe'>
                  <Button className='col' color="secondary" onClick={() => setEditEventOpen(true)} startIcon={<Edit size="small" />} ></Button>
                  <Button color="error" className='col' startIcon={
                  deleteEventLoding ? <CircularProgress/>  :  
                  <Delete
                    className="ms-2"
                    size="2 rem" 
                    onClick={()=>deleteEvent()}
                    />}>
                  </Button>
                  </div>
                </CardContent>
              </div>
            </div>
    </>
  )
}
