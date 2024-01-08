import React , {useState} from "react";

//componets
import EditSubEvent from './EditSubEvent';

//mui
import {Button , CardContent , CardMedia} from "@mui/material"
import {CalendarMonth  , EventSeat, Edit , Delete} from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";

export default function SubEventCard({data  , handleEditSubEvent , index , handleRemoveSubEvent}) {
    const [editEventOpen , setEditEventOpen] = useState(false);
  return (
    <div>
      <EditSubEvent open={editEventOpen} data={data} setOpen={setEditEventOpen} index={index} handleEditSubEvent={handleEditSubEvent}/>
      <div className="card-container">
        {/* <p className="img-text">Your Text Goes Here</p> */}
        <div className="img-text">
          <span className="text-center">
            <EventSeat /> {data.seats} Seat
          </span>
          {/* <p>100</p> */}
        </div>
        <img
          src={data.posterUrl}
          style={{ height: "200px" }}
          alt="Your Alt Text"
          className="overlay-image"
        //   onClick={() => navigate("/admin/events/subevent/id")}
        />
      </div>
      <CardContent>
        <p style={{ textAlign: "left" }}>
          <CalendarMonth color="#6372ff" /> <span>{data.time}</span>
        </p>
        <p>{data.name}</p>
        <Button
          color="secondary"
          onClick={() => setEditEventOpen(true)}
          startIcon={<Edit size="small" />}
        ></Button>
        <Button
          color="error"
          onClick={()=>handleRemoveSubEvent(index)}
          startIcon={<Delete className="ms-2" size="small" />}
        ></Button>
      </CardContent>
    </div>
  );
}
