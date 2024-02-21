import React from 'react'

export default function CountSection() {
  return (
    <div>
      <section id='counts' class="counts">
      <div class="container" data-aos="fade-up">

        <div class="row">

          <div class="col-lg-4 col-md-6">
            <div class="count-box">
              <i class="bi bi-emoji-smile"></i>
              <span class="purecounter">Location</span>
              <p>xyz University</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 mt-5 mt-md-0">
            <div class="count-box">
              <i class="bi bi-journal-richtext"></i>
              <span  class="purecounter">24+</span>
              <p>Events </p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 mt-5 mt-lg-0">
            <div class="count-box">
              <i class="bi bi-headset"></i>
              <span  class="purecounter">Expected Participants</span>
              <p>1500+ Students</p>
            </div>
          </div>

        </div>

      </div>
    </section>
    </div>
  )
}
