"use client"
import * as React from "react"
import { useEffect, useState } from 'react';
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card"
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
    <Carousel
      opts={{
        align: "start",
      }}
      className=""
    >
      <CarouselContent >
        { products.map((item,index) => (
          <CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className=" aspect-square items-center justify-center p-6">
                <div className="" key={item._id}>
                  
                  <img src={item.ProductImage} alt="productimage" />
                  <h1>{item.ProductTitle}</h1>
                  <h1>{item.ProductShortDescription}</h1>
                  <h1>{item.ProductPrice}</h1>
                  <h1>Shipped in 24 Hours From Delhi</h1>
                  <h1>{item.__v}in Stock</h1>
                </div>
            
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
