import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user5 from "../../../../assets/images/users/user5.jpg";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2'
import { CSVLink } from 'react-csv';

import '../../Events/Evnets';



//mui
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import Skeleton from '@mui/material/Skeleton';


// import ProjectTables from '../../dashboard/ProjectTable'

//utils
import {URL} from '../../../../util/URL';
import ParticiptionListLoading from '../../../Loading/ParticiptionListLoading';

export default function ParticipateUserListing() {

  let {subEventID  , competed, isGroup , subEventname} = useParams();

  let adminAuth = JSON.parse(localStorage.getItem("adminAuth"));
   const [singleParticipationsList , setSingleParticipationsList] = useState([]);
   const [groupParticipationsList , setGroupParticipationsList] = useState([]);
   const [winner  , setWinner] = useState({first : "" ,secound: ""   , third : ""});
   const [getParticipationLoading , setGetParticipationLoading] = useState(false);
   const [getWinnerLoading , setGetWinnerLoading] = useState(false);


   useEffect(()=>{
     getWinner();
    isGroup == "true" ? getGroupParticipationsList():
      getSingleParticipationsList();
      
   },[])



   const getWinner = async()=>{
     try{
      setGetWinnerLoading(true);
      let result = await fetch(`${URL}/api/winner/getWinner/${subEventID}` , {
        headers: {
          "Authorization":
            adminAuth.token
        },
      });
      result = await result.json();
      setGetWinnerLoading(false);
      if(result.success){
        if(result.data != null){
           setWinner({first : result.data.first ,secound: result.data.secound  , third : result.data.third})
        }
      }else{
        toast.error(result.message);
      }
     }catch(error){
      setGetWinnerLoading(false);
        toast.error("get Winner something wrong");
     }
   }


   const getSingleParticipationsList =  async ()=>{
      try{
        setGetParticipationLoading(true);
          let result = await fetch(`${URL}/api/participation/getsingleParticipationsList/${subEventID}` , {
            headers: {
              "content-type": "application/json",
              "Authorization":
                adminAuth.token
            },
          })

          result = await result.json();
          setGetParticipationLoading(false);

          if(result.success){
             setSingleParticipationsList(result.data);
          }else{
            toast.error(result.message);
          }

      }catch(error){
        setGetParticipationLoading(false);
        toast.error("Opps.. Sorry, something went wrong");
      }
   }

   const getGroupParticipationsList =  async ()=>{
    try{
      setGetParticipationLoading(true);
        let result = await fetch(`${URL}/api/participation/getGroupParticipationsList/${subEventID}` , {
          headers: {
            "content-type": "application/json",
            "Authorization":
              adminAuth.token
          },
        })

        result = await result.json();
  setGetParticipationLoading(false);
        if(result.success){
           setGroupParticipationsList(result.data);
        }else{
          toast.error(result.message);
        }


    }catch(error){
      setGetParticipationLoading(false);
        toast.error("Opps.. Sorry, something went wrong");
    }
 }


  return (
    <div className='container mt-4'>
      <ParticipateListTable subEventname={subEventname} getWinnerLoading={getWinnerLoading} getParticipationLoading={getParticipationLoading} competed={competed} subEventID={subEventID}  winner={winner} setWinner={setWinner} singleParticipationsList={singleParticipationsList} groupParticipationsList={groupParticipationsList} isGroup={isGroup}/>
    </div>
  )
}


