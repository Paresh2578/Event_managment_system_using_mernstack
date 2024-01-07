import React , {useState} from 'react'
import { useNavigate } from "react-router-dom";

//componets
import EditEvent from './EditEvent';

//mui
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

export default function EventCard({data  , handleEditEvent , index , handleRemoveEvent}) {
  const navigate =useNavigate();

  const [editEventOpen, setEditEventOpen] = useState(false);


 

  return (
    <>
      <EditEvent open={editEventOpen} setOpen={setEditEventOpen} handleEditEvent={handleEditEvent} data={data} index={index}/>
      <div >
              <div>
                <CardMedia
                  component="img"
                  onClick={() => navigate("/admin/events/2")}
                  height="200"
                  image={data.posterUrl}
                  alt="Paella dish"
                />
                <CardContent>
                  <p style={{ textAlign: "left" }}>
                    <CalendarMonthIcon htmlColor="#6372ff" />{" "}
                    <span>{data.date}</span>
                  </p>
                  <p>{data.name}</p>
                  <Button color="secondary" onClick={() => setEditEventOpen(true)} startIcon={<EditIcon size="small" />} ></Button>
                  <Button color="error" startIcon={<DeleteIcon 
                    className="ms-2"
                    size="small" 
                    onClick={()=>handleRemoveEvent(index)}
                    />}>
                  </Button>
                </CardContent>
              </div>
            </div>
    </>
  )
}
