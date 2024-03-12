import React from 'react'

export default function CountSection({totalEventAndPartisitionLength}) {
  return (
    <div>
      <section id='counts' class="counts">
      <div class="container" data-aos="fade-up">

        <div class="row">

          <div class="col-lg-4 col-md-6">
            <div class="count-box">
              {/* <i class="bi bi-emoji-smile"></i> */}
              <i class="bx bx-map"></i>
              <span class="purecounter">Location</span>
              <p>xyz University</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 mt-5 mt-md-0">
            <div class="count-box">
              <i class="bi bi-journal-richtext"></i>
              <span  class="purecounter">{totalEventAndPartisitionLength.totalEvents}+</span>
              <p>Events </p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 mt-5 mt-lg-0">
            <div class="count-box">
              {/* <i class="bi bi-headset"></i> */}
              <i class="bx bx-group"></i>
              {/* <span  class="purecounter">Expected Participants</span> */}
              <span  class="purecounter"> {totalEventAndPartisitionLength.totalParticiption}+</span>
              <p  class=""> Participants</p>
            </div>
          </div>

        </div>

      </div>
    </section>
    </div>
  )
}
