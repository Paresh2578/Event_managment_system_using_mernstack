import React from 'react'
import Skeleton from '@mui/material/Skeleton';

export default function ParticiptionListLoading() {
  return (
    <div>
      {
        Array.from({length : 5}).map((_ ,index)=>(
              <Skeleton className="m-0"  height={100}/>
        ))
      }
    </div>
  )
}
