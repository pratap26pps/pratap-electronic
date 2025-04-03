import * as React from "react"
import { useEffect, useState } from 'react';
import axios from "axios";

import { Card, CardContent } from "@/components/ui/Newcard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselSize() {

   const [products,setProducts]=useState([]);
  
     const getproductdetails=async()=>{
       const result = await axios('/api/product',{method:"GET"});
       console.log("result",result.data)
       if(result){
          setProducts(result.data.products)
       }   }
     useEffect(() => {
      getproductdetails();
     }, [])

  return (
    <Carousel className="w-full z-20 ml-40  max-w-sm">
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
  )
}







 