import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


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

export default function SubEventCard({data , handleEditSubEvent , index , handleRemoveSubEvent}) {
  let adminAuth = JSON.parse(localStorage.getItem("adminAuth"));
  const navigate =useNavigate();
    const [editEventOpen , setEditEventOpen] = useState(false);
    const [deleteSubEventLoding , setdeleteSubEventLoding] = useState(false);
    const [deleteConformAlertDialogOpen,       setDeleteConformAlertDialogOpen] = useState(false);

    const deleteSubEvent = async()=>{
      try{
        setdeleteSubEventLoding(true);
        let result = await fetch(`${URL}/subEvent/delete/${data._id}`, {
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



  return (
    <div >
       <DeleteConformAlertDialog open={deleteConformAlertDialogOpen} setOpen={setDeleteConformAlertDialogOpen} deleteFunction={deleteSubEvent} deleteEventLoding={deleteSubEventLoding}/>
      <EditSubEvent open={editEventOpen} data={data} setOpen={setEditEventOpen} index={index} handleEditSubEvent={handleEditSubEvent}/>
      <div className="card-container " onClick={(e)=>navigate(`/admin/events/subevent/participationsList/${data._id}/${data.isGroup}`)}>
        {/* <p className="img-text">Your Text Goes Here</p> */}
        <div className="img-text">
          <span className="text-center">
            <EventSeat /> {data.seats} Seat
          </span>
          {/* <p>100</p> */}
        </div>
        <img
          src={data.subEventPosterUrl}
          style={{ height: "200px" }}
          alt="Your Alt Text"
          className="overlay-image"
        //   onClick={() => navigate("/admin/events/subevent/id")}
        />
      </div>
      <CardContent >
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
      </CardContent>
    </div>
  );
}
