"use client"
import React,{useState} from 'react'
import Footer from '@/components/Footer'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
const page = () => {

      const [formData, setFormData] = useState({ ordernumber: "", email: ""});
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const orderhandler = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
      };
  return (
    <div className='mt-40'>
        <div className='flex flex-col justify-center items-center gap-y-5'>
           <h1 className='text-5xl'>Track Your Order</h1>
           <form onSubmit={orderhandler} >
             <Input name="ordernumber" className='my-7 scale-150' value={formData.ordernumber} onChange={handleChange} placeholder="Order Number" required />
              <Input name="email" className=' scale-150' value={formData.email} onChange={handleChange} placeholder="Email" required />
            <Button className='mx-16 scale-125 mt-8'>Track</Button>
            <p>powered by ------</p>
           </form>
        </div>
        <div className='mt-36'>
        <Footer/>

        </div>
    </div>
  )
}

export default page
