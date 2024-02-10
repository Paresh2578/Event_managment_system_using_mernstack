import React, { useEffect, useState } from 'react'
import { Col, Row } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';


//compontes
// import ProjectTables from './ProjectTable'

//utils
import {URL} from '../../../util/URL';

export default function Dashboard() {
    let adminAuth = JSON.parse(localStorage.getItem("adminAuth"));
 const [dashboardData , setDashboardData] = useState({
    totalCompetedEvent: 0,
    upCompingEvent: 0,
    totalParticiptionStudent: 0,
    avalibleSteats: 0,
    recentParticiptionStudentList : []
  });

 useEffect(()=>{
   getDashBoardData();
 },[])

 const getDashBoardData =async ()=>{
    try{

        let result = await fetch(`${URL}/event/getDashbordInfo` , {
            headers: {
                "content-type": "application/json",
                "Authorization":
                  adminAuth.token
              },
        });
        result = await result.json();


        if(result.success){
              setDashboardData(result.data);
        }else{
            toast.error("something worng");
        }

    }catch(error){
        toast.error("something worng");
    }
 }



  return (
    <>
     {/* <!-- ======================= Cards ================== --> */}
     <div class="cardBox">
                <div class="card">
                    <div>
                        <div class="numbers">{dashboardData.totalCompetedEvent}</div>
                        <div class="cardName">Total competed events</div>
                    </div>

                    <div class="iconBx">
                        <ion-icon name="eye-outline"></ion-icon>
                    </div>
                </div>

                <div class="card">
                    <div>
                        <div class="numbers">{dashboardData.upCompingEvent}</div>
                        <div class="cardName">Upcoming events</div>
                    </div>

                    <div class="iconBx">
                        <ion-icon name="eye-outline"></ion-icon>
                    </div>
                </div>

                <div class="card">
                    <div>
                        <div class="numbers">{dashboardData.totalParticiptionStudent}</div>
                        <div class="cardName">Total participation student</div>
                    </div>

                    <div class="iconBx">
                        <ion-icon name="cart-outline"></ion-icon>
                    </div>
                </div>

                <div class="card">
                    <div>
                        <div class="numbers">{dashboardData.avalibleSteats}</div>
                        <div class="cardName">Available Steats</div>
                    </div>

                    <div class="iconBx">
                        <ion-icon name="chatbubbles-outline"></ion-icon>
                    </div>
                </div>
            </div>

            {/* <!-- ================ Order Details List ================= --> */}
            <div class="details">
                <div class="recentOrders">
                    <div class="cardHeader">
                        <h2>Recent participation</h2>
                    </div>

                    <table>
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
                                {/* <td>Delivered</td> */}
                            </tr>
                            ))    
                            

}

                            {/* <tr>
                                <td>Dell Laptop</td>
                                <td>$110</td>
                                <td>Due</td>
                                <td><span class="status pending">Pending</span></td>
                            </tr>

                            <tr>
                                <td>Apple Watch</td>
                                <td>$1200</td>
                                <td>Paid</td>
                                <td><span class="status return">Return</span></td>
                            </tr>

                            <tr>
                                <td>Addidas Shoes</td>
                                <td>$620</td>
                                <td>Due</td>
                                <td><span class="status inProgress">In Progress</span></td>
                            </tr>

                            <tr>
                                <td>Star Refrigerator</td>
                                <td>$1200</td>
                                <td>Paid</td>
                                <td><span class="status delivered">Delivered</span></td>
                            </tr>

                            <tr>
                                <td>Dell Laptop</td>
                                <td>$110</td>
                                <td>Due</td>
                                <td><span class="status pending">Pending</span></td>
                            </tr>

                            <tr>
                                <td>Apple Watch</td>
                                <td>$1200</td>
                                <td>Paid</td>
                                <td><span class="status return">Return</span></td>
                            </tr>

                            <tr>
                                <td>Addidas Shoes</td>
                                <td>$620</td>
                                <td>Due</td>
                                <td><span class="status inProgress">In Progress</span></td>
                            </tr> */}
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
