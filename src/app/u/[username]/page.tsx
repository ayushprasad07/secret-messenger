import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const params = useParams();
  
  return (
    <div className='mt-20'>
      Message Page 
    </div>
  )
}

export default page
