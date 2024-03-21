import React, { useEffect, useState } from 'react'
import { Col, Row } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';


//compontes
// import ProjectTables from './ProjectTable'

//mui
import { EventSeat, AccessAlarm } from "@mui/icons-material";

//utils
import {URL} from '../../../util/URL';
import AdminDashBoadLoading from '../../Loading/AdminDashBoadLoading';

export default function Dashboard() {
    let adminAuth = JSON.parse(localStorage.getItem("adminAuth"));
 const [dashboardData , setDashboardData] = useState({
    totalCompetedEvent: 0,
    upCompingEvent: 0,
    totalParticiptionStudent: 0,
    avalibleSteats: 0,
    recentParticiptionStudentList : []
  });
  const [loading , setLoading] = useState(false);

 useEffect(()=>{
   getDashBoardData();
 },[])

 const getDashBoardData =async ()=>{
    setLoading(true);
    try{

        let result = await fetch(`${URL}/api/event/getDashbordInfo` , {
            headers: {
                "content-type": "application/json",
                "Authorization":
                  adminAuth.token
              },
        });
        result = await result.json();
        setLoading(false);
        if(result.success){
              setDashboardData(result.data);
        }else{
            toast.error("something worng ");
        }

    }catch(error){
        // toast.error("something worng");
        toast.error("something worng");
        setLoading(false);
    }
 }



  return (
    <>
     {/* <!-- ======================= Cards ================== --> */}
    {!loading ?  
    <div className="cardBox">
                <div className="card">
                    <div>
                        <div className="numbers">{dashboardData.totalCompetedEvent}</div>
                        <div className="cardName">Total competed events</div>
                    </div>

                    <div className="iconBx fs-1">
                        {/* <ion-icon name="eye-outline"></ion-icon> */}
                        <i className='bi-check-circle'></i>
                    </div>
                </div>

                <div className="card">
                    <div>
                        <div className="numbers">{dashboardData.upCompingEvent}</div>
                        <div className="cardName">Upcoming events</div>
                    </div>

                    <div className="iconBx fs-1">
                        {/* <ion-icon name="eye-outline"></ion-icon> */}
                        <i className='bi-calendar-event'></i>
                    </div>
                </div>

                <div className="card">
                    <div>
                        <div className="numbers">{dashboardData.totalParticiptionStudent}</div>
                        <div className="cardName">Total participation student</div>
                    </div>

                    <div className="iconBx fs-1">
                        <ion-icon name="people-outline"></ion-icon>
                    </div>
                </div>

                <div className="card">
                    <div>
                        <div className="numbers">{dashboardData.avalibleSteats}</div>
                        <div className="cardName">Available Steats</div>
                    </div>

                    <div className="iconBx fs-1">
                        {/* <ion-icon name="chatbubbles-outline"></ion-icon> */}
                        <EventSeat fontSize={'large'}/>
                    </div>
                </div>
            </div> : <AdminDashBoadLoading/>
}

            {/* <!-- ================ Order Details List ================= --> */}
            <div className="details">
                <div className="recentOrders">
                    <div className="cardHeader">
                        <h2>Recent participation</h2>
                    </div>

                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Enrollment</td>
                                <td>EventName</td>
                                <td>Subevent Name</td>
                            </tr>
                        </thead>

                        <tbody>
                            {
                            dashboardData.recentParticiptionStudentList && dashboardData.recentParticiptionStudentList.map((student)=>(
                                <tr>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.Enrollment}</td>
                                <td>{student.eventName}</td>
                                <td>{student.subEventName}</td>
                            </tr>
                            ))    
                            

}

                         
                        </tbody>
                    </table>
                </div>

            </div>
    </>
    // <div>
    //   {/***Top Cards***/}

    //   {/***Sales & Feed***/}
    //   <Row>
    //     <Col>
    //       {/* <SalesChart /> */}
    //     </Col>
    //   </Row>
    //   {/***Table ***/}
    //   <Row>
    //     <Col lg="12">
    //       {/* <ProjectTables /> */}
    //     </Col>
    //   </Row>
    // </div>
  )
}
