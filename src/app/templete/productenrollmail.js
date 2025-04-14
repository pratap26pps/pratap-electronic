export const productEnrollment = (ProductName, name) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Course Registration Confirmation</title>
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
      </style>
    </head>
    <body>
      <div class="container">
        <div class="message">Course Registration</div>
        <div class="body">
          <p>Dear ${name},</p>
          <p>You have successfully registered for the course:</p>
          <h2>"${ProductName}"</h2>
          <p>Thank you for choosing us!</p>
        </div>
      </div>
    </body>
    </html>`;
  };
  