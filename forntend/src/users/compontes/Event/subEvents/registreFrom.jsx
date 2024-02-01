import React , {useEffect, useState} from "react";
import { useSnackbar } from "notistack";

// import "../style.css";
///utils
import {URL} from '../../../../util/URL';

//mui
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import {CircularProgress}  from '@mui/material';
import { Troubleshoot } from "@mui/icons-material";

export default function RegistreFrom({
  registerOpen,
  setregisterOpen,
  data,
  eventName
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [singleParticipationData , setsingleParticipationData] =useState({eventName : eventName ,subEventName : data.subEventname  ,subEventId : data._id,name : "" ,Enrollment : "" ,email : "" ,mobile : ""})
  // const [groupParticipationData , setGroupParticipationData] =useState({eventName : eventName ,subEventName : data.subEventname  ,subEventId : data._id,members : [data.groupMember.map(e , index)=>{name : "" ,Enrollment : "" ,email : "" ,mobile : ""}]});
  const [groupParticipationData, setGroupParticipationData] = useState({
    eventName: eventName,
    subEventName: data.subEventname,
    subEventId: data._id,
    members: Array.from({ length: data.groupMember }).map((_, index) => ({
      name: "",
      Enrollment: "",
      email: "",
      mobile: "",
    })),
  });

  const [singleParticipationDataError , setsingleParticipationDataError] =useState({name : false ,Enrollment : false ,email : false ,mobile : false});
  const [groupParticipationDataError , setGroupParticipationDataError] =useState(Array.from({ length: data.groupMember }).map((_, index)=>({name : false,Enrollment : false ,email : false ,mobile : false})));
  const [registerLoding , setRegisterLoding] = useState(false);



  const handleClose = () => {
    setregisterOpen(false);
  };

  const handleRegister = async()=>{
      if(data.isGroup){
        //validate groupParticipationData
        console.log(groupParticipationDataError);
        // Boolean 
        for(let i=0;i<data.groupMember;i++){
          if(groupParticipationData.members[i].name.length == 0){
            setGroupParticipationDataError(groupParticipationDataError.map((data, idx)=> idx == i ? {name : true ,Enrollment : false ,email : false ,mobile : false}: data));
            return;
          }else if(groupParticipationData.members[i].Enrollment.toString().length == 0){
            setGroupParticipationDataError(groupParticipationDataError.map((data, idx)=> idx == i ? {name : false ,Enrollment : true ,email : false ,mobile : false}: data));
            return;
          }else if(groupParticipationData.members[i].email.length == 0){
            setGroupParticipationDataError(groupParticipationDataError.map((data, idx)=> idx == i ? {name : false ,Enrollment : false ,email : true ,mobile : false}: data));
            return;
          }else if(groupParticipationData.members[i].mobile.toString().length == 0){
            setGroupParticipationDataError(groupParticipationDataError.map((data, idx)=> idx == i ? {name : false ,Enrollment : false ,email : false ,mobile : true}: data));
            return;
          }
        }

        setGroupParticipationDataError(Array.from({ length: data.groupMember }).map((_, index)=>({name : false,Enrollment : false ,email : false ,mobile : false})));
        try{
          setRegisterLoding(true);
           let result = await fetch(`${URL}/participation/groupRegister`  , {
            method : "POST",
            body : JSON.stringify(groupParticipationData),
            headers : {
              "content-type": "application/json",
            }
           })
           result = await result.json();
           setRegisterLoding(false);
           console.log(result);
           if(result.success){
            setregisterOpen(false);
           }else{
            alert(result.error);
            console.log("registr error : " , result.error);
           }
        }catch(error){
          setRegisterLoding(false);
          console.log("register user error : " , error);
        }


      }else{
        //validate singleParticipationsData
      if(singleParticipationData.name.length == 0){
        setsingleParticipationDataError({name : true ,Enrollment : false ,email : false ,mobile : false})
      }else if(singleParticipationData.Enrollment.toString().length == 0){
        setsingleParticipationDataError({name : false ,Enrollment : true ,email : false ,mobile : false})
      }else if(singleParticipationData.email.length == 0){
        setsingleParticipationDataError({name : false ,Enrollment : false ,email : true ,mobile : false})
      }else if(singleParticipationData.mobile.toString().length == 0){
        setsingleParticipationDataError({name : false ,Enrollment : false ,email : false ,mobile : true})
      }else{
        setsingleParticipationDataError({name : false ,Enrollment : false ,email : false ,mobile : false});

        try{
          setRegisterLoding(true);
           let result = await fetch(`${URL}/participation/singleRegister`  , {
            method : "POST",
            body : JSON.stringify(singleParticipationData),
            headers : {
              "content-type": "application/json",
            }
           })
           result = await result.json();
           setRegisterLoding(false);
           console.log(result);
           console.log(result.success);
           if(result.success){
            setregisterOpen(false);
           }else{
            alert(result.error);
            console.log("registr error : " , result.error);
           }
        }catch(error){
          setRegisterLoding(false);
          console.log("register user error : " , error);
        }
      }
      }
  }

  return (
    <React.Fragment>
      <Dialog
        open={registerOpen}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{padding : '20px 50px 20px 50px'}}>
          {`${data.subEventname}  register  `}
        </DialogTitle>
        <DialogContent className="d-block">
          {/* <div className="p-3"> */}
          {data.isGroup ? (
            <>
              {/* {Array.from({ length: data.groupMember }).map((_, index) => ( */}
              {Array.from({ length: data.groupMember }).map((_, index) => (
                 <>
                 <p className="t-center">*** member {index+1} ***</p>
                 {groupParticipationDataError[index].name ? 
                    <TextField
                    id="outlined-basic"
                    error
                    helperText="enter name"
                    variant="outlined"
                    required
                    label={`member ${index+1} name`}
                    value={groupParticipationData.members[index].name}
                    style={{ marginBottom: "10px", width: "100%" }}
                    onChange={(e)=>setGroupParticipationData({...groupParticipationData, members : groupParticipationData.members.map((member , idx)=>idx === index ? {...member , name : e.target.value} : member)})}
                  />
                 : <TextField
                   id="outlined-basic"
                   variant="outlined"
                   value={groupParticipationData.members[index].name}
                   required
                   label={`member ${index+1} name`}
                   style={{ marginBottom: "10px", width: "100%" }}
                   onChange={(e)=>setGroupParticipationData({...groupParticipationData, members : groupParticipationData.members.map((member , idx)=>idx === index ? {...member , name : e.target.value} : member)})}
                 />}
                 
                 <br />
                 {groupParticipationDataError[index].Enrollment ? 
                 <TextField
                 style={{ marginBottom: "10px", width: "100%" }}
                 id="outlined-basic"
                  variant="outlined"
                 type="number"
                 error
                 helperText="enter Enrollment no"
                 required
                 label={`member ${index+1} Enrollment no`}
                 value={groupParticipationData.members[index].Enrollment}
                 onChange={(e)=>setGroupParticipationData({...groupParticipationData, members : groupParticipationData.members.map((member , idx)=>idx === index ? {...member , Enrollment : e.target.value} : member)})}    />
                 : <TextField
                   style={{ marginBottom: "10px", width: "100%" }}
                   id="outlined-basic"
                   variant="outlined"
                   type="number"
                   required
                   label={`member ${index+1} Enrollment no`}
                   value={groupParticipationData.members[index].Enrollment}
                   onChange={(e)=>setGroupParticipationData({...groupParticipationData, members : groupParticipationData.members.map((member , idx)=>idx === index ? {...member , Enrollment : e.target.value} : member)})}    />
                   }
                 <br />
                 {groupParticipationDataError[index].email ?
                 <TextField
                 id="outlined-basic"
                 style={{ marginBottom: "10px", width: "100%" }}
                 variant="outlined"
                 error
                 helperText="enter email"
                 required
                 label={`member ${index+1} Email`}
                 value={groupParticipationData.members[index].email}
                 onChange={(e)=>setGroupParticipationData({...groupParticipationData, members : groupParticipationData.members.map((member , idx)=>idx === index ? {...member , email : e.target.value} : member)})}    />
                  :
                   <TextField
                   id="outlined-basic"
                   style={{ marginBottom: "10px", width: "100%" }}
                   variant="outlined"
                   value={groupParticipationData.members[index].email}
                   required
                   label={`member ${index+1} Email`}
                   onChange={(e)=>setGroupParticipationData({...groupParticipationData, members : groupParticipationData.members.map((member , idx)=>idx === index ? {...member , email : e.target.value} : member)})}    />
            
                }
                 <br />
                  {groupParticipationDataError[index].mobile  ? 
                  <TextField
                  id="outlined-basic"
                  style={{ marginBottom: "10px", width: "100%" }}
                  variant="outlined"
                  type="number"
                  value={groupParticipationData.members[index].mobile}
                  error
                 helperText="enter mobile"
                 required
                 label={`member ${index+1} mobile No`}
                 onChange={(e)=>setGroupParticipationData({...groupParticipationData, members : groupParticipationData.members.map((member , idx)=>idx === index ? {...member , mobile : e.target.value} : member)})}    />
                  : <TextField
                    id="outlined-basic"
                    style={{ marginBottom: "10px", width: "100%" }}
                    variant="outlined"
                    type="number"
                    required
                    label={`member ${index+1} mobile No`}
                    value={groupParticipationData.members[index].mobile}
                    onChange={(e)=>setGroupParticipationData({...groupParticipationData, members : groupParticipationData.members.map((member , idx)=>idx === index ? {...member , mobile : e.target.value} : member)})}    />
                  }
               </>
            //    <>
            //    <p className="t-center">*** member {index+1} ***</p>
            //    {/* <br/> */}
            //    <TextField
            //      id="outlined-basic"
            //      label={`member ${index+1} Name`}
            //      variant="outlined"
            //      style={{ marginBottom: "10px", width: "100%" }}
            //    />
            //    <br />
            //    <TextField
            //      style={{ marginBottom: "10px", width: "100%" }}
            //      id="outlined-basic"
            //      label={`member ${index+1} Enrollment`}
            //      variant="outlined"
            //    />
            //    <br />
            //    <TextField
            //      id="outlined-basic"
            //      style={{ marginBottom: "10px", width: "100%" }}
            //      label={`member ${index+1} Email`}
            //      variant="outlined"
            //    />
            //    <br />
            //    <TextField
            //      id="outlined-basic"
            //      style={{ marginBottom: "10px", width: "100%" }}
            //      label={`member ${index+1} mobile No.`}
            //      variant="outlined"
            //    />
            //  </>
              ))}
            </>
          ) : (
            <>
              {singleParticipationDataError.name ? 
                 <TextField
                 id="outlined-basic"
                 label="Name"
                 error
                 helperText="enter name"
                 variant="outlined"
                 required
                 value={singleParticipationData.name}
                 style={{ marginBottom: "10px", width: "100%" }}
                 onChange={(e)=>setsingleParticipationData({...singleParticipationData , name : e.target.value})}
               />
              : <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={singleParticipationData.name}
                required
                style={{ marginBottom: "10px", width: "100%" }}
                onChange={(e)=>setsingleParticipationData({...singleParticipationData , name : e.target.value})}
              />}
              <br />
              {singleParticipationDataError.Enrollment ? 
              <TextField
              style={{ marginBottom: "10px", width: "100%" }}
              id="outlined-basic"
              label="Enrollment no"
              variant="outlined"
              type="number"
              error
              helperText="enter Enrollment no"
              required
              value={singleParticipationData.Enrollment}
              onChange={(e)=>setsingleParticipationData({...singleParticipationData , Enrollment : e.target.value})}
            />
              : <TextField
                style={{ marginBottom: "10px", width: "100%" }}
                id="outlined-basic"
                label="Enrollment no"
                variant="outlined"
                type="number"
                required
                value={singleParticipationData.Enrollment}
                onChange={(e)=>setsingleParticipationData({...singleParticipationData , Enrollment : e.target.value})}
              />}
              <br />
              {singleParticipationDataError.email ?
              <TextField
              id="outlined-basic"
              style={{ marginBottom: "10px", width: "100%" }}
              label="Email"
              variant="outlined"
              error
              helperText="enter email"
              required
              value={singleParticipationData.email}
              onChange={(e)=>setsingleParticipationData({...singleParticipationData , email : e.target.value})}
            />
               :
                <TextField
                id="outlined-basic"
                style={{ marginBottom: "10px", width: "100%" }}
                label="Email"
                variant="outlined"
                value={singleParticipationData.email}
                required
                onChange={(e)=>setsingleParticipationData({...singleParticipationData , email : e.target.value})}
              />}
              <br />
               {singleParticipationDataError.mobile  ? 
               <TextField
               id="outlined-basic"
               style={{ marginBottom: "10px", width: "100%" }}
               label={` mobile No.`}
               variant="outlined"
               type="number"
               value={singleParticipationData.mobile}
               error
              helperText="enter mobile"
              required
               onChange={(e)=>setsingleParticipationData({...singleParticipationData , mobile : e.target.value})}
             />
               : <TextField
                 id="outlined-basic"
                 style={{ marginBottom: "10px", width: "100%" }}
                 label={` mobile No.`}
                 variant="outlined"
                 type="number"
                 required
                 value={singleParticipationData.mobile}
                 onChange={(e)=>setsingleParticipationData({...singleParticipationData , mobile : e.target.value})}
               />}
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
          <Button variant="contained" onClick={()=>handleRegister()}>
            {
              registerLoding ? <CircularProgress size="2rem" color="inherit"/> : 'register'
            }
            
            </Button>
          {/* </div> */}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
