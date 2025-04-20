import connectDB from "@/dbconfig/dbconfig";
import ContactModel from "@/models/Contact";
 
 
import {mailSender} from "@/utils/mailSender"

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { data } = body;

    const savedContact = await ContactModel.create(data);
    if (!savedContact) {
      return Response.json(
        { success: false, message: "Failed to save contact information." },
        { status: 400 }
      );
    }

    await mailSender(data.email, data.firstName, data.company || "");

    return Response.json(
      {
        success: true,
        message: "Contact form submitted successfully.",
        data: savedContact,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Failed to submit contact form." },
      { status: 500 }
    );
  }
}

