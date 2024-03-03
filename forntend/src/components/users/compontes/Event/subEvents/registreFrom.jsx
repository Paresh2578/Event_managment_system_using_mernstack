import React , {useEffect, useState} from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

// import "../style.css";
///utils
import {URL} from '../../../../../util/URL';
import {service_id , sendEmail_api , user_id , template_id} from  '../../../../../util/sendEmailData'
import { formetTime } from '../../../../../util/FormentTime'

//mui
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { FormControl,
  FormLabel , InputLabel , Select , MenuItem} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import {CircularProgress}  from '@mui/material';
import { Troubleshoot } from "@mui/icons-material";
import { ToastContainer, toast } from 'react-toastify';
import {DEMO , rezoPey_key} from '../../../../../env/env'



export default function RegistreFrom({
  registerOpen,
  setregisterOpen,
  data,
  university,
  eventName,
  getAllSubEvents
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [singleParticipationData , setsingleParticipationData] =useState({eventName : eventName ,subEventName : data.subEventname  ,subEventId : data._id,name : "" ,university : "", Enrollment : "" ,email : "" ,mobile : ""})
  // const [groupParticipationData , setGroupParticipationData] =useState({eventName : eventName ,subEventName : data.subEventname  ,subEventId : data._id,members : [data.groupMember.map(e , index)=>{name : "" ,Enrollment : "" ,email : "" ,mobile : ""}]});
  const [groupParticipationData, setGroupParticipationData] = useState({
    eventName: eventName,
    subEventName: data.subEventname,
    subEventId: data._id,
    groupName : "",
    university : "",
    members: Array.from({ length: data.groupMember }).map((_, index) => ({
      name: "",
      Enrollment: "",
      email: "",
      mobile: "",
    })),
  });

  const [payment , setPayment] = useState(data.pay);
  const [paid , setPaid] = useState(data.paid);


  const [singleParticipationDataError , setsingleParticipationDataError] =useState({name : false ,Enrollment : false ,email : false ,mobile : false});
  const [groupParticipationDataError , setGroupParticipationDataError] =useState(Array.from({ length: data.groupMember }).map((_, index)=>({name : false,Enrollment : false ,email : false ,mobile : false})));
  const [registerLoding , setRegisterLoding] = useState(false);
  const [eventDate , setEventDate] = useState();
  const [subEventTime , setSubEvnetTime] = useState(data.startTime);
  const [isGroup , setIsGrup] = useState(data.isGroup);
  const [groupMember , setGroupMember] = useState(data.groupMember);

  const [allowStudentList , setAllowStudentList] = useState();

  const [college , setCollege] = useState([]);


  useEffect(()=>{
    getEventInfo();
    getAllowStudentList();

    if(university == "All"){
      setCollege(["R.k University" , "Arpitt University" , "Atmiya University" , "Darshan University"]);
    }else{
      setCollege([university.toString().split("_").join(" ").toString()]);
    }
  },[]);

  const getAllowStudentList =async(req , res)=>{
    try{

      let result = await fetch('http://localhost:4500/api/allowStudentList');
      result = await result.json();

      if(result.success){
        setAllowStudentList(result.data[0]);
      }else{
        throw new Error("error")
      }

    }catch(error){
       toast.error("Opps , Something went wrong");
    }
  }

  const getEventInfo =async ()=>{
    try{
      let result = await fetch(`${URL}/api/event/getOneEvent/${data.eventId}`);
      result = await result.json();

      if(result.success){
        setEventDate(result.data.date);
      }else{
        toast.error('something wrong');
      }
    }catch(error){
      toast.error('something wrong');
    }
  }



  const handleClose = () => {
    // getAllSubEvents();
    setregisterOpen(false);

  };

  const handleRegister = async()=>{


      if(isGroup){
        //validate groupParticipationData
        if(groupParticipationData.groupName.length == 0){
          return;
        }
        for(let i=0;i<groupMember;i++){
        console.log(allowStudentList[groupParticipationData.university.split(" ").join("_").toString()].includes(groupParticipationData.members[i].Enrollment));
        console.log(allowStudentList[groupParticipationData.university.split(" ").join("_").toString()]);
        console.log("curr en : " , groupParticipationData.members[i].Enrollment);
          if(groupParticipationData.members[i].name.length == 0){
            setGroupParticipationDataError(groupParticipationDataError.map((data, idx)=> idx == i ? {name : true ,Enrollment : false ,email : false ,mobile : false}: data));
            return;
          }else if(groupParticipationData.members[i].Enrollment.toString().length == 0 || !allowStudentList[groupParticipationData.university.split(" ").join("_").toString()].includes(groupParticipationData.members[i].Enrollment)){
            setGroupParticipationDataError(groupParticipationDataError.map((data, idx)=> idx == i ? {name : false ,Enrollment : true ,email : false ,mobile : false}: data));
            return;
          }else if(groupParticipationData.members[i].email.length == 0){
            setGroupParticipationDataError(groupParticipationDataError.map((data, idx)=> idx == i ? {name : false ,Enrollment : false ,email : true ,mobile : false}: data));
            return;
          }else if(groupParticipationData.members[i].mobile.toString().length <= 9){
            setGroupParticipationDataError(groupParticipationDataError.map((data, idx)=> idx == i ? {name : false ,Enrollment : false ,email : false ,mobile : true}: data));
            return;
          }
        }

        // setGroupParticipationDataError(Array.from({ length: groupMember }).map((_, index)=>({name : false,Enrollment : false ,email : false ,mobile : false})));

        // //IS evnet is paid .pay payment 
        // groupRegister();

     

      }else{
        //validate singleParticipationsData
      if(singleParticipationData.name.length == 0){
        setsingleParticipationDataError({name : true ,Enrollment : false ,email : false ,mobile : false})
      }else if(singleParticipationData.Enrollment.toString().length == 0){
        setsingleParticipationDataError({name : false ,Enrollment : true ,email : false ,mobile : false})
      }else if(singleParticipationData.email.length == 0){
        setsingleParticipationDataError({name : false ,Enrollment : false ,email : true ,mobile : false})
      }else if(singleParticipationData.mobile.toString().length <= 9){
        setsingleParticipationDataError({name : false ,Enrollment : false ,email : false ,mobile : true})
      }else{


        if(singleParticipationData.university.length == 0){
          toast.error("Select University");
           return;
        }
        if(allowStudentList[singleParticipationData.university.split(" ").join("_").toString()].includes(singleParticipationData.Enrollment)){
          setsingleParticipationDataError({name : false ,Enrollment : false ,email : false ,mobile : false});

          singleStudentRegister();
        }else{
          toast.error("Invalid Enrollment number")
          return;
        }


       
      }
    }
  }

  const senEmail = async()=>{
       //send email
       var data = {
        service_id: service_id,
        template_id:template_id,
        user_id: user_id,
        template_params: {
          'student_name' : isGroup ? `group leader ${groupParticipationData.members[0].name}` : singleParticipationData.name,
          'event_name' : singleParticipationData.subEventName,
          'college_name' : "XYZ university",
          'event_date' : eventDate,
          'event_time' : formetTime(subEventTime),
          'Contact_Information' :'9327095244',
          'student_email' : isGroup ? groupParticipationData.members[0].email  : singleParticipationData.email,
        }
    };
    try{
      //send email
    await axios.post(`${sendEmail_api}`, data)
      toast.success(isGroup ? "send email in group leader" :  "send email");
   }catch(error){
     toast.error("Failed to send email");
   }


  }


  const singleStudentRegister = async()=>{
        

        try{
          setRegisterLoding(true);

           let result = await fetch(`${URL}/api/participation/singleRegister`  , {
          //  let result = await fetch(`${URL}/api/participation/singleRegister`  , {
            method : "POST",
            body : JSON.stringify(singleParticipationData),
            headers : {
              "content-type": "application/json",
            }
           })
           result = await result.json();
          //  setRegisterLoding(false);
           if(result.success){
            if(paid){
              handlePayment(result.id);
            }else{
              getAllSubEvents();
              setregisterOpen(false);
              setRegisterLoding(false);
              toast.success("sucessfully Register");
              //send email
              senEmail();
            }
              }else{
                  setRegisterLoding(false);
              toast.error(result.message);
           }
        }catch(error){
          setRegisterLoding(false);
          toast.error("Register fail");
        }
  }

  const groupRegister = async()=>{

    
    try{
    
     setRegisterLoding(true);
      let result = await fetch(`${URL}/api/participation/groupRegister`  , {
       method : "POST",
       body : JSON.stringify(groupParticipationData),
       headers : {
         "content-type": "application/json",
       }
      })
      result = await result.json();
      setRegisterLoding(false);
      if(result.success){
        if(paid){
          handlePayment(result.id);
        }else{
          getAllSubEvents();
          setregisterOpen(false);
          setRegisterLoding(false);
          toast.success("sucessfully Register");
          //send email
          senEmail();
        }
      }else{
       toast.error(result.message);
      }
   }catch(error){
     setRegisterLoding(false);
     toast.error("Fail Register");
   }

  }

  //payment
  const initPayment = (data , participationID) => {
		const options = {
			key: rezoPey_key,
			amount: payment,
			currency: data.currency,
			// name: singleParticipationData.subEventName,
			name: "EventX",
			description: "Test Transaction",
			image:"32332",
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = `${URL}/api/payment/verify`;
					// const verifyUrl = `${URL}/api/paynt/verify`;
					const { data } = await axios.post(verifyUrl, response);

          toast.success("Payment successfully");
          getAllSubEvents();
          setregisterOpen(false);
          setRegisterLoding(false);
          toast.success("sucessfully Register");
          //send email
          senEmail();
          return true;
          
          
				} catch (error) {
          // console.log("error ")
          // setRegisterLoding(false);
          // deleteParticipation(participationID);

          toast.success("Payment successfully");
          getAllSubEvents();
          setregisterOpen(false);
          setRegisterLoding(false);
          toast.success("sucessfully Register");
          //send email
          senEmail();
          
          return false;
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);


    rzp1.on('razorpay:modal:closed', function() {
      console.log('Razorpay modal closed');
      // Call your function here
    });


		rzp1.open();


    return true;
    
	};

	const handlePayment = async (participationID) => {
		try {
			const orderUrl = `${URL}/api/payment/orders`;
			const { data } = await axios.post(orderUrl, { amount: payment });
			initPayment(data.data , participationID);
		} catch (error) {
      deleteParticipation(participationID);
      setRegisterLoding(false);
       toast.error("Faild Payment")
		}
	};


  //delete particiption when failed payment
  const deleteParticipation =async (participationID)=>{
    if(isGroup){
      console.log("call remove group");
      await fetch(`${URL}/api/participation/deleteGroupParticipations/${participationID}` , {method :'DELETE'});
    }else{
      console.log("call remove Single particiption");
      await fetch(`${URL}/api/participation/deleteSingleParticipations/${participationID}` , {method :'DELETE'});
    }
    setRegisterLoding(false);
  }

  return (
    <div className="mt-5">
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
            <TextField
                    id="outlined-basic"
                    error ={groupParticipationData.groupName.length == 0}
                    helperText={groupParticipationData.groupName.length == 0 ? "Enter group name" : ""}
                    variant="outlined"
                    required
                    label={`Group name`}
                    value={groupParticipationData.groupName}
                    style={{ marginBottom: "10px", width: "100%" , fontSize:"10rem" }}
                    onChange={(e)=>setGroupParticipationData({...groupParticipationData, groupName : e.target.value})}
                  />

<FormControl
                          className="mb-3"
                          fullWidth
                        >
                          <InputLabel id="demo-simple-select-label" required>
                            select University
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={groupParticipationData.university}
                            label="select university"
                            onChange={(e) =>
                              setGroupParticipationData({
                                ...groupParticipationData,
                                university: e.target.value,
                              })
                            }
                          >
                            {college.map((c)=>(
                              <MenuItem value={c}>{c}</MenuItem>
                            ))}
                            {/* <MenuItem value={"Darshan University"}>Darshan University</MenuItem>
                            <MenuItem value={"Atmiya University"}>Atmiya University</MenuItem>
                            <MenuItem value={"Arpitt University"}>Arpitt University</MenuItem>
                            <MenuItem value={"R.k University"}>R.k University</MenuItem> */}
                          </Select>
                        </FormControl>

              {/* {Array.from({ length: data.groupMember }).map((_, index) => ( */}
              {Array.from({ length: data.groupMember }).map((_, index) => (
                 <div key={index}>
                 <p className="t-center" style={{fontSize:'1rem'}} >*** {index == 0 ? "Leader" :  `member ${index+1}` } ***</p>
                 {groupParticipationDataError[index].name ? 
                    <TextField
                    id="outlined-basic"
                    error
                    helperText="enter name"
                    variant="outlined"
                    required
                    label={`${index == 0 ? "Leader" :  `member ${index+1}`} name`}
                    value={groupParticipationData.members[index].name}
                    style={{ marginBottom: "10px", width: "100%" , fontSize:'4rem' }}
                    onChange={(e)=>setGroupParticipationData({...groupParticipationData, members : groupParticipationData.members.map((member , idx)=>idx === index ? {...member , name : e.target.value} : member)})}
                  />
                 : <TextField
                   id="outlined-basic"
                   variant="outlined"
                   value={groupParticipationData.members[index].name}
                   required
                  //  label={`member ${index+1} name`}
                   label={`${index == 0 ? "Leader" :  `member ${index+1}`} name`}
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
                 helperText="Invalid Enrollment no"
                 required
                 label={`${index == 0 ? "Leader" :  `member ${index+1}`} Enrollment no`}
                 value={groupParticipationData.members[index].Enrollment}
                 onChange={(e)=>setGroupParticipationData({...groupParticipationData, members : groupParticipationData.members.map((member , idx)=>idx === index ? {...member , Enrollment : e.target.value} : member)})}    />
                 : <TextField
                   style={{ marginBottom: "10px", width: "100%" }}
                   id="outlined-basic"
                   variant="outlined"
                   type="number"
                   required
                   label={`${index == 0 ? "Leader" :  `member ${index+1}`} Enrollment no`}
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
                 label={`${index == 0 ? "Leader" :  `member ${index+1}`} Email`}
                 value={groupParticipationData.members[index].email}
                 onChange={(e)=>setGroupParticipationData({...groupParticipationData, members : groupParticipationData.members.map((member , idx)=>idx === index ? {...member , email : e.target.value} : member)})}    />
                  :
                   <TextField
                   id="outlined-basic"
                   style={{ marginBottom: "10px", width: "100%" }}
                   variant="outlined"
                   value={groupParticipationData.members[index].email}
                   required
                   label={`${index == 0 ? "Leader" :  `member ${index+1}`} Email`}
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
                 label={`${index == 0 ? "Leader" :  `member ${index+1}`} mobile No`}
                 onChange={(e)=>setGroupParticipationData({...groupParticipationData, members : groupParticipationData.members.map((member , idx)=>idx === index ? {...member , mobile : e.target.value} : member)})}    />
                  : <TextField
                    id="outlined-basic"
                    style={{ marginBottom: "10px", width: "100%" }}
                    variant="outlined"
                    type="number"
                    required
                    label={`${index == 0 ? "Leader" :  `member ${index+1}`} mobile No`}
                    value={groupParticipationData.members[index].mobile}
                    onChange={(e)=>setGroupParticipationData({...groupParticipationData, members : groupParticipationData.members.map((member , idx)=>idx === index ? {...member , mobile : e.target.value} : member)})}    />
                  }
               </div>
          
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

              <FormControl
                          className="mb-3"
                          fullWidth
                        >
                          <InputLabel id="demo-simple-select-label" required>
                            select University
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={singleParticipationData.university}
                            label="select university"
                            onChange={(e) =>
                              setsingleParticipationData({
                                ...singleParticipationData,
                                university: e.target.value,
                              })
                            }
                          >
                             {college.map((c)=>(
                              <MenuItem value={c}>{c}</MenuItem>
                            ))}
                            {/* <MenuItem value={"Darshan University"}>Darshan University</MenuItem>
                            <MenuItem value={"Atmiya University"}>Atmiya University</MenuItem>
                            <MenuItem value={"Arpitt University"}>Arpitt University</MenuItem>
                            <MenuItem value={"R.k University"}>R.k University</MenuItem> */}
                          </Select>
                        </FormControl>

              <br/>
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
              helperText="enter valid mobile"
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
    </div>
  );
}
