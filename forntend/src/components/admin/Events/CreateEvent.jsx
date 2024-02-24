import React, { useState } from "react";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";

// import "../style.css";

//utis
import { FromentDate } from "../../../util/FormentDate";
import { URL } from "../../../util/URL";

//mui
import {
  CircularProgress,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Typography,
  StepButton,
  Step,
  Stepper,
  Box,
  TextField,
  DialogTitle,
  DialogContent,
  Button,
  Dialog,
} from "@mui/material";
import { makeStyles, TextareaAutosize } from "@material-ui/core";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const steps = [
  "Enter Event details",
  "Enter subEvent details",
  "Enter coordinator details",
];

export default function CreateEvent({ open, setOpen, handleCreateNewEvent }) {
  let adminAuth = JSON.parse(localStorage.getItem("adminAuth"));

  const [createEventLoding, setCreateEventLoding] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  // const [group, setGroup] = useState(false);
  const [eventData, setEventData] = useState({
    name: "",
    date: null,
    eventPosterUrl: "",
  });

  const [subEventData, setSubEventData] = useState({
    subEventname: "",
    category: "",
    time: "",
    seats: 10,
    grupMember: 2,
    isGroup: false,
    posterUrl: "",
    discription: "",
    pay : 10,
    paid : false
  });

  const [coordinatorData, setCoordinatorData] = useState({
    coordinatorName: "",
    email: "",
    mobile: "",
  });
  const [eventImgToUrlProsess, seteventImgToUrlProsess] = useState({
    loding: false,
    error: false,
    success: false,
  });
  const [subEventImgToUrlProsess, setSubEventImgToUrlProsess] = useState({
    loding: false,
    error: false,
    success: false,
  });

  const [eventDataError, setEventDataError] = useState({
    name: false,
    date: false,
    posterUrl: false,
  });

  const [subEventDataError, setSubEventDataError] = useState({
    name: false,
    category: false,
    time: false,
    seats: false,
    grupMember: false,
    posterUrl: false,
  });

  const [coordinatorDataError, setCoordinatorDataError] = useState({
    name: false,
    email: false,
    mobile: false,
  });

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleComplete = () => {
    if (checkValidtionData(activeStep)) {
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      // setCompleted(activeStep);
      handleNext();
    }
  };

  const checkValidtionData = (activeStep) => {
    if (activeStep == 0) {
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
      }
    } else if (activeStep == 1) {
      if (subEventData.subEventname.length == 0) {
        setSubEventDataError({
          name: true,
          category: false,
          time: false,
          seats: false,
          grupMember: false,
          posterUrl: false,
        });
        return false;
      } else if (subEventData.category.length == 0) {
        setSubEventDataError({
          name: false,
          category: true,
          time: false,
          seats: false,
          grupMember: false,
          posterUrl: false,
        });
        return false;
      } else if (subEventData.time.length == 0) {
        setSubEventDataError({
          name: false,
          category: false,
          time: true,
          seats: false,
          grupMember: false,
          posterUrl: false,
        });
        return false;
      } else if (subEventData.seats < 10) {
        setSubEventDataError({
          name: false,
          category: false,
          time: false,
          seats: true,
          grupMember: false,
          posterUrl: false,
        });
        return false;
      } else if (subEventData.grupMember < 2 && subEventData.isGroup) {
        setSubEventDataError({
          name: false,
          category: false,
          time: false,
          grupMember: true,
          posterUrl: false,
        });
        return false;
      } else if(subEventData.paid && subEventData.pay < 10){
        return false;
      }
      else if (subEventData.posterUrl.length == 0) {
        setSubEventDataError({
          name: false,
          category: false,
          time: false,
          grupMember: false,
          posterUrl: true,
        });
        return false;
      } else {
        setSubEventDataError({
          name: false,
          category: false,
          time: false,
          grupMember: false,
          posterUrl: false,
        });
      }
    } else if (activeStep == 2) {
      if (coordinatorData.coordinatorName.length == 0) {
        setCoordinatorDataError({ name: true, email: false, mobile: false });
        return false;
      } else if (coordinatorData.email.length == 0) {
        setCoordinatorDataError({ name: false, email: true, mobile: false });
        return false;
      } else if (coordinatorData.mobile.length < 10) {
        setCoordinatorDataError({ name: false, email: false, mobile: true });
        return false;
      } else {
        setCoordinatorDataError({ name: false, email: false, mobile: false });
      }
    }

    return true;
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setEventData({ name: "", date: null, posterUrl: "" });
    setSubEventData({
      subEventname: "",
      category: "",
      time: "",
      grupMember: 2,
      isGroup: false,
      posterUrl: "",
    });
    setCoordinatorData({ coordinatorName: "", email: "", mobile: "" });
    setEventDataError({ name: false, date: false, posterUrl: false });
    setSubEventDataError({
      name: false,
      category: false,
      time: false,
      grupMember: false,
      posterUrl: false,
    });
    setCoordinatorDataError({ name: false, email: false, mobile: false });
    seteventImgToUrlProsess({ loding: false, error: false, success: false });
    setSubEventImgToUrlProsess({ loding: false, error: false, success: false });
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };

  const CreateEvent = async () => {
    let createEventData = {
      coordinatorName: coordinatorData.coordinatorName, //
      email: coordinatorData.email,
      mobile: coordinatorData.mobile,
      subEventname: subEventData.subEventname,
      category: subEventData.category,
      time: subEventData.time,
      seats: subEventData.seats,
      groupMember: subEventData.grupMember,
      isGroup: subEventData.isGroup,
      subEventPosterUrl: subEventData.posterUrl, //
      name: eventData.name,
      date: eventData.date,
      eventPosterUrl: eventData.eventPosterUrl, //
      discription : subEventData.discription,
      pay : subEventData.pay,
      paid : subEventData.paid
        };

    console.log("this is evetn data :: ", createEventData);

    try {
      setCreateEventLoding(true);
      let result = await fetch(`${URL}/api/event/create`, {
        method: "POST",
        body: JSON.stringify(createEventData),
        headers: {
          "content-type": "application/json",
          Authorization: adminAuth.token,
        },
      });
      result = await result.json();
      setCreateEventLoding(false);
      if (result.success) {
        handleCreateNewEvent(eventData);
        handleReset();
        setOpen(false);
        toast.success("sucessfully Create Event");
      } else {
        toast.error("Fail to create Evnet");
      }
    } catch (error) {
      setCreateEventLoding(false);
      toast.error("Fail to create Event");
    }

    //
  };

  const handleEventImgToUrl = async (e) => {
    seteventImgToUrlProsess({ loding: true, error: false, success: false });

    console.log(eventImgToUrlProsess);
    const image = e.target.files[0];

    const formData = new FormData();
    formData.set("image", image);

    axios
      .post(
        "https://api.imgbb.com/1/upload?key=c7b336b110521c9108c9b7d88f5d1dea",
        formData
      )
      .then((res) => {
        setEventData({
          ...eventData,
          eventPosterUrl: res.data.data.display_url,
        });
        // setImgUploadLoding(false)
        seteventImgToUrlProsess({ loding: false, error: false, success: true });
      })
      .catch((error) => {
        seteventImgToUrlProsess({ loding: false, error: true, success: false });
      });

    // setEventData({ ...eventData, eventPosterUrl: "emg url" });
  };

  const handleSubEventImgToUrl = async (e) => {
    setSubEventImgToUrlProsess({ loding: true, error: false, success: false });

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
        setSubEventData({
          ...subEventData,
          posterUrl: res.data.data.display_url,
        });
        setSubEventImgToUrlProsess({
          loding: false,
          error: false,
          success: true,
        });
      })
      .catch((error) => {
        setSubEventImgToUrlProsess({
          loding: false,
          error: true,
          success: false,
        });
      });

    // setSubEventData({
    //   ...subEventData,
    //   posterUrl: "imgURL",
    // });
  };

  return (
    <div style={{ fontSize: "2rem" }}>
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
          {`create new Event`}
        </DialogTitle>
        <DialogContent className="d-block">
          {/* <Box sx={{ width: "100%" }}> */}
          <Box sx={{ width: "fit-content" }}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    <span> {label}</span>
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div>
              {allStepsCompleted() ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                    <Button onClick={CreateEvent}>
                      {createEventLoding ? (
                        <>
                          <p>creating..</p> <CircularProgress size="2rem" />
                        </>
                      ) : (
                        "Create"
                      )}
                    </Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                    {/* Step {activeStep + 1} */}
                    {activeStep + 1 == 1 && (
                      <>
                        {!eventDataError.name ? (
                          <TextField
                            id="outlined-basic"
                            label="Event name"
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
                                    eventDataError.date &&
                                    "border border-1 border-danger"
                                  }
                                  value={dayjs(eventData.date)}
                                  onChange={(e) =>
                                    setEventData({
                                      ...eventData,
                                      date: FromentDate(e.$d),
                                    })
                                  }
                                  shouldDisableDate={(date) =>
                                    date <= new Date()
                                  }
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
                                className={
                                  eventImgToUrlProsess.loding ? "d-none" : ""
                                }
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
                            {eventImgToUrlProsess.loding && (
                              <CircularProgress size={20} />
                            )}
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
                            {eventData.eventPosterUrl && (
                              <img
                                className="mt-3 rounded shadow"
                                style={{ height: "20vh", width: "60%" }}
                                src={eventData.eventPosterUrl}
                              ></img>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    {activeStep + 1 == 2 && (
                      <>
                        {!subEventDataError.name ? (
                          <TextField
                            id="outlined-basic"
                            label="Event name"
                            variant="outlined"
                            value={subEventData.subEventname}
                            required
                            onChange={(e) =>
                              setSubEventData({
                                ...subEventData,
                                subEventname: e.target.value,
                              })
                            }
                            style={{ marginBottom: "10px", width: "100%" }}
                          />
                        ) : (
                          <TextField
                            id="outlined-basic"
                            label="Event name"
                            helperText="Enter name"
                            error
                            required
                            variant="outlined"
                            value={subEventData.subEventname}
                            onChange={(e) =>
                              setSubEventData({
                                ...subEventData,
                                subEventname: e.target.value,
                              })
                            }
                            style={{ marginBottom: "10px", width: "100%" }}
                          />
                        )}

                        <FormControl
                          className={
                            subEventDataError.category
                              ? "mb-3 border border-danger"
                              : "mb-3"
                          }
                          fullWidth
                        >
                          <InputLabel id="demo-simple-select-label" required>
                            select Category
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={subEventData.category}
                            label="select Category"
                            onChange={(e) =>
                              setSubEventData({
                                ...subEventData,
                                category: e.target.value,
                              })
                            }
                          >
                            <MenuItem value={"Civil"}>Civil</MenuItem>
                            <MenuItem value={"Computer"}>Computer</MenuItem>
                            <MenuItem value={"Electrical"}>Electrical</MenuItem>
                            <MenuItem value={"Mechanical"}>Mechanical</MenuItem>
                            <MenuItem value={"Management"}>Management</MenuItem>
                            <MenuItem value={"Microbiology"}>
                              Microbiology
                            </MenuItem>
                            <MenuItem value={"General"}>General</MenuItem>
                          </Select>
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer
                            components={[
                              "DatePicker",
                              "MobileDatePicker",
                              "DesktopDatePicker",
                              "StaticDatePicker",
                            ]}
                          >
                            <DemoItem label="">
                              <TimePicker
                                value={subEventData.time}
                                className={
                                  subEventDataError.time &&
                                  "border border-1 border-danger"
                                }
                                onChange={(time) =>
                                  setSubEventData({
                                    ...subEventData,
                                    time: time.$d,
                                  })
                                }
                              />
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>

                        {!subEventDataError.seats ? (
                          <TextField
                            id="outlined-basic"
                            label="Event number of seats"
                            variant="outlined"
                            type="number"
                            className="mt-3"
                            value={subEventData.seats}
                            onChange={(e) =>
                              setSubEventData({
                                ...subEventData,
                                seats: e.target.value,
                              })
                            }
                            style={{ width: "100%" }}
                          />
                        ) : (
                          <TextField
                            id="outlined-basic"
                            label="Event number of seats"
                            helperText="seats must be greter than 10"
                            error
                            variant="outlined"
                            type="number"
                            className="mt-3"
                            value={subEventData.seats}
                            onChange={(e) =>
                              setSubEventData({
                                ...subEventData,
                                seats: e.target.value,
                              })
                            }
                            style={{ width: "100%" }}
                          />
                        )}

                        <div className="row mt-3 ">
                          <FormLabel
                            id="demo-row-radio-buttons-group-label"
                            className="mt-2 ms-3 me-2 col-2"
                          >
                            Group :
                          </FormLabel>
                          <RadioGroup
                            row
                            value={subEventData.isGroup}
                            onChange={(e) =>
                              setSubEventData({
                                ...subEventData,
                                isGroup: e.target.value,
                              })
                            }
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            className="col"
                          >
                            <FormControlLabel
                              value={true}
                              control={<Radio />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value={false}
                              control={<Radio />}
                              label="No"
                            />
                          </RadioGroup>
                        </div>

                        {subEventData.isGroup == "true" &&
                          !subEventDataError.grupMember && (
                            <TextField
                              className="mt-2"
                              id="outlined-basic"
                              type="number"
                              value={subEventData.grupMember}
                              onChange={(e) =>
                                setSubEventData({
                                  ...subEventData,
                                  grupMember: e.target.value,
                                })
                              }
                              label="number of group member"
                              variant="outlined"
                            />
                          )}

                        {subEventData.isGroup == "true" &&
                          subEventDataError.grupMember && (
                            <TextField
                              className="mt-2"
                              id="outlined-basic"
                              type="number"
                              error
                              helperText="group member must be greate then 1"
                              value={subEventData.grupMember}
                              onChange={(e) =>
                                setSubEventData({
                                  ...subEventData,
                                  grupMember: e.target.value,
                                })
                              }
                              label="number of group member"
                              variant="outlined"
                            />
                          )}

<div className="row mt-3 ">
                          <FormLabel
                            id="demo-row-radio-buttons-group-label"
                            className="mt-2 ms-3 me-2 col-2"
                          >
                            paid :
                          </FormLabel>
                          <RadioGroup
                            row
                            value={subEventData.paid}
                            onChange={(e) =>
                              setSubEventData({
                                ...subEventData,
                                paid: e.target.value,
                              })
                            }
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            className="col"
                          >
                            <FormControlLabel
                              value={true}
                              control={<Radio />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value={false}
                              control={<Radio />}
                              label="No"
                            />
                          </RadioGroup>
                        </div>

                        {subEventData.paid == "true" &&
                           (
                            <TextField
                              className="mt-2"
                              id="outlined-basic"
                              type="number"
                              error = {subEventData.paid && subEventData.pay < 10}
                              value={subEventData.pay}
                              onChange={(e) =>
                                setSubEventData({
                                  ...subEventData,
                                  pay: e.target.value,
                                })
                              }
                              label="how many pay"
                              helperText={subEventData.paid && subEventData.pay < 10 ? 'must be greate than 10 rupes' : ''}
                              variant="outlined"
                            />
                          )}

                        <div className="row">
                          <div className="col">
                            <div
                              className={
                                subEventDataError.posterUrl
                                  ? "mt-3 border border-1 border-danger"
                                  : "mt-3"
                              }
                            >
                              <input
                                accept="image/*"
                                id="raised-button-file"
                                type="file"
                                className={
                                  subEventImgToUrlProsess.loding ? "d-none" : ""
                                }
                                onChange={(e) => handleSubEventImgToUrl(e)}
                              />
                              {subEventData.posterUrl && (
                                <Typography className="text-danger ms-3">
                                  select img
                                </Typography>
                              )}
                            </div>
                          </div>
                          <div className="col mt-3">
                            {!subEventImgToUrlProsess.loding &&
                              !subEventImgToUrlProsess.error &&
                              !subEventImgToUrlProsess.success && (
                                <Typography>Not select img</Typography>
                              )}
                            {subEventImgToUrlProsess.loding && (
                              <CircularProgress size={20} />
                            )}
                            {subEventImgToUrlProsess.success && (
                              <Typography
                                className="text-success"
                                style={{ fontSize: "13px" }}
                              >
                                successfully select img
                              </Typography>
                            )}
                            {subEventImgToUrlProsess.error && (
                              <Typography
                                className="text-danger"
                                style={{ fontSize: "13px" }}
                              >
                                fail select img
                              </Typography>
                            )}
                          </div>
                          <div className="d-flex justify-content-center align-items-center">
                            {subEventData.posterUrl && (
                              <img
                                className="mt-3 rounded shadow"
                                style={{ height: "20vh", width: "60%" }}
                                src={subEventData.posterUrl}
                              ></img>
                            )}
                          </div>
                        </div>
                        <div class="mt-3">
                          <label
                            for="exampleFormControlTextarea1"
                            class="form-label"
                          >
                            Enter event discription
                          </label>
                          <textarea
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            placeholder="Enter event discription"
                            onChange={(e)=>setSubEventData({...subEventData , discription : e.target.value})}
                            rows="3"
                          ></textarea>
                        </div>

                        
                      </>
                    )}
                    {activeStep + 1 == 3 && (
                      <>
                        {!coordinatorDataError.coordinatorName ? (
                          <TextField
                            id="outlined-basic"
                            label="coordinator name"
                            variant="outlined"
                            style={{ marginBottom: "10px", width: "100%" }}
                            value={coordinatorData.coordinatorName}
                            onChange={(e) =>
                              setCoordinatorData({
                                ...coordinatorData,
                                coordinatorName: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <TextField
                            id="outlined-basic"
                            label="coordinator name"
                            variant="outlined"
                            error
                            helperText="Enter name"
                            style={{ marginBottom: "10px", width: "100%" }}
                            value={coordinatorData.coordinatorName}
                            onChange={(e) =>
                              setCoordinatorData({
                                ...coordinatorData,
                                coordinatorName: e.target.value,
                              })
                            }
                          />
                        )}
                        {!coordinatorDataError.email ? (
                          <TextField
                            id="outlined-basic"
                            label="coordinator Email"
                            variant="outlined"
                            style={{ marginBottom: "10px", width: "100%" }}
                            value={coordinatorData.email}
                            onChange={(e) =>
                              setCoordinatorData({
                                ...coordinatorData,
                                email: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <TextField
                            id="outlined-basic"
                            label="coordinator Email"
                            variant="outlined"
                            error
                            helperText="Enter email"
                            style={{ marginBottom: "10px", width: "100%" }}
                            value={coordinatorData.email}
                            onChange={(e) =>
                              setCoordinatorData({
                                ...coordinatorData,
                                email: e.target.value,
                              })
                            }
                          />
                        )}
                        {!coordinatorDataError.mobile ? (
                          <TextField
                            id="outlined-basic"
                            type="number"
                            label="coordinator mobile"
                            variant="outlined"
                            style={{ marginBottom: "10px", width: "100%" }}
                            value={coordinatorData.mobile}
                            onChange={(e) =>
                              setCoordinatorData({
                                ...coordinatorData,
                                mobile: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <TextField
                            id="outlined-basic"
                            type="number"
                            label="coordinator mobile"
                            variant="outlined"
                            helperText="length must be greter than 10"
                            error
                            style={{ marginBottom: "10px", width: "100%" }}
                            value={coordinatorData.mobile}
                            onChange={(e) =>
                              setCoordinatorData({
                                ...coordinatorData,
                                mobile: e.target.value,
                              })
                            }
                          />
                        )}
                      </>
                    )}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {activeStep !== steps.length && (
                      <Button onClick={handleComplete}>
                        {completedSteps() === totalSteps() - 1
                          ? "Finish"
                          : "Complete Step"}
                      </Button>
                    )}
                  </Box>
                </React.Fragment>
              )}
            </div>
          </Box>
          <br />
          <Button
            variant="contained"
            style={{ marginRight: "10px" }}
            color="error"
            onClick={() => handleClose()}
          >
            Cancle
          </Button>
          {/* </div> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
