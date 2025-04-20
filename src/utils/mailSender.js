import nodemailer from 'nodemailer';

export async function mailSender(email, name, Company) {
  try {
    const sendmail = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_AUTH,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await sendmail.sendMail({
      from: `"EMBPROTO" <EmbProto@gmail.com>`,
      to: `${email}`,
      subject: `Thanks for contacting EMBPROTO`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #0052cc;">Hi ${name},</h2>
          <p>Thank you for reaching out to <strong>EMBPROTO</strong>!</p>
          <p>We’ve received your details and someone from our team will get in touch with you shortly.</p>
          <p><strong>Company:</strong> ${Company}</p>
          <p>Meanwhile, feel free to reply to this email if you have any questions.</p>
          <br />
          <p>Regards,</p>
          <p><strong>Team EmbProto</strong></p>
        </div>
      `,
    });

    console.log("Mail sent:", info);
    return info;
  } catch (error) {
    console.error("Mail error:", error);
    throw new Error("Mail sending failed");
  }
}
