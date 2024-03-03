import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "./Events.css";

//componets
import EditEvent from "./EditEvent";
import DeleteConformAlertDialog from "./DeleteConformAlertDialog";

//utils
import { URL } from "../../../util/URL";

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

  useEffect(()=>{
    const currentDate = new Date();
          let eventDateArr = data.date.split("/");
          eventDateArr[1] = parseInt(eventDateArr[1]) + 1;
          const eventDate = new Date(
            `${eventDateArr[0]}/${eventDateArr[1]}/${eventDateArr[2]}`
          ); // December 31, 2023 (month is 0-based, so 11 is December)
          if (currentDate >= eventDate) {
            return setCompletedEvent(false);
          } else{
            return setCompletedEvent(true);
          }
  },[]);

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
      // console.log("edit event error ");
    }
  };

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
        </div>
      </div>
    </>
  );
}
