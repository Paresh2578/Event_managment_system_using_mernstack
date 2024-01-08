import React , {useState} from "react";
import { useNavigate } from "react-router-dom";

import './Events.css'

//mui
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import img2 from "./assets/client-3.jpg"


export default function Events() {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [category , setCategory] = useState(["Civil" , "Computer" , "Electrical" , "Mechanical" , "Management" , "Microbiology" , "General"]);
  // const [category , setCategory] = useState(["completed" ," uncompleted"]);
  const [activeFillter , setActiveFillter]= useState(-1);


  const eventFillter = (itemData , index) =>{
    // const filterData = GalleryData.filter((item)=> item == itemData);
    // setData(filterData);
      setActiveFillter(index);
  }

  return (
    <div id="Events" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Events</h2>
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p> */}
        </div>
        <div className="row">
            <div className="col mb-3"><button className={activeFillter != -1 ? 'filter-btn' : 'filter-btn-active'} onClick={()=>{eventFillter("All" , -1)}}>All</button></div>
            {
              category.map((item , index)=> <div  className="col mb-3 "><button className={activeFillter != index ? 'filter-btn' : 'filter-btn-active'} onClick={()=>{eventFillter(item , index)}}>{item}</button></div>)
            }
          </div>
        <div className="row">
          <div className="col-md-3 col-sm-6 trending__card p-0" onClick={()=>navigate('subsevent/2')}>
          <div>
              <CardMedia
                component="img"
                className={`image-container ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                height="250"
                image={img2}
                alt="Paella dish"
              />
              <CardContent>
                <p style={{textAlign : 'left'}}>
                  <CalendarMonthIcon htmlColor="#6372ff"/> <span>January 21, 2021</span>
                </p>
                <p>
                  App-A-Thon
                </p>
                {/* <Typography variant="body2" color="text.secondary">
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests. Add 1 cup of frozen peas
                  along with the mussels, if you like.
                </Typography> */}
              </CardContent>
              
            </div>
          </div>
          <div className="col-md-3 col-sm-6 team" onClick={()=>navigate('event/2')}>
          </div>
        </div>
      </div>
    </div>
  );
}
