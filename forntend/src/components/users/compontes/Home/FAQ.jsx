import React from 'react'

export default function FAQ() {

    let faq = [
        {q : "What is EventX?" , ans : " Darshan University-Rajkot used to organise a State Level Technical Symposium under the name 'EventX'. EventX is a series of technical and non-technical competitions and events covering all areas of engineering, science, and management. The attraction of this event is that it covers many technical and entrepreneurship events, where students from various institutes come up with their innovative ideas, take part, win and are motivated by rewards"},
        {q : "What is The Registration Charge To Take Part In Any Event Under EventX? " , ans : " There are no registration charges for any technical event."},
        {q : "" , ans : ""},
        {q : "" , ans : ""},
        {q : "" , ans : ""},
        {q : "" , ans : ""},
        {q : "" , ans : ""},
        {q : "" , ans : ""},
        {q : "" , ans : ""},
        {q : "" , ans : ""},
        {q : "" , ans : ""},
        {q : "" , ans : ""},
        {q : "" , ans : ""},
    ]


  return (
    <div>
      <section id="faq" className="faq section-bg">
      <div className="container" data-aos="fade-up">

        <div className="section-title">
          <h2>F.A.Q</h2>
          <h3>Frequently Asked <span>Questions</span></h3>
          {/* <p>Ut possimus qui ut temporibus culpa velit eveniet modi omnis est adipisci expedita at voluptas atque vitae autem.</p> --> */}
        </div>

        <div className="row justify-content-center">
          <div className="col-xl-10">
            <ul className="faq-list">

              <li>
                <div data-bs-toggle="collapse" className="collapsed question" href="#faq1">What is EventX? <i className="bi bi-chevron-down icon-show"></i><i className="bi bi-chevron-up icon-close"></i></div>
                <div id="faq1" className="collapse" data-bs-parent=".faq-list">
                  <p>
                    Darshan University-Rajkot used to organise a State Level Technical Symposium under the name "EventX". EventX is a series of technical and non-technical competitions and events covering all areas of engineering, science, and management. The attraction of this event is that it covers many technical and entrepreneurship events, where students from various institutes come up with their innovative ideas, take part, win and are motivated by rewards.</p>
                </div>
              </li>

              <li>
                <div data-bs-toggle="collapse" href="#faq2" className="collapsed question">What is The Registration Charge To Take Part In Any Event Under EventX? <i className="bi bi-chevron-down icon-show"></i><i className="bi bi-chevron-up icon-close"></i></div>
                <div id="faq2" className="collapse" data-bs-parent=".faq-list">
                  <p>
                    There are no registration charges for any technical event. </p>
                </div>
              </li>

              <li>
                <div data-bs-toggle="collapse" href="#faq3" className="collapsed question">Can I Take  Part In More Than One Events?<i className="bi bi-chevron-down icon-show"></i><i className="bi bi-chevron-up icon-close"></i></div>
                <div id="faq3" className="collapse" data-bs-parent=".faq-list">
                  <p>
                  Each participant at frolic can take part in a maximum of 2 technical events and all other non-technical events. If timing conflicts arise for two events, the participant is solely responsible for making the decision based on his/her priority and interest; no excuses will be entertained for the conduct of event rounds. </p>
                </div>
              </li>

              <li>
                <div data-bs-toggle="collapse" href="#faq4" className="collapsed question">Will I Get Certificate ?<i className="bi bi-chevron-down icon-show"></i><i className="bi bi-chevron-up icon-close"></i></div>
                <div id="faq4" className="collapse" data-bs-parent=".faq-list">
                  <p>
                   All participants who successfully take part in any technical events and satisfy eligibility criteria (if any) are eligible for a participation certificate. Note that the winner will get a rank certificate in a hard copy and not a participation certificate. Also refer individual event rules.
                   </p>
                </div>
              </li>

              <li>
                <div data-bs-toggle="collapse" href="#faq5" className="collapsed question">Is Food Facility Available ? <i className="bi bi-chevron-down icon-show"></i><i className="bi bi-chevron-up icon-close"></i></div>
                <div id="faq5" className="collapse" data-bs-parent=".faq-list">
                  <p>
                  No free food facility is available, but participants can avail their lunch/breakfast from the canteen on a chargeable basis.  </p>
                </div>
              </li>

            </ul>
          </div>
        </div>

      </div>
    </section>
    </div>
  )
}
