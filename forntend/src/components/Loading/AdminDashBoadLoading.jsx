import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

//mui
import {Box} from '@mui/material'

export default function AdminDashBoadLoading() {
  return (
    <div className='row justify-content-center m-4'>
    {Array.from({length: 4}).map((_, index) => (
        <div className='col-xl-3 col-md-6 col-sm-12 mt-3 rounded' key={index}>
            {/* <div className="ms-5"> */}
                <Card/>
            {/* </div> */}
        </div>
    ))}
</div>
  )
}

const Card = ()=>{
    return <>
    <Stack spacing={1}>
      <Skeleton variant="rectangular" className="rounded" height={150} />
    </Stack>
    </>
}