const ParticipateListTable = ({ subEventname ,getWinnerLoading , getParticipationLoading, competed , subEventID , winner , setWinner , singleParticipationsList , groupParticipationsList  , isGroup}) => {
  const [downloadLoding , setDownloadLoding] =useState(false);

  let adminAuth = JSON.parse(localStorage.getItem("adminAuth"));  


  //utils


  const downloadPDF = () => {
    const input = document.getElementById('student-data-list');

    setDownloadLoding(true);
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('participation-StudentList.pdf');
      setDownloadLoding(false);
   toast.success("successfully download")
      })
      .catch((error) => {
       setDownloadLoding(false);
       toast.error("Failed to  download")
      });
  };



  const handleWinner = (id)=>{
    let currWinnerPositon = "";
     if(winner.first == id){
         currWinnerPositon = "first";
     }else  if(winner.secound == id){
      currWinnerPositon = "secound";
    }else  if(winner.third == id){
      currWinnerPositon = "third";
   }

      Swal.fire({
        title: 'Choose  winner positon',
        input:getWinnerLoading ? null : 'radio',
        // html:getWinnerLoading ?null :  "<p>Plz wait for loading data ...</p>",
        html:null,
        // input: 'radio',
        inputValue : 'first',
        inputValue :currWinnerPositon,
        inputOptions:null,
        inputOptions: {
            'first': 'first',
            'secound': 'secound',
            'third': 'third',
        },
        inputValidator: (value) => {

        },
        // preConfirm: (value) => {
        //   return 'truse';
        // },
    }).then((result) => {
        if (result.isConfirmed) {
          let data = winner;
          if(result.value == "first"){
               setWinner({...winner , first : id})
               data = {...winner , first : id}
              // setWinner((value)=>({...value , first : id}))
          }else  if(result.value == "secound"){
            setWinner({...winner , secound : id})
            data = {...winner , secound : id}
            // setWinner((value)=>({...value , secound : id}))
         }else  if(result.value == "third"){
          setWinner({...winner , third : id})
          data = {...winner , third : id}
          // setWinner((value)=>({...value , third : id}))
        }

        handleSetWinnerPosition(id , data);
        }

        

       
    });
  }


  const handleSetWinnerPosition = async (id , data)=>{
       try{
        let result = await fetch(`${URL}/api/winner/addWinner/${subEventID}` , {
          method : "POST",
          body : JSON.stringify(data),
          headers: {
            "content-type": "application/json",
            "Authorization":
              adminAuth.token
          },
        })

        result = await result.json();
       }catch(error){
        toast.error("fail to setWinner")
       }
  }

  

  return (
    <div>
      <Card>
        <CardBody>
          {/* <div className='d-flex justify-content-between'> */}
          <CardTitle tag="h4">Participate user Listing</CardTitle>
           <div className='d-flex'>
           {downloadLoding ?   <div className='btn btn-primary'>downloading...</div> :  <div className='my-btn' onClick={downloadPDF}>export pdf</div>}
            <div className='my-btn ms-3'><CSVLink style={{color:'white'}} data={isGroup == "true" ? groupParticipationsList: singleParticipationsList} filename={"partisiptionList.csv"}>export CSV</CSVLink></div>
           </div>

          <div id="student-data-list">


          {/* {!getParticipationLoading? <ParticiptionListLoading/>:  */}
          <Table className="no-wrap mt-3 align-middle table table-hover" responsive borderless>
          <thead>
            <tr>
              <th>Participate user</th>
              <th>Enrollment No.</th>
              <th>Mobile No.</th>
              <th>Event Name</th>
              <th>Subevent Name</th>
             {competed == "true" &&  <th>winner</th> }
            </tr>
          </thead>
          <tbody>
          {getParticipationLoading ?<tr> <td colSpan={competed == "true" ? 6 : 5}> <ParticiptionListLoading/></td></tr>: 
          singleParticipationsList.length == 0 && groupParticipationsList.length == 0 ?<tr> <td  colSpan={competed == "true" ? 6 : 5} >No any student participation</td></tr> :
         <>
          {groupParticipationsList && isGroup == "true" &&   groupParticipationsList.map((tdata, index) => (
             <>
            <tr key={index}>
              <td colspan="5" className='text-center bg-info ' style={{color : 'white'}}>{`Group name : ${tdata.groupName}`}</td>
             {competed == "true" &&  <td  className='text-center bg-info '><span onClick={()=>handleWinner(tdata._id)}>
                  <LinearScaleIcon/>
                  </span></td> }
            </tr>
            <tr>
           
            </tr>
              {tdata.members.map((member , memberIndex)=>(
                <tr key={index} className="border-top">
                  <td>
                  <div className="d-flex align-items-center p-2">
                    <img
                      src={user5}
                      className="rounded-circle"
                      alt="avatar"
                      width="45"
                      height="45"
                    />
                    <div className="ms-3">
                      <h4 className="mb-0">{tdata.members[memberIndex].name}</h4>
                      <span className="text-muted">{tdata.members[memberIndex].email}</span>
                    </div>
                  </div>
                    </td>
                  
                 <td>{tdata.members[memberIndex].Enrollment}</td>
                 <td>{tdata.members[memberIndex].mobile}</td>
                <td>{tdata.eventName}</td>
                 <td>{tdata.subEventName}</td> 
               </tr>
              ))}
            </>
            
          
))}
            {singleParticipationsList && isGroup == "false"  &&   singleParticipationsList.map((tdata, index) => (
              <tr key={index} className="border-top">
                <td>
                  <div className="d-flex align-items-center p-2">
                    <img
                      src={user5}
                      className="rounded-circle"
                      alt="avatar"
                      width="45"
                      height="45"
                    />
                    <div className="ms-3">
                      <h4 className="mb-0">{tdata.name}</h4>
                      <span className="text-muted">{tdata.email}</span>
                    </div>
                  </div>
                </td>
                <td>{tdata.Enrollment}</td>
                <td>{tdata.mobile}</td>
                <td>{tdata.eventName}</td>
                <td>{tdata.subEventName}</td>
              { competed == "true" &&   <td><span onClick={()=>handleWinner(tdata._id)}>
                  <LinearScaleIcon/>
                  </span></td> }
              </tr>
            ))}
         </>
}
          </tbody>
        </Table>
          </div>
           
        </CardBody>
      </Card>
    </div>
  );
};
