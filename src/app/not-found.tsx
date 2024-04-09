import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='h-screen flex items-center justify-center flex-col text-2xl gap-3'>
      <h1 className='font-semibold'>404 | Route not defined</h1>
       <Link href={"/"} className='text-xl underline'>Go to the home page</Link>
    </div>
  )
}

export default NotFound