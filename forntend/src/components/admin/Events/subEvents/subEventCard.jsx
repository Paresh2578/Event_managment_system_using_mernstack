import React , {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { FaTrophy } from "react-icons/fa";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import Swal from 'sweetalert2'


//utils
import {formetTime} from '../../../../util/FormentTime';
import {URL} from '../../../../util/URL';

//componets
import EditSubEvent from './EditSubEvent';
import DeleteConformAlertDialog from '../DeleteConformAlertDialog';

//mui
import {Button , CardContent , CardMedia , CircularProgress} from "@mui/material"
import {CalendarMonth  , EventSeat, Edit , Delete , AccessAlarm} from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";

export default function SubEventCard({competed , winner , data , handleEditSubEvent , index , handleRemoveSubEvent}) {
  let adminAuth = JSON.parse(localStorage.getItem("adminAuth"));
  const navigate =useNavigate();
    const [editEventOpen , setEditEventOpen] = useState(false);
    const [deleteSubEventLoding , setdeleteSubEventLoding] = useState(false);
    const [deleteConformAlertDialogOpen,       setDeleteConformAlertDialogOpen] = useState(false);

    // useEffect(()=>{
    //     console.log(winner);
    // },[]);

    const deleteSubEvent = async()=>{
      try{
        setdeleteSubEventLoding(true);
        let result = await fetch(`${URL}/api/subEvent/delete/${data._id}`, {
          method: "DELETE",
          headers: {
            "Authorization": adminAuth.token
                   },
        });
  
        result = await result.json();
        setdeleteSubEventLoding(false);
        setDeleteConformAlertDialogOpen(false);
        if(result.success){
          handleRemoveSubEvent(index);
        toast.success("successfully delete sub event");
        }else{
          toast.error("Faild to delete sub event")
        }
  
      }catch(error){
        setdeleteSubEventLoding(false);
        setDeleteConformAlertDialogOpen(false);
        console.log("edit event error ")
      }
    }


      winner = winner.filter((w)=> w.subEventId == data._id);
      let winnersHTML = '';
      if(winner.length != 0){
       let {third , secound,first} = winner[0];
       winnersHTML = '<ol>';
       winnersHTML +=  `<li>${first == undefined ? 'Not selected' : first}</li>`;
       winnersHTML +=  `<li>${secound == undefined ? 'Not selected' :secound }</li>`;
       winnersHTML +=  `<li>${third == undefined ? 'Not selected' : third }</li>`;
       winnersHTML += '</ol>';
      }else{
        winner = '<p>No selected winner</p>'
      }
    //   if(winner.lenght != 0){
    //      // Build the HTML to display the top 3 winners
    //  winnersHTML = '<ol>';
    // if(winner !== undefined && winner[0].first !== undefined){
    // winnersHTML +=  `<li>${winner[0].first}</li>`;
    // }
    // if(winner !== undefined && winner[0].secound !== undefined){
    //   winnersHTML +=  `<li>${winner[0].secound}</li>`;
    // }
    // if(winner !== undefined && winner[0].third !== undefined){
    //   winnersHTML +=  `<li>${winner[0].third}</li>`;
    // }
    // winnersHTML += '</ol>';
    //   }else{
    //     winnersHTML = '<p>not select winners</p>'
    //   }
    
   

    const handleShowWinner = (id)=>{
      Swal.fire({
        title: `Top 3 Winners`,
        html: winnersHTML,
        confirmButtonText: 'Close',
        confirmButtonColor: '#3085d6',
        showCancelButton: false,
        showConfirmButton: true,
        allowOutsideClick: false,
    })
    }



  return (
    <div className="">
       <DeleteConformAlertDialog open={deleteConformAlertDialogOpen} setOpen={setDeleteConformAlertDialogOpen} deleteFunction={deleteSubEvent} deleteEventLoding={deleteSubEventLoding}/>
      <EditSubEvent open={editEventOpen} data={data} setOpen={setEditEventOpen} index={index} handleEditSubEvent={handleEditSubEvent}/>

      <div class="card" style={{ width: "18rem" }} >
      <div className="card-container "  onClick={(e)=>navigate(`/admin/events/subevent/participationsList/${data._id}/${data.isGroup}/${competed}/${data.subEventname}}`)}>
       
       <div className="img-text" >
         <span className="text-center">
           <EventSeat /> {data.seats} Seats
         </span>
      
       </div>
       <img
         src={data.subEventPosterUrl}
         style={{ height: "200px" }}
         alt={data.subEventname}
         className="overlay-image"
       
       />
     </div>
        <div class="card-body">
          <h5 class="card-title">{data.subEventname}</h5>
          <p class="card-text">
          <AccessAlarm color="#6372ff" /> <span >{formetTime(data.startTime)}</span>
          </p>

          <div  class="btn btn-primary rounded-lg me-3">
          <Edit size="small"   onClick={() => setEditEventOpen(true)}/>
          </div>
          <div  class="btn btn-danger rounded-lg">
          <Delete size="small" onClick={() => setDeleteConformAlertDialogOpen(true)} />
          </div>
         {competed == "true" && <div  class="btn btn-warning rounded-lg ms-3" onClick={()=>handleShowWinner(data._id)}>
          <EmojiEventsIcon size="small" color="inherit"/>
          </div> }
          
        </div>
      </div>

{/* 
      <div className="card-container " onClick={(e)=>navigate(`/admin/events/subevent/participationsList/${data._id}/${data.isGroup}`)}>
        <div className="img-text">
          <span className="text-center">
            <EventSeat /> {data.seats} Seat
          </span>
        </div>
        <img
          src={data.subEventPosterUrl}
          style={{ height: "200px" }}
          alt="Your Alt Text"
          className="overlay-image"
        />
      </div> */}
      {/* <CardContent >
        <p style={{ textAlign: "left"}}>
          <AccessAlarm color="#6372ff"/> <span>{formetTime(data.time)}</span>
        </p>
        <p style={{fontSize:'1.5rem'}}>{data.subEventname}</p>
        <Button
          color="secondary"
          onClick={() => setEditEventOpen(true)}
          startIcon={<Edit size="small" />}
        ></Button>
        <Button color="error" className='col' startIcon={
                  deleteSubEventLoding ? <CircularProgress/>  :  
                  <Delete
                    className="ms-2"
                    size="small" 
                    onClick={()=>setDeleteConformAlertDialogOpen(true)}
                    />}>
                  </Button>
      </CardContent> */}
    </div>
  );
}
