import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const page = () => {

  // if (user.role === "seller") {
  //   // Show upload product button
  // } else {
  //   // Hide upload product button
  // }

  return (
    <div className='flex justify-center text-4xl mt-44'>
    <h1>your dashboard</h1>
    <Link href="/upload">
    <Button>Upload Product</Button>
    </Link>
    </div>
  )
}

export default page
