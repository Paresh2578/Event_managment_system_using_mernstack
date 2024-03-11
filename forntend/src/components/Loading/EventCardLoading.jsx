import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

//mui
import {Box} from '@mui/material'

export default function EventCardLoading() {
  return (
    <>
    {/* <div className='row justify-content-center'>
        {
            Array.from({length : 4}).map((_ , index)=>(
                <div className='col-xl-3 col-md-6 col-sm-12' key={index}>
                <Card/>
                </div>
            ))
        }
       
    </div> */}
    <div className='row justify-content-center'>
    {Array.from({length: 4}).map((_, index) => (
        <div className='col-xl-3 col-md-6 col-sm-12 mt-3' key={index}>
            {/* <div className="ms-5"> */}
                <Card/>
            {/* </div> */}
        </div>
    ))}
</div>

    </>
  );


}

const Card = ()=>{
    return <>
    <Stack spacing={1}>
      <Skeleton variant="rectangular" height={158} />
      <div>
              <Skeleton/>
              <Skeleton  />
      </div>
    </Stack>
    </>
}


