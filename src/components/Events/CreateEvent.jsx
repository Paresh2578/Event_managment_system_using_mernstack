import * as React from "react";
import { useSnackbar } from "notistack";

// import "../style.css";

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

const steps = [
  "Enter Event details",
  "Enter subEvent details",
  "Enter coordinator details",
];

export default function CreateEvent({ open, setOpen }) {
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

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
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleClose = () => {
    setOpen(false);
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
                        <TextField
                          id="outlined-basic"
                          label="Event name"
                          variant="outlined"
                          style={{ marginBottom: "10px", width: "100%" }}
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
                              <MobileDatePicker />
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
                        </div>
                      </>
                    )}
                    {activeStep + 1 == 2 && (
                      <>
                        <TextField
                          id="outlined-basic"
                          label="Event name"
                          variant="outlined"
                          style={{ marginBottom: "10px", width: "100%" }}
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
                            <DemoItem
                              label="subEvent time"
                            >
                              <TimePicker />
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
