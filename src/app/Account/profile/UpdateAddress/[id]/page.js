"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation';
const paje = () => {
    const router = useRouter();
    const [prevadd,setprevadd]= useState({
      name: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      country: '',
      pincode: ''
    });
    const { id } = useParams(); 

    console.log("id", id);
    const  fetchdata =async()=>{
   
        try {
            const res = await axios.get(`/api/users/address/${id}`);
            
            if (res.data) { 
              setprevadd(res.data.address)
            console.log("Fetch address  in updated time:", res.data);

            } else {
              toast.error("Address not found");
            }
          } catch (error) {
            console.error("Fetch address error:", error);
          }
     }
     useEffect(()=>{
      if(id)  fetchdata();
     },[id])

const handleSubmit =async(e)=>{
  e.preventDefault();
    try {
         const res = await axios.put(`/api/users/address/${id}`, prevadd);
        const data = res.data;
        
        if (data.success) {
            toast.success("Address  update successfull");
            router.push("/Account/profile/AddresesManagement");
        } else {
          toast.error("Address not found");
        }
      } catch (error) {
        console.error("Fetch address error:", error);
        toast.error(error);
      }
} 
const handleChange = (e) => {
  setprevadd({ ...prevadd, [e.target.name]: e.target.value });
};

  return (
    <div>
       <div className="max-w-xl mx-auto mt-36 px-4 py-6 rounded-xl shadow">
       
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Full Name"
              value={prevadd?.name}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={prevadd?.phone}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="street"
              placeholder="Street Address"
              value={prevadd?.street}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="city"
              placeholder="City"
              value={prevadd?.city}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="state"
              placeholder="State"
              value={prevadd?.state}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="country"
              placeholder="country"
              value={prevadd?.country}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="pincode"
              placeholder="Pincode"
              value={prevadd?.pincode}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Udate Address
            </button>
          </form>
          <button
            onClick={() => router.push("/Account/profile/AddresesManagement")}
            className="text-blue-600 hover:underline"
          >
            Cancil
          </button>
        </div>
    </div>
  )
}

export default paje
