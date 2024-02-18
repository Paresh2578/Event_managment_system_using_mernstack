import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


import "./Events.css";

//componets
import EditEvent from "./EditEvent";
import  DeleteConformAlertDialog from './DeleteConformAlertDialog';

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
  const [deleteConformAlertDialogOpen,       setDeleteConformAlertDialogOpen] = useState(false);

  const deleteEvent = async () => {
    try {
      setDeleteEventLoding(true);
      let result = await fetch(`${URL}/event/delete/${data._id}`, {
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
        toast.error("Faild to delete event")
      }
    } catch (error) {
      setDeleteEventLoding(false);
      setDeleteConformAlertDialogOpen(false);
      toast.error("Faild to delete event")
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
      <DeleteConformAlertDialog open={deleteConformAlertDialogOpen} setOpen={setDeleteConformAlertDialogOpen} deleteFunction={deleteEvent} deleteEventLoding={deleteEventLoding}/>
      
      <div>
        <div>
          <div  className="card-container" onClick={() => navigate(`/admin/subEvents/${data._id}`)}>
          <img
            src={data.eventPosterUrl}
            style={{ height: "200px" }}
            alt={data.name}
            className="overlay-image rounded-top"
            // className="overlay-image"
          />
          </div>
          {/* <CardMedia
                  component="img"
                  onClick={() => navigate(`/admin/subEvents/${data._id}`)}
                  height="250"
                  image={data.eventPosterUrl}
                  alt="Paella dish"
                /> */}
          <CardContent>
            <p style={{ textAlign: "left" }}>
              <CalendarMonth htmlColor="#6372ff" />{" "}
              {/* <span style={{fontSize:'1.5rem'}}>{data.date}</span> */}
              <span>{data.date}</span>
            </p>
            <p className="event-card" style={{ fontSize: "1rem" }}>
              {data.name}
            </p>
            {/* <p className='event-card'>{data.name}</p> */}
            <div className="roe">
              <Button
                className="col"
                color="secondary"
                onClick={() => setEditEventOpen(true)}
                startIcon={<Edit size="small" />}
              ></Button>
              <Button
                color="error"
                className="col"
                startIcon={           
                    <Delete
                      className="ms-2"
                      size="2 rem"
                      onClick={() => setDeleteConformAlertDialogOpen(true)}
                    />
                    }
              ></Button>
            </div>
          </CardContent>
        </div>
      </div>
    </>
  );
}
