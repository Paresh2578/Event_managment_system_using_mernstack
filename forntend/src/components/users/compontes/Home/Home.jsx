import React from "react";
import "../css/style.css";

//compontes
import Testimonials from "./Testimonials";
import Events from "../Event/Events";
import FAQ from "./FAQ";
import CountSection from "./CountSection";
import CoutactUs from "./CoutactUs";
import Navbar from "../../../../layouts/UserLayout/Navbar";
import Footer from "../../../../layouts/UserLayout/Footer";

export default function Home() {
  return (
    <>
    <Navbar/>
      {/* <!-- ======= Hero Section ======= --> */}
      <section id="hero" class="d-flex align-items-center">
        <div class="container" data-aos="zoom-out" data-aos-delay="100">
          <h1>
            Welcome to <span>EventX</span>
          </h1>
          <h2>Connect, Learn, Grow: Register for Our Inspiring Event</h2>
          <div class="d-flex">
            <a href="#event" class="btn-get-started scrollto">
              {" "}
              Register Now!
            </a>
          </div>
        </div>
      </section>
      {/* <!-- End Hero --> */}

      <main id="main">
        <CountSection />
        <Events />
        <Testimonials />
        <FAQ />
        <CoutactUs />
      </main>

      <a
        href="#"
        class="back-to-top d-flex align-items-center justify-content-center"
      >
        <i class="bi bi-arrow-up-short"></i>
      </a>

      <Footer/>
    </>
  );
}