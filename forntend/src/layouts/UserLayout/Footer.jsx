import React from 'react'

export default function Footer() {
  return (
    <div>
      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 footer-links">
                <div className="social-links ">
                  <a href="#" className="twitter">
                    <i className="bx bxl-twitter"></i>
                  </a>
                  <a href="#" className="facebook">
                    <i className="bx bxl-facebook"></i>
                  </a>
                  <a href="#" className="instagram">
                    <i className="bx bxl-instagram"></i>
                  </a>
                  <a href="#" className="linkedin">
                    <i className="bx bxl-linkedin"></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-6 container">
                <div className="copyright">
                  &copy; Copyright{" "}
                  <strong>
                    <span>EventX</span>
                  </strong>
                  . All Rights Reserved
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
