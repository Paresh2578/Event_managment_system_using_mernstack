import React ,{useEffect , useState}  from 'react'

//mui
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {Box , down}  from '@mui/material'
import styled from '@emotion/styled';
// import { makeStyles } from '@mui/styles';



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
  

const  Carousel_Com = ()=>{
  const [product, setProduct] = useState([]);


  useEffect(()=>{
    get_Carousel_product();
},[])

const URL = "https://codershopbackend-838z.onrender.com"

const get_Carousel_product = async()=>{
    try{
          let result = await fetch(`${URL}/get-carousel_product`);
          result =await result.json();
          setProduct(result);
    }catch(error){
    console.log(error.massage);
    }
}


    return(
       <div >
        {
           <Box id="home" style={{marginTop:'5vh'}}>
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
             {
               product.map((data)=>(
                   <Box key={data._id}>
                       <Imgs src={data.bigImg}  style={{heigth:'' , width:'100%'}}></Imgs>
                   </Box>
               ))
             }
         </Carousel>
         </Box> 
        }
       </div>
    )
}


export default  Carousel_Com;