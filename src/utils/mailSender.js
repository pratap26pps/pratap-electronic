 import nodemailer from 'nodemailer'
 
const mailSender = async (email ,title,body)=>{
    try{
        const sendmail=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port: 587,   
            secure: false,
            auth:{
                user:process.env.MAIL_AUTH,
                pass:process.env.MAIL_PASS,
            }
        })
     let info= sendmail.sendMail({
        from:'PankajPerception || by pps',
        to:`${email}`,
        subject:`${title}`,
        html:`${body}`,
     })
        console.log("info",info);
        return info 


    }catch(error){
      console.error(error);
      console.log("mail did not send");
      process.exit(1)
    }
}

module.exports=mailSender