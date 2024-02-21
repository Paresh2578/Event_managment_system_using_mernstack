import React from 'react'

export default function Footer() {
  return (
    <div>
      <footer id="footer">
        <div class="footer-top">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-md-6 footer-links">
                <div class="social-links ">
                  <a href="#" class="twitter">
                    <i class="bx bxl-twitter"></i>
                  </a>
                  <a href="#" class="facebook">
                    <i class="bx bxl-facebook"></i>
                  </a>
                  <a href="#" class="instagram">
                    <i class="bx bxl-instagram"></i>
                  </a>
                  <a href="#" class="linkedin">
                    <i class="bx bxl-linkedin"></i>
                  </a>
                </div>
              </div>
              <div class="col-lg-6 container">
                <div class="copyright">
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
