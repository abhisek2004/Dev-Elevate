const generateResetPasswordEmail = (name, resetPasswordUrl) => {
  return `
    <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Password</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🔐 Reset Password</h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
        
          <p style="font-size: 16px; margin-bottom: 25px;">
            Dear ${name}, Welcome to our platform!
          </p>
          <p style="font-size: 16px; margin-bottom: 25px;">
          We've received your request to reset your password. Please click the link below to reset your password:
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${resetPasswordUrl}" style="background: linear-gradient(to right, #6366f1, #4f46e5); color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-size: 16px; font-weight: 600; display: inline-block; ">Reset Password</a>
          </div>
          <p style="color: #6c757d; font-size: 14px; margin-top: 25px;">
            If you didn't request this verification, please ignore this email or contact our support team.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px;">
          <p>© 2025 Dev Elevate. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;
};

export default generateResetPasswordEmail;
