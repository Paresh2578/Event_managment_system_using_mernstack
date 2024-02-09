
import './Home.css'

import about from '../../assets/user/about.jpg'

//compontes
import Navbar from './navbar/Navbar'
import Events from './Event/Events'

export default function Home(){

  return (
    <div class="user-body ">

{/* <!-- header section starts  --> */}
    <Navbar/>

     {/* <!-- home section starts  --> */}
    <section class="home user-section" id="home">
      <div class="content">
        <h3>
          where your ideas take off
          <span> kanasu events </span>
        </h3>
        <a href="#" class="btn">get quote</a>
      </div>
    </section>

    {/* <!-- about section starts  --> */}
    <section class="about user-section" id="about">
      <h1 class="heading"><span>about</span> us</h1>

      <div class="user-row">
        <div class="image">
          <img src={about} alt="" />
        </div>

        <div class="content">
          <h3>your occasion deserves our careful planning</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            labore fugiat ut esse perferendis perspiciatis provident dolores
            fuga in facilis culpa possimus, quia praesentium itaque, sapiente
            quasi harum rem asperiores.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            vero expedita incidunt provident quibusdam aut odit, numquam
            nesciunt similique nisi.
          </p>
          <a href="#" class="btn">reach us</a>
        </div>
      </div>
    </section>

    {/* <!-- gallery section starts  --> */}
    <Events/>

    {/* <!-- contact section starts  --> */}
    <section class="contact mt-5" id="contact">
      <h1 class="heading"><span>contact</span> us</h1>

      <form action="">
        <div class="inputBox">
          <input type="text" placeholder="name" />
          <input type="email" placeholder="email" />
        </div>
        <div class="inputBox">
          <input type="tel" placeholder="number" />
          <input type="text" placeholder="subject" />
        </div>
        <textarea
          name=""
          placeholder="message"
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <input type="submit" value="send message" class="btn" />
      </form>
    </section>

    {/* <!-- footer section starts  --> */}
    <section class="footer ">
      <div class="box-container container">
        <div class="box">
          <h3>branches</h3>
          <a href="#"> <i class="fas fa-map-marker-alt"></i> bangalore </a>
          <a href="#"> <i class="fas fa-map-marker-alt"></i> hyderabad </a>
          <a href="#"> <i class="fas fa-map-marker-alt"></i> delhi </a>
          <a href="#"> <i class="fas fa-map-marker-alt"></i> kolkata </a>
          <a href="#"> <i class="fas fa-map-marker-alt"></i> chennai </a>
        </div>

        <div class="box">
          <h3>quick links</h3>
          <a href="#"> <i class="fas fa-arrow-right"></i> home </a>
          <a href="#"> <i class="fas fa-arrow-right"></i> service </a>
          <a href="#"> <i class="fas fa-arrow-right"></i> about </a>
          <a href="#"> <i class="fas fa-arrow-right"></i> gallery </a>
          <a href="#"> <i class="fas fa-arrow-right"></i> price </a>
          <a href="#"> <i class="fas fa-arrow-right"></i> reivew </a>
          <a href="#"> <i class="fas fa-arrow-right"></i> contact </a>
        </div>

        <div class="box">
          <h3>contact info</h3>
          <a href="#"> <i class="fas fa-phone"></i> +123-456-7890 </a>
          <a href="#"> <i class="fas fa-phone"></i> +123-456-7890 </a>
          <a href="#"> <i class="fas fa-envelope"></i> kanasu@gmail.com </a>
          <a href="#"> <i class="fas fa-envelope"></i> kanasuind@gmail.com </a>
          <a href="#">
            <i class="fas fa-map-marker-alt"></i> bangalore, india - 560054
          </a>
        </div>

        <div class="box">
          <h3>follow us</h3>
          <a href="#"> <i class="fab fa-facebook-f"></i> facebook </a>
          <a href="#"> <i class="fab fa-twitter"></i> twitter </a>
          <a href="#"> <i class="fab fa-instagram"></i> instagram </a>
          <a href="#"> <i class="fab fa-linkedin-in"></i> linkedin </a>
        </div>
      </div>

      <div class="credit">
        created by <span>Tivotal</span> | all rights reserved
      </div>
    </section>


    </div>
  )
}







// import React from 'react'

// //componets
// import Navbar from './navbar/Navbar';
// import Carousel_Com from './Carousel_Com';
// import Events from './Event/Events'

// export default function Home() {
//   return (
//     <div>
//       <Navbar/>
//       <Carousel_Com/>
//       <Events/>
//     </div>
//   )
// }
