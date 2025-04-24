import { NextResponse } from "next/server";
import ContactModel from "@/models/Contact";
import connectDB from "@/dbconfig/dbconfig";



export async function DELETE(req,{ params }) {
    try {
      await connectDB();
      const { id } = params;
    
      const deletedContact = await ContactModel.findByIdAndDelete(id)
     
      if (!deletedContact) {
        return NextResponse.json({ success: false, message: "Contact not found" }, { status: 404 });
      }
   
      return Response.json(
        {
          success: true,
          message: "Contact form  delete successfully.",
          data: deletedContact,
        },
      );
    } catch (error) {
      console.error(error);
      return Response.json(
        { success: false, message: "Failed to get contact form." },
        { status: 500 }
      );
    }
  }
  