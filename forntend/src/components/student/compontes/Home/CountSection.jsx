import React from 'react'

//mui
import Skeleton from '@mui/material/Skeleton';

export default function CountSection({totalEventAndPartisitionLength , loading}) {
  return (
    <div>
      <section id='counts' className="counts">
      <div className="container" data-aos="fade-up">

        <div className="row">


          {loading ? <>
            <div  className="col-lg-4 col-md-6 mt-5 mt-md-0">
            <Skeleton height={250}/>
          </div>
          <div className="col-lg-4 col-md-6 mt-5 mt-md-0">
            <Skeleton  height={250}/>
          </div>
          <div className="col-lg-4 col-md-6 mt-5 mt-md-0">
            <Skeleton  height={250}/>
          </div>
          </> : 
          <>
          <div className="col-lg-4 col-md-6">
            <div className="count-box">
              {/* <i className="bi bi-emoji-smile"></i> */}
              <i className="bx bx-map"></i>
              <span className="purecounter">Location</span>
              <p>xyz University</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mt-5 mt-md-0">
            <div className="count-box">
              <i className="bi bi-journal-richtext"></i>
              <span  className="purecounter">{totalEventAndPartisitionLength.totalEvents}+</span>
              <p>Events </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mt-5 mt-lg-0">
            <div className="count-box">
              {/* <i className="bi bi-headset"></i> */}
              <i className="bx bx-group"></i>
              {/* <span  className="purecounter">Expected Participants</span> */}
              <span  className="purecounter"> {totalEventAndPartisitionLength.totalParticiption}+</span>
              <p  className=""> Participants</p>
            </div>
          </div>
          </>
          }

          
        

         

        </div>

      </div>
    </section>
    </div>
  )
}
