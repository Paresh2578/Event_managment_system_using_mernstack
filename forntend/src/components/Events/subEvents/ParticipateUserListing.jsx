import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user5 from "../../../assets/images/users/user5.jpg";

import ProjectTables from '../../dashboard/ProjectTable'

//utils
import {URL} from '../../../util/URL';

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
    <div>
      <ParticipateListTable singleParticipationsList={singleParticipationsList} groupParticipationsList={groupParticipationsList} isGroup={isGroup}/>
    </div>
  )
}


const ParticipateListTable = ({singleParticipationsList , groupParticipationsList  , isGroup}) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Participate user Listing</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
          {/* Upcoming Events */}
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle table" responsive borderless>
            <thead>
              <tr>
                <th>Participate user</th>
                <th>Enrollment No.</th>

                <th>Event Name</th>
                <th>Subevent Name</th>
              </tr>
            </thead>
            <tbody>
            {groupParticipationsList && isGroup &&   groupParticipationsList.map((tdata, index) => (
              <>
              <tr key={index}>
                <td colspan="4" className='text-center bg-info text-light'>{tdata.groupName}</td>
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
                        <h6 className="mb-0">{tdata.members[memberIndex].name}</h6>
                        <span className="text-muted">{tdata.members[memberIndex].email}</span>
                      </div>
                    </div>
                      </td>
                    
                   <td>{tdata.members[memberIndex].Enrollment}</td>
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
                        <h6 className="mb-0">{tdata.name}</h6>
                        <span className="text-muted">{tdata.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.Enrollment}</td>
                  <td>{tdata.eventName}</td>
                  <td>{tdata.subEventName}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};
