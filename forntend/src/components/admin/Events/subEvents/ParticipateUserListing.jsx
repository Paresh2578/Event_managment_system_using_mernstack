import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user5 from "../../../../assets/images/users/user5.jpg";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ToastContainer, toast } from 'react-toastify';

// import ProjectTables from '../../dashboard/ProjectTable'

//utils
import {URL} from '../../../../util/URL';

export default function ParticipateUserListing() {

  let {subEventID , isGroup} = useParams();

  let adminAuth = JSON.parse(localStorage.getItem("adminAuth"));
   const [singleParticipationsList , setSingleParticipationsList] = useState([]);
   const [groupParticipationsList , setGroupParticipationsList] = useState([]);


   useEffect(()=>{
    isGroup == "true" ? getGroupParticipationsList():
      getSingleParticipationsList();
      
   },[])


   const getSingleParticipationsList =  async ()=>{
      try{
          let result = await fetch(`${URL}/participation/getsingleParticipationsList/${subEventID}` , {
            headers: {
              "content-type": "application/json",
              "Authorization":
                adminAuth.token
            },
          })

          result = await result.json();

          if(result.success){
             setSingleParticipationsList(result.data);
          }else{
            alert(result.message);
          }

          console.log(result);

          // if(result)
      }catch(error){
        alert("get singlePartication error");
        console.log(error);
      }
   }

   const getGroupParticipationsList =  async ()=>{
    try{
        let result = await fetch(`${URL}/participation/getGroupParticipationsList/${subEventID}` , {
          headers: {
            "content-type": "application/json",
            "Authorization":
              adminAuth.token
          },
        })

        result = await result.json();

        if(result.success){
           setGroupParticipationsList(result.data);
        }else{
          alert(result.message);
        }

        console.log(result);

    }catch(error){
      alert("get singlePartication error");
      console.log(error);
    }
 }


  return (
    <div className='container mt-4'>
      <ParticipateListTable singleParticipationsList={singleParticipationsList} groupParticipationsList={groupParticipationsList} isGroup={isGroup}/>
    </div>
  )
}


const ParticipateListTable = ({singleParticipationsList , groupParticipationsList  , isGroup}) => {
  const [downloadLoding , setDownloadLoding] =useState(false);

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
        console.log('Error generating PDF: ', error);
       setDownloadLoding(false);
       toast.error("Failed to  download")
      });
  };


  return (
    <div>
      <Card>
        <CardBody>
          <div className='d-flex justify-content-between'>
          <CardTitle tag="h4">Participate user Listing</CardTitle>
        {downloadLoding ?   <div className='btn btn-primary'>downloading...</div> :  <div className='my-btn' onClick={downloadPDF}>download pdf</div>}
          </div>

          <div id="student-data-list">

          <Table className="no-wrap mt-3 align-middle table table-hover" responsive borderless>
            <thead>
              <tr>
                <th>Participate user</th>
                <th>Enrollment No.</th>
                <th>Mobile No.</th>
                <th>Event Name</th>
                <th>Subevent Name</th>
              </tr>
            </thead>
            <tbody>
            {groupParticipationsList && isGroup &&   groupParticipationsList.map((tdata, index) => (
              <>
              <tr key={index}>
                <td colspan="5" className='text-center bg-info ' style={{color : 'white'}}>{`Group name :: ${tdata.groupName}`}</td>
              </tr>
              <tr>
              {/* {tdata.members[0].Enrollment} */}
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
              {singleParticipationsList  &&   singleParticipationsList.map((tdata, index) => (
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
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
