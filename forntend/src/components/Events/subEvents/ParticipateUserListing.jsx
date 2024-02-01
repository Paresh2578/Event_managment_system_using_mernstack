import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';

import ProjectTables from '../../dashboard/ProjectTable'

//utils
import {URL} from '../../../util/URL';

export default function ParticipateUserListing() {

  let {subEventID} = useParams();

  let adminAuth = JSON.parse(localStorage.getItem("adminAuth"));
   const [singleParticipationsList , setSingleParticipationsList] = useState([]);


   useEffect(()=>{
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


  return (
    <div>
      <ProjectTables singleParticipationsList={singleParticipationsList}/>
    </div>
  )
}
