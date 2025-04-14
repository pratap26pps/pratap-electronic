export const emailVerification = (otp) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Email Verification</title>
      <style>
        body {
          background-color: #ffffff;
          font-size: 16px;
          line-height: 1.4;
          color: #333333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
        .logo {
          max-width: 200px;
          margin-bottom: 20px;
        }
        .message {
          font-size: 18px;
          margin-bottom: 20px;
        }
        .support {
          font-size: 18px;
          margin-top: 20px;
        }
        .otp-box {
          font-size: 24px;
          font-weight: bold;
          margin: 20px auto;
          padding: 10px 20px;
          display: inline-block;
          border: 2px dashed #333;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="message">Email Verification</div>
        <div class="body">
          <p>Dear user,</p>
          <p>Your OTP for email verification is:</p>
          <div class="otp-box">${otp}</div>
          <p>Please use this OTP to complete your registration.</p>
        </div>
      </div>
    </body>
    </html>`;
  };
  