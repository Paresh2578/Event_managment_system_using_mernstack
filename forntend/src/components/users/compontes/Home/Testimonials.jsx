import React from 'react'
//mui
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styled from '@emotion/styled';




export default function Testimonials() {

    
const Imgs = styled('img')(({theme})=>({
    height:410,
    width:'100%',
    "@media (max-width: 480px)":{
        height:200,
        objectFit:'cover'
    }
  }))
  
  const responsive = {
  
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    }
    const testimonialsData = [
      {
          name: 'Paresh Chaudhary',
          detail: 'Innovation distinguishes between a leader and a follower.',
          image: 'https://i.ibb.co/tzVQjpF/paresh.jpg'
      },
      {
          name: 'Mukesh Chaudhary',
          detail: 'Do not follow where the path may lead. Go instead where there is no path and leave a trail.',
          image: 'https://i.ibb.co/Bj5FbMh/mukesh.jpg'
      },
      {
          name: 'Der Nilesh',
          detail: 'The very essence of leadership is that you have to have vision. You can\'t blow an uncertain trumpet.',
          image: 'https://i.ibb.co/ZWhzZKv/nilesh.jpg'
      },
      {
        name: 'Parmar Tejas',
        detail: 'In matters of style, swim with the current; in matters of principle, stand like a rock.',
        image: 'https://i.ibb.co/2YxtR0T/tejas.jpg'
    },
      
  ];
    
  
  
    return (
        <div id='testimonials'>
        {
           <div className='testimonials'>
           <Carousel 
           responsive={responsive}
           swipeable={false}
           draggable={false}
           showDots={false}
           infinite={true}
           autoPlay={true}
           autoPlaySpeed={4000}
           keyBoardControl={true}
           // customTransition="all .5"
           transitionDuration={500}
           >
             {testimonialsData.map((testimonial, index) => (
                        <div key={index} className="container" data-aos="zoom-in">
                            <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <div className="testimonial-item">
                                            <img src={testimonial.image} className="testimonial-img" alt=""/>
                                            
                                            <h3>{testimonial.name}</h3>
                                            <p>
                                                <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                                                {testimonial.detail}
                                                <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-pagination"></div>
                            </div>
                        </div>
                    ))}
         </Carousel>
         </div> 
        }
       </div>
      
    );
  }