import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

//mui
import {Box} from '@mui/material'

export default function EventCardLoading() {
  return (
    <>
    <div className='row'>
        {
            Array.from({length : 4}).map((_ , index)=>(
                <div className='col-xl-3 col-md-6 col-sm-12' key={index}>
                <Card/>
                </div>
            ))
        }
        <div className=''></div>
    </div>
    </>
  );


}

const Card = ()=>{
    return <>
    <Stack spacing={1} >
      <Skeleton variant="rectangular" width={210} height={118} />
      <Box>
              <Skeleton />
              <Skeleton  />
            </Box>
    </Stack>
    </>
}


