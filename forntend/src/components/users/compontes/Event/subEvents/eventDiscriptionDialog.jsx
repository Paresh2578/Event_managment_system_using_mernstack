import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';


//mui
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {CircularProgress}  from '@mui/material';

//utils
import { URL} from '../../../../../util/URL';

export default function EventDiscriptionDialog({open ,  setOpen,data, eventName}) {
  const [coordinator , setCoordinator] = useState({coordinatorName : "" , email : "" , mobile  : ""});
  const [loading , setLoading] = useState(false);

  useEffect(()=>{
     getCoordinatorInfo();
  },[])

  const getCoordinatorInfo= async()=>{
    try{
      setLoading(true);
    let result = await fetch(`${URL}/api/subEvent/getCoordinator/${data.coordinatorId}`);
    result = await result.json();

    setLoading(false);

    if(result.success){
      setCoordinator(result.data);
    }else{
      toast.error("Fetch coordinator fail");
       }
    }catch(error){
      setLoading(false);
      toast.error("Fetch coordinator fail");
    }
  }

  return (
    <div>
      <div className="mt-5">
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="font-weight-bold text-center" style={{padding : '20px 50px 20px 50px'}}>
          {`Event : ${data.subEventname}`}
          <hr/>
        </DialogTitle>
        <DialogContent className="d-block">

          <p>
            {data.discription}
          </p>

          <div>
            <h4>coordinator</h4>
            <hr/>
            {loading ? <CircularProgress size={'1.5rem'}/> : <ul>
              <li>{coordinator.coordinatorName}</li>
              <li>{coordinator.email}</li>
              <li>{coordinator.mobile}</li>
          
            </ul> }
            
          </div>


          
          <Button
            variant="contained"
            style={{ marginRight: "10px" }}
            color="success"
            className='mt-1'
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
    </div>
  )
}
