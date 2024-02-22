import React, { useState } from "react";
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
  const [deleteConformAlertDialogOpen, setDeleteConformAlertDialogOpen] =
    useState(false);

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
      {/*       
      <div>
        <div>
          <div  className="card-container" onClick={() => navigate(`/admin/subEvents/${data._id}`)}>
          <img
            src={data.eventPosterUrl}
            style={{ height: "200px" }}
            alt={data.name}
            className="overlay-image rounded-top"
          />
          </div>
          <CardContent>
            <p style={{ textAlign: "left" }}>
              <CalendarMonth htmlColor="#6372ff" />{" "}
              <span>{data.date}</span>
            </p>
            <p className="event-card" style={{ fontSize: "1.5rem" }}>
              {data.name}
            </p>
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
      </div> */}

      <div className="card" style={{ width: "18rem" }}>
        <img src={data.eventPosterUrl} class="card-img-top" alt={data.name} onClick={() => navigate(`/admin/subEvents/${data._id}`)}/>
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
