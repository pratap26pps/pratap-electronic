import connectDB from "@/dbconfig/dbconfig";
 
import { NextResponse } from "next/server";
 

connectDB();

export async function GET(){
    try{
      const response = NextResponse.json({
        message:"Logout successfully"
      })

       response.cookies.set("token","",{httpOnly:true,expires:new Date(0)});     
       return response;
 
    }
    catch(error){
        return NextResponse.error.jsn({error:error.message},{status:500});
    }
}