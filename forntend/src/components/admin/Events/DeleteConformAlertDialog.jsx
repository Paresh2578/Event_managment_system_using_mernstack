import * as React from 'react';

//mui
import {
    Button,
    CardContent,
    CardMedia,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogActions
  } from "@mui/material";

export default function DeleteConformAlertDialog({open , setOpen , deleteFunction , deleteEventLoding}) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure delete ?"}
        </DialogTitle>
        <DialogActions>
          <Button  onClick={handleClose}>No</Button>
          {deleteEventLoding ? <CircularProgress/>:<Button onClick={deleteFunction} >
            Yes
          </Button> }
          

          
          
        </DialogActions>
      </Dialog>
    </>
  );
}