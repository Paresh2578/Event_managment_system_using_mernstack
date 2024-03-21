import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Swal from 'sweetalert2'

import "./Events.css";

//componets
import EditEvent from "./EditEvent";
import DeleteConformAlertDialog from "./DeleteConformAlertDialog";

//utils
import { URL } from "../../../util/URL";
import {compareToCurrDate} from '../../../util/compareToDate';

//mui
import {
  Button,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { CalendarMonth, Edit, Delete } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";

export default function EventCard({
  data,
  handleEditEvent,
  index,
  handleRemoveEvent,
}) {
  const navigate = useNavigate();
  let adminAuth = JSON.parse(localStorage.getItem("adminAuth"));

  const [editEventOpen, setEditEventOpen] = useState(false);
  const [deleteEventLoding, setDeleteEventLoding] = useState(false);
  const [deleteConformAlertDialogOpen, setDeleteConformAlertDialogOpen] =  useState(false);
  const [completedEvent , setCompletedEvent] = useState(false);
  const [winners, setWinners] = useState([]);
  const [loading , setLoading] = useState(false);
  

  useEffect(()=>{
   compareDate();
    // const currentDate = new Date();
          // let eventDateArr = data.date.split("/");
          getAllWinners();
          // eventDateArr[1] = parseInt(eventDateArr[1]) + 1;
          // const eventDate = new Date(
          //   `${eventDateArr[0]}/${eventDateArr[1]}/${eventDateArr[2]}`
          // ); // December 31, 2023 (month is 0-based, so 11 is December)
          // if (currentDate >= eventDate) {
          //   return setCompletedEvent(false);
          // } else{
          //   return setCompletedEvent(true);
          // }
  },[data]);

  const compareDate =async ()=>{
     let result = await compareToCurrDate(data.date);
     setCompletedEvent(result);
  }

  const getAllWinners =async ()=>{

     setLoading(true);
   try{
    let result = await fetch(`${URL}/api/winner/getAllWinner`, {
      headers: {
        "content-type": "application/json",
        "Authorization": adminAuth.token
               },
    });

    result = await result.json();
   setLoading(false);
    if(result.success){
     setWinners(result.data);
    }else{
     toast.error(result.message)
    }
   }catch(error){
    setLoading(false);
    toast.error("oops sorry something went wrong")
   }

       }


  const deleteEvent = async () => {
    try {
      setDeleteEventLoding(true);
      let result = await fetch(`${URL}/api/event/delete/${data._id}`, {
        method: "DELETE",
        headers: {
          Authorization: adminAuth.token,
        },
      });

      result = await result.json();
      setDeleteEventLoding(false);
      setDeleteConformAlertDialogOpen(false);
      if (result.success) {
        handleRemoveEvent(index);
        toast.success("successfully delete event");
      } else {
        toast.error("Faild to delete event");
      }
    } catch (error) {
      setDeleteEventLoding(false);
      setDeleteConformAlertDialogOpen(false);
      toast.error("Faild to delete event");
    }
  };


 

  const handleShowWinner = (id)=>{
    let currEventWinners = winners.filter((w)=>w.eventId == id);
    let winnersHTML = "";
    winnersHTML += '<div style="overflow-x: scoller ,width:10wh">';
  winnersHTML += '<table class="table table-hover" >';
  winnersHTML += '<thead class="thead-dark"> <tr> <th scope="col">No.</th> <th scope="col">Subevent</th> <th>First</th> <th scope="col">secound</th><th scope="col">third</th> </tr> </thead>';
  winnersHTML += '<tbody>';
  
  winnersHTML += '</div>'; //
  
  let i=0;
  // while(i < winners.length){
  while(i < currEventWinners.length){
    let {third , secound,first , subEventName} = currEventWinners[i];
    winnersHTML += `<tr><td scope="row">${i+1}</td><td>${subEventName}</td><td>${first == undefined ? 'Not selected' : first}</td> <td> ${secound == undefined ? 'Not selected' : secound }</td><td>${third == undefined ? 'Not selected' : third }</td></tr>`;
    i++;
  }
  
  winnersHTML += '</tbody>';
    Swal.fire({
      title:  `All SubEvent Top 3 Winners list`,
      html:loading ? '<p>Please wait for loading data..</p>' : winnersHTML,
      confirmButtonText: 'Close',
      confirmButtonColor: '#3085d6',
      showCancelButton: false,
      showConfirmButton: true,
      allowOutsideClick: false,
  })
  }

  return (
    <>
      <EditEvent
        open={editEventOpen}
        setOpen={setEditEventOpen}
        handleEditEvent={handleEditEvent}
        data={data}
        index={index}
      />
      <DeleteConformAlertDialog
        open={deleteConformAlertDialogOpen}
        setOpen={setDeleteConformAlertDialogOpen}
        deleteFunction={deleteEvent}
        deleteEventLoding={deleteEventLoding}
      />

      <div className="card" style={{ width: "18rem" }}>
        <img src={data.eventPosterUrl} style={{height : '35vh'}} className="card-img-top rounded-top" alt={data.name} onClick={() => navigate(`/admin/subEvents/${data._id}/${completedEvent}`)}/>
        <div class="card-body">
          <h5 class="card-title fs-4">{data.name}</h5>
          <p class="card-text">
          <CalendarMonth htmlColor="#6372ff" />{" "}
              <span>{data.date}</span>
          </p>
          <div  class="btn btn-primary rounded-lg me-3">
          <Edit size="small"   onClick={() => setEditEventOpen(true)}/>
          </div>
          <div  class="btn btn-danger rounded-lg">
          <Delete size="small" onClick={() => setDeleteConformAlertDialogOpen(true)} />
          </div>
          {completedEvent == true && <div  class="btn btn-warning rounded-lg ms-3" onClick={()=>handleShowWinner(data._id)}>
          <EmojiEventsIcon size="small" color="inherit"/>
          </div> }
        </div>
      </div>
    </>
  );
}
