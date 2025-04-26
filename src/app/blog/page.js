"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {

    const [News,setNews] = useState([]);
    const [loading,setloading] = useState(false);

    const newsreport = async()=>{
        setloading(true);
        try{
          const response = await axios.get("/api/blog");
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
    useEffect(()=>{
      newsreport()
    },[])

  return (
    <div className='mt-36'>
        
      <h2 className="text-center  text-2xl font-bold mt-12">Latest News</h2>
      {
        loading ? <div className='loader ml-[50%] mt-3'></div>:

        <div className="grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 mt-6">
        {News.map((item) => (
          <div key={item?._id} className="p-2 rounded-lg shadow-md">
            <img
            src={item?.image}
              alt="news"
              className="rounded-md"
            />
            <p className="font-semibold">{item?.date}</p>
          

            <p className="text-gray-500 mt-2">{item?.heading}</p>
            <p className="text-gray-600">{item?.description}</p>
            <p className="text-gray-500 text-sm">Published by {item?.Author}</p>
          </div>
        ))}
      </div>
      }
      
    </div>
  )
}

export default page
