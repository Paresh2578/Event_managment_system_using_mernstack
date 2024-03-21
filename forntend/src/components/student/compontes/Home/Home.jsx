import React, { useEffect, useState } from "react";
import "../../../../layouts/UserLayout/css/style.css";

//compontes
import Testimonials from "./Testimonials";
import Events from "../Event/Events";
import FAQ from "./FAQ";
import CountSection from "./CountSection";
import CoutactUs from "./CoutactUs";

//utils
import { URL } from "../../../../util/URL";

export default function Home() {
  const [totalEventAndPartisitionLength , setTotalEventAndPartisitionLength] =useState({totalEvents : 0 , totalParticiption : 0});
  const [loading , setLoading] = useState(false);

  useEffect(()=>{     
    getTotalEventAndPartisitionLength();
  },[])

  const getTotalEventAndPartisitionLength = async()=>{
    try{
      setLoading(true);
      let result = await fetch(`${URL}/api/event/getTotalEventAndPartisitionLength`);
      result = await result.json();
      setLoading(false);

      if(result.success){
        setTotalEventAndPartisitionLength(result.data);
      }

    }catch(error){

    }
  }

  return (
    <>
    {/* <Navbar/> */}
      {/* <!-- ======= Hero Section ======= --> */}
      <section id="hero" className="d-flex align-items-center">
        <div className="container" data-aos="zoom-out" data-aos-delay="100">
          <h1>
            Welcome to <span>EventX</span>
          </h1>
          <h2>Connect, Learn, Grow: Register for Our Inspiring Event</h2>
          <div className="d-flex">
            <a href="#event" className="btn-get-started scrollto">
              {" "}
              Register Now!
            </a>
          </div>
        </div>
      </section>
      {/* <!-- End Hero --> */}

      <main id="main">
        <CountSection loading={loading} totalEventAndPartisitionLength={totalEventAndPartisitionLength}/>
        <Events />
        <Testimonials />
        <FAQ />
        <CoutactUs />
      </main>

      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>

      {/* <Footer/> */}
    </>
  );
}