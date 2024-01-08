import * as React from "react";
import { useSnackbar } from "notistack";

// import "../style.css";

//mui
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function RegistreFrom({
  open,
  setOpen,
  eventName,
  group,
  numberOfNumber,
}) {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // handleClickVariant('success');
    // enqueueSnackbar("This is a success message!", "success");
    console.log("done");
    console.log(group);
    console.log(numberOfNumber);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{padding : '20px 50px 20px 50px'}}>
          {`${eventName}  register  `}
        </DialogTitle>
        <DialogContent className="d-block">
          {/* <div className="p-3"> */}
          {group ? (
            <>
              {Array.from({ length: numberOfNumber }).map((_, index) => (
               <>
               <p className="t-center">*** member {index+1} ***</p>
               {/* <br/> */}
               <TextField
                 id="outlined-basic"
                 label={`member ${index+1} Name`}
                 variant="outlined"
                 style={{ marginBottom: "10px", width: "100%" }}
               />
               <br />
               <TextField
                 style={{ marginBottom: "10px", width: "100%" }}
                 id="outlined-basic"
                 label={`member ${index+1} Enrollment`}
                 variant="outlined"
               />
               <br />
               <TextField
                 id="outlined-basic"
                 style={{ marginBottom: "10px", width: "100%" }}
                 label={`member ${index+1} Email`}
                 variant="outlined"
               />
               <br />
               <TextField
                 id="outlined-basic"
                 style={{ marginBottom: "10px", width: "100%" }}
                 label={`member ${index+1} mobile No.`}
                 variant="outlined"
               />
             </>
              ))}
            </>
          ) : (
            <>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                style={{ marginBottom: "10px", width: "100%" }}
              />
              <br />
              <TextField
                style={{ marginBottom: "10px", width: "100%" }}
                id="outlined-basic"
                label="Enrollment no"
                variant="outlined"
              />
              <br />
              <TextField
                id="outlined-basic"
                style={{ marginBottom: "10px", width: "100%" }}
                label="Email"
                variant="outlined"
              />
              <br />
               <TextField
                 id="outlined-basic"
                 style={{ marginBottom: "10px", width: "100%" }}
                 label={`member ${index+1} mobile No.`}
                 variant="outlined"
               />
            </>
          )}
          <br />
          <Button
            variant="contained"
            style={{ marginRight: "10px" }}
            color="error"
            onClick={() => handleClose()}
          >
            Cancle
          </Button>
          <Button variant="contained">register</Button>
          {/* </div> */}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
