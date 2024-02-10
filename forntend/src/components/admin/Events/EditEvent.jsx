import React , {useState} from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';

//util
import {FromentDate} from '../../../util/FormentDate'
import {URL} from '../../../util/URL';

//mui
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";

export default function EditEvent({ open, setOpen, data , handleEditEvent, index }) {
  let adminAuth = JSON.parse(localStorage.getItem("adminAuth"));

  const [eventData , setEventData] = useState(data);
  const [eventEditLoding , setEventEditLoding]= useState(false);
  

  const [eventDataError, setEventDataError] = useState({
    name: false,
    date: false,
    posterUrl: false,
  });

  const [eventImgToUrlProsess, seteventImgToUrlProsess] = useState({
    loding: false,
    error: false,
    success: false,
  });

  const handleCancle = () => {
    setEventData(data);
    setOpen(false);
  };

  // const 

  const handleEditEventAndCheckValidationData = async()=>{
    console.log(eventData);

    if (eventData.name.length == 0) {
      setEventDataError({ name: true, date: false, posterUrl: false });
      return false;
    } else if (eventData.date == null || eventData.date.length == 0) {
      setEventDataError({ name: false, date: true, posterUrl: false });
      return false;
    } else if (eventData.eventPosterUrl.length == 0) {
      setEventDataError({ name: false, date: false, posterUrl: true });
      return false;
    } else {
      setEventDataError({ name: false, date: false, posterUrl: false });
      seteventImgToUrlProsess({loding: false,
        error: false,
        success: false,});

      try{
        setEventEditLoding(true);
        let result = await fetch(`${URL}/event/edit/${data._id}`, {
          method: "PUT",
          body: JSON.stringify(eventData),
          headers: {
            "content-type": "application/json",
            "Authorization": adminAuth.token
                   },
        });
  
        result = await result.json();
        setEventEditLoding(false);
        if(result.success){
          handleEditEvent(eventData , index);
        setEventData(data);
        setOpen(false);
        toast.success("sucessfully Edit");
        }else{
          toast.error("fail to Edit");
        }
  
      }catch(error){
        setEventEditLoding(false);
        toast.error("Fail to Edit");
      }
    }

  }

  const handleEventImgToUrl = async (e) => {
    seteventImgToUrlProsess({ loding: true, error: false, success: false });

    const image = e.target.files[0];

    const formData = new FormData();
    formData.set("image", image);

    axios
      .post(
        "https://api.imgbb.com/1/upload?key=c7b336b110521c9108c9b7d88f5d1dea",
            formData
      )
      .then((res) => {
        console.log(res.data.data.display_url);
        setEventData({ ...eventData, eventPosterUrl: res.data.data.display_url });
        // setImgUploadLoding(false)
        seteventImgToUrlProsess({ loding: false, error: false, success: true });
      })
      .catch((error) => {
        seteventImgToUrlProsess({ loding: false, error: true, success: false });
      });
  };


  return (
    <div>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ padding: "20px 50px 20px 50px" }}
        >
          {`Edit Event`}
        </DialogTitle>
        <DialogContent className="d-block">
          <>
            {!eventDataError.name ? (
              <TextField
                id="outlined-basic"
                label="Event name"
                className="mt-3"
                value={eventData.name}
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    name: e.target.value,
                  })
                }
                variant="outlined"
                style={{ marginBottom: "10px", width: "100%" }}
                required
              />
            ) : (
              <TextField
                id="outlined-basic"
                label="Event name"
                className="mt-3"
                helperText="enter name"
                error
                value={eventData.name}
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    name: e.target.value,
                  })
                }
                variant="outlined"
                style={{ marginBottom: "10px", width: "100%" }}
                required
              />
            )}

            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={[
                    "DatePicker",
                    "MobileDatePicker",
                    "DesktopDatePicker",
                    "StaticDatePicker",
                  ]}
                >
                  <DemoItem label="Date">
                    <MobileDatePicker
                      className={
                        eventDataError.date && "border border-1 border-danger"
                      }
                      value={dayjs(eventData.date)}
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          date: FromentDate(e.$d),
                        })
                      }
                      shouldDisableDate={(date) => date <= new Date(data.date)}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <div className="row">
              <div className="col">
                <div
                  className={
                    eventDataError.posterUrl
                      ? "mt-3 border border-1 border-danger"
                      : "mt-3"
                  }
                >
                  <input
                    accept="image/*"
                    id="raised-button-file"
                    type="file"
                    className={eventImgToUrlProsess.loding ? "d-none" : ""}
                    onChange={(e) => handleEventImgToUrl(e)}
                  />
                  {eventDataError.posterUrl && (
                    <Typography className="text-danger ms-3">
                      select img
                    </Typography>
                  )}
                </div>
              </div>
              <div className="col mt-3">
                {!eventImgToUrlProsess.loding &&
                  !eventImgToUrlProsess.error &&
                  !eventImgToUrlProsess.success && (
                    <Typography>Not select img</Typography>
                  )}
                {eventImgToUrlProsess.loding && <CircularProgress size={20} />}
                {eventImgToUrlProsess.success && (
                  <Typography
                    className="text-success"
                    style={{ fontSize: "13px" }}
                  >
                    successfully select img
                  </Typography>
                )}
                {eventImgToUrlProsess.error && (
                  <Typography
                    className="text-danger"
                    style={{ fontSize: "13px" }}
                  >
                    fail select img
                  </Typography>
                )}
              </div>
              <div className="d-flex justify-content-center align-items-center">
                {eventData.posterUrl && (
                  <img
                    className="mt-3 rounded shadow"
                    style={{ height: "30vh", width: "60%"  , objectFit:'cover'}}
                    src={eventData.posterUrl}
                  ></img>
                )}
              </div>
            </div>
          </>
          {/* <>
            <TextField
              id="outlined-basic"
              label="Event name"
              variant="outlined"
              className="mt-3"
              style={{ width: "100%" }}
              value={data.name}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  "DatePicker",
                  "MobileDatePicker",
                  "DesktopDatePicker",
                  "StaticDatePicker",
                ]}
              >
                <DemoItem label="Date">
                  <MobileDatePicker value={dayjs(data.date)} />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
            <div className="mt-3">
              <input
                accept="image/*"
                // className={classes.input}
                // style={{ display: "none" }}
                id="raised-button-file"
                type="file"
              />
              {/* <label htmlFor="raised-button-file">
                          <Button
                            variant="raised"
                            component="span"
                            // className={classes.button}
                          >
                            Cover img
                          </Button>
                        </label> */}
          {/* </div> */}
          {/* </>  */}
          <br />
          <Button
            variant="contained"
            style={{ marginRight: "10px" }}
            color="error"
            onClick={() => handleCancle()}
          >
            Cancle
          </Button>
          <Button
            variant="contained"
            style={{ marginRight: "10px" }}
            color="primary"
            onClick={() => handleEditEventAndCheckValidationData()}
          >
            {eventEditLoding ? (
                        <>
                          <p>updating..</p> <CircularProgress size="2rem" />
                        </>
                      ) : (
                        "Edit"
                      )}
          </Button>
          {/* </div> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
