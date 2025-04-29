"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
import Footer from '@/components/Footer';
const page = () => {
    const params = useParams();
    const { id } = params;
    const [News,setNews] = useState();
    const [loading,setloading] = useState(false);

    const newsreport = async()=>{
        setloading(true);
        try{
          const response = await axios.get(`/api/blog/${id}`);
          if(response){
            setNews(response.data);
          }
        }catch(error){
          toast.error(error.message);
          console.log("error during fetch news",error.message)
        }finally{
        setloading(false);
        }
    }
    useEffect(() => {
        if (id) newsreport();
      }, [id]);

  return (
    <div className='mt-36'>
        
      <h2 className="text-center  text-2xl font-bold mt-12">Latest News</h2>
      {
        loading ? <div className='loader ml-[50%] mt-3'></div>:

       
          <div  className="p-2 rounded-lg flex flex-col justify-center items-center shadow-md">
            
            <img
            src={News?.image}
              alt="news"
              height={245}
              width={345}
              className="rounded-md"
            />
            <p className="font-semibold">{News?.date}</p>
            <p className="text-gray-500 mt-2">{News?.heading}</p>

            <p className="text-gray-600">{News?.description}</p>
      <h2 className="text-center  text-2xl font-bold mt-12">Conclusion</h2>

            <p className="text-gray-600 w-3/4">Conclusion{News?.Conclusion}</p>
            <h2 className="text-center  text-2xl font-bold mt-12">Faqs</h2>

            <p className="text-gray-600 w-3/4">{News?.Faqs}</p>

            <p className="text-gray-500 text-sm">Published by {News?.Author}</p>
          </div>
        
       
      }
      <div className='mt-7'>
      <Footer/>

      </div>
      
    </div>
  )
}

export default page
