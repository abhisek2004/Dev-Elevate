const generateWelcomeEmail = (name) => {
  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f4f6fc; padding: 40px 0;">
    <div style="max-width: 620px; margin: auto; background-color: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.08);">
      
      <div style="text-align: center;">
        <h2 style="color: #4f46e5; font-size: 26px; margin-bottom: 10px;">Welcome, ${name} 👋</h2>
        <p style="font-size: 16px; color: #444; line-height: 1.6;">
          You’ve officially joined <strong>DevElevate</strong> — your all-in-one platform to boost your career, level up your coding skills, and connect with fellow developers.
        </p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://develevate-ai.vercel.app/" style="background: linear-gradient(to right, #6366f1, #4f46e5); color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-size: 16px; font-weight: 600; display: inline-block;">
          🔐 Log In to Your Dashboard
        </a>
      </div>

      <div style="margin-top: 40px;">
        <h3 style="color: #111; font-size: 18px; margin-bottom: 12px;">🚀 What's Inside:</h3>
        <ul style="list-style: none; padding: 0; font-size: 15px; line-height: 1.8; color: #333;">
          <li>🤖 <strong>Study Buddy AI</strong> — Get instant coding help</li>
          <li>📄 <strong>Resume Builder</strong> — Craft job-winning resumes</li>
          <li>💻 <strong>Code Compiler</strong> — Run and test your code online</li>
          <li>📘 <strong>Learning Hub</strong> — Master DSA & tech interviews</li>
          <li>🎯 <strong>Job Feed</strong> — Stay updated with fresh job posts</li>
        </ul>
      </div>

      <div style="margin-top: 40px; font-size: 14px; color: #555;">
        <p>If you need any help, reply to this email or contact us at 
          <a href="mailto:officialdevelevate@gmail.com" style="color: #4f46e5; font-weight: 500;">officialdevelevate@gmail.com</a>
        </p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
        <p style="text-align: center;">
          🌐 <a href="https://develevate.in" style="color: #4f46e5; text-decoration: none;">https://develevate.in</a>  
        </p>
      </div>
    </div>
  </div>
  `;
};

export default generateWelcomeEmail;
