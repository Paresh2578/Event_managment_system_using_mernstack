import React, { useState } from "react";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";
import axios from "axios";

// import "../style.css";

//utis
import {
  FromentDate,
  normalDateToLocalStringForment,
} from "../../util/FormentDate";

//mui
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Typography from "@mui/material/Typography";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const steps = [
  "Enter Event details",
  "Enter subEvent details",
  "Enter coordinator details",
];

export default function CreateEvent({ open, setOpen }) {
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [group, setGroup] = useState(false);
  const [eventData, setEventData] = useState({
    name: "",
    date: null,
    posterUrl: "",
  });

  const [subEventData, setSubEventData] = useState({
    name: "",
    category: "",
    time: "",
    grupMember: -1,
    posterUrl: "",
  });

  const [coordinatorData, setCoordinatorData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [imgUrlData, setImgUrlData] = useState({
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
      setCompleted(newCompleted);
      handleNext();
    }
  };

  const checkValidtionData = (activeStep) => {
    if (activeStep == 0) {
      console.log("error check", eventData.name.length);

      if (eventData.name.length == 0) {
        setEventDataError({ name: true, date: false, posterUrl: false });
        return false;
      } else if (eventData.date == null || eventData.date.length == 0) {
        setEventDataError({ name: false, date: true, posterUrl: false });
        return false;
      } else if (eventData.posterUrl.length == 0) {
        setEventDataError({ name: false, date: false, posterUrl: true });
        return false;
      }
    }

    return true;
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };

  const uploadImg = async (e) => {
    setImgUrlData((imgUrlData.loding = true));
    // setImgUrlData((imgUrlData.success = false));
    // setImgUrlData((imgUrlData.error = false));

    console.log(imgUrlData);
    const image = e.target.files[0];

    const formData = new FormData();
    formData.set("image", image);

    // axios
    //   .post(
    //     "https://api.imgbb.com/1/upload?key=c1e87660595242c0175f82bb850d3e15",
    //     formData
    //   )
    //   .then((res) => {
    //     console.log(res.data.data.display_url);
    //     setEventData({...eventData , posterUrl : res.data.data.display_url});
    //     // setImgUploadLoding(false)
    //     // setImgUrlData((imgUrlData.loding = false));
    //     // setImgUrlData((imgUrlData.success = true));
    //     // setImgUrlData((imgUrlData.error = false));
    //   })
    //   .catch((error) => {
    //     // console.log(error);
    //     // SweetAlrt("post imag fail", "error");
    //     // setImgUrlData(imgUrlData.loding=false);
    //     // setImgUrlData(imgUrlData.success=false);
    //     // setImgUrlData(imgUrlData.error=true);
    //   });

    setEventData({ ...eventData, posterUrl: "res.data.data.display_url" });

    console.log(imgUrlData);
  };

  return (
    <React.Fragment>
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
          <Box sx={{ width: "100%" }}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
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
                    <Button onClick={handleClose}>Create</Button>
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
                                className={imgUrlData.loding ? "d-none" : ""}
                                onChange={(e) => uploadImg(e)}
                              />
                              {eventDataError.posterUrl && (
                                <Typography className="text-danger ms-3">
                                  select img
                                </Typography>
                              )}
                            </div>
                          </div>
                          <div className="col mt-3">
                            {!imgUrlData.loding &&
                              !imgUrlData.error &&
                              !imgUrlData.success && (
                                <Typography>Not select img</Typography>
                              )}
                            {imgUrlData.loding && (
                              <CircularProgress size={20} />
                            )}
                            {imgUrlData.success && (
                              <Typography
                                className="text-success"
                                style={{ fontSize: "13px" }}
                              >
                                successfully select img
                              </Typography>
                            )}
                            {imgUrlData.error && (
                              <Typography
                                className="text-danger"
                                style={{ fontSize: "13px" }}
                              >
                                fail select img
                              </Typography>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    {activeStep + 1 == 2 && (
                      <>
                        <TextField
                          id="outlined-basic"
                          label="Event name"
                          variant="outlined"
                          value={subEventData.name}
                          onChange={(e) =>
                            setSubEventData({
                              ...subEventData,
                              name: e.target.value,
                            })
                          }
                          style={{ marginBottom: "10px", width: "100%" }}
                        />

                        <FormControl className="mb-3" fullWidth>
                          <InputLabel id="demo-simple-select-label" required>
                          select Category
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={subEventData.category}
                            label="select Category"
                            onChange={(e) =>
                              setSubEventData({ ...subEventData, category: e.target.value })
                            }
                          >
                            <MenuItem value={"Civil"}>Civil</MenuItem>
                            <MenuItem value={"Computer"}>Computer</MenuItem>
                            <MenuItem value={"Electrical"}>Electrical</MenuItem>
                            <MenuItem value={"Mechanical"}>Mechanical</MenuItem>
                            <MenuItem value={"Management"}>Management</MenuItem>
                            <MenuItem value={"Microbiology"}>Microbiology</MenuItem>
                            <MenuItem value={"General"}>General</MenuItem>
                            {/* <MenuItem value={8}>8</MenuItem> */}
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
                              <TimePicker onChange={(time)=>console.log(time.$d)} />
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>

                        <div className="row mt-3 ">
                          <FormLabel
                            id="demo-row-radio-buttons-group-label"
                            className="mt-2 ms-3 me-2 col-1"
                          >
                            Group
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            className="col"
                          >
                            <FormControlLabel
                              value={true}
                              control={<Radio />}
                              onChange={(e) => setGroup(e.target.value)}
                              label="Yes"
                            />
                            <FormControlLabel
                              value={false}
                              control={<Radio />}
                              onChange={(e) => setGroup(e.target.value)}
                              label="No"
                            />
                          </RadioGroup>
                        </div>

                        {group && (
                          <TextField
                            className="mt-2"
                            id="outlined-basic"
                            type="number"
                            label="number of group member"
                            variant="outlined"
                          />
                        )}

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
                        </div>
                      </>
                    )}
                    {activeStep + 1 == 3 && (
                      <>
                        <TextField
                          id="outlined-basic"
                          label="coordinator name"
                          variant="outlined"
                          style={{ marginBottom: "10px", width: "100%" }}
                        />
                        <TextField
                          id="outlined-basic"
                          label="coordinator Email"
                          variant="outlined"
                          style={{ marginBottom: "10px", width: "100%" }}
                        />
                        <TextField
                          id="outlined-basic"
                          type="number"
                          label="coordinator mobile"
                          variant="outlined"
                          style={{ marginBottom: "10px", width: "100%" }}
                        />
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
    </React.Fragment>
  );
}
