import mongoose from "mongoose";
 
import mailSender from "@/utils/mailSender";

const otpschemma=new mongoose.Schema({
    email:{
        type: String,
        ref:"User"
    },
    otp:{
        type:String,  
        required:true,
    },
    createdat:{
        type:Date,  
        default:Date.now,
        expires:"10m",
    },  
})
 

async function sender(email,otp){
    try{
        const mailsresponse= await mailSender(email,"verification fron pankajPerception",otp);
        console.log("email send successfully",mailsresponse);

    }catch(error){
         console.log("error while sending mails",error);
         throw error;
    }
}

otpschemma.pre("save",
     async function(next){
    await sender(this.email,this.otp)
    next();
})

 
const OTP = mongoose.models.OTP || mongoose.model('OTP',otpschemma);

export default OTP;