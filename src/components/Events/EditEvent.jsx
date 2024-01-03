import React from 'react'

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
import { TimePicker } from "@mui/x-date-pickers/TimePicker";


export default function EditEvent({open , setOpen}) {
  const handleClose = () => {
    setOpen(false);
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
          {`edit Event`}
        </DialogTitle>
        <DialogContent className="d-block">
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
          <br />
          <Button
            variant="contained"
            style={{ marginRight: "10px" }}
            color="error"
            onClick={() => handleClose()}
          >
            Cancle
          </Button>
          <Button
            variant="contained"
            style={{ marginRight: "10px" }}
            color="primary"
            onClick={() => handleClose()}
          >
            Edit
          </Button>
          {/* </div> */}
        </DialogContent>
      </Dialog>
    </div>
  )
}
