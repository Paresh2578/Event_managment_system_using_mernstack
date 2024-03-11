/* eslint-disable react/jsx-no-undef */
import React , {useState ,useEffect} from 'react'
// import { FaArrowUp } from "react-icons/fa";

//mui
import { Box , styled} from '@mui/material';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const Main_box = styled(Box)(({theme})=>({
    position : 'fixed',
      bottom:'10px' ,
     left:'10px',
}))

const Top_scorl = () => {
  const [visible , NotVisible] = useState(false);

  const listenTScroll = ()=>{
    const winScrol = document.body.scrollTop || document.documentElement.scrollTop;


    if(winScrol >=100 ){
        NotVisible(true);
    }else{
        NotVisible(false);
    }
  }

  useEffect(()=>{
     window.addEventListener('scroll' , listenTScroll);
     return  ()=> window.addEventListener('scroll' , listenTScroll)
  }, [])

    const top_scorl_function = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
    return (
        <Main_box>
            {visible &&
             (
                <Fab size='small'color='primary'  style={{background:'',  color:'#fff'}} aria-label="add" onClick={top_scorl_function}>
                    <KeyboardArrowUpIcon />
                </Fab>
             )

            }
    </Main_box>
    )
}

export default Top_scorl
