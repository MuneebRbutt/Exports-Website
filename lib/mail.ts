import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendMail(to: string, subject: string, html: string, text?: string) {
  try {
    await transporter.sendMail({
      from: `"Meharstare" <${process.env.SMTP_USER || "noreply@meharstare.com"}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ""),
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

export function welcomeEmailTemplate(name: string, loginUrl: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <div style="text-align: center; padding: 20px 0;">
        <h1 style="color: #E84118; font-weight: bold; font-style: italic; margin: 0;">MEHARSTARE</h1>
        <p style="color: #666; margin: 5px 0 0; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Premium Sporting Goods Since 1996</p>
      </div>
      <hr style="border: none; border-top: 2px solid #E84118; margin: 20px 0;" />
      <h2 style="color: #1A1A1A;">Welcome, ${name}!</h2>
      <p>Thank you for joining Meharstare. Your account has been successfully created.</p>
      <p>You can now log in and start exploring our premium sporting goods catalog:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${loginUrl}" style="display: inline-block; background-color: #E84118; color: white; padding: 14px 32px; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-radius: 4px;">Log In to Your Account</a>
      </div>
      <p style="font-size: 12px; color: #999;">If you did not create this account, please contact our support team immediately.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #999; text-align: center;">&copy; 2024 Meharstare. All rights reserved.</p>
    </div>
  `;
}

export function passwordResetEmailTemplate(name: string, resetUrl: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <div style="text-align: center; padding: 20px 0;">
        <h1 style="color: #E84118; font-weight: bold; font-style: italic; margin: 0;">MEHARSTARE</h1>
        <p style="color: #666; margin: 5px 0 0; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Premium Sporting Goods Since 1996</p>
      </div>
      <hr style="border: none; border-top: 2px solid #E84118; margin: 20px 0;" />
      <h2 style="color: #1A1A1A;">Password Reset Request</h2>
      <p>Hello ${name || "there"},</p>
      <p>We received a request to reset your password. Click the button below to set a new password:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="display: inline-block; background-color: #E84118; color: white; padding: 14px 32px; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-radius: 4px;">Reset Password</a>
      </div>
      <p style="font-size: 13px;">This link will expire in <strong>1 hour</strong> for security reasons.</p>
      <p style="font-size: 13px;">If you didn't request this, you can safely ignore this email.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #999; text-align: center;">&copy; 2024 Meharstare. All rights reserved.</p>
    </div>
  `;
}

export function passwordChangedEmailTemplate(name: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <div style="text-align: center; padding: 20px 0;">
        <h1 style="color: #E84118; font-weight: bold; font-style: italic; margin: 0;">MEHARSTARE</h1>
      </div>
      <hr style="border: none; border-top: 2px solid #E84118; margin: 20px 0;" />
      <h2 style="color: #1A1A1A;">Password Changed</h2>
      <p>Hello ${name || "there"},</p>
      <p>Your password has been successfully updated.</p>
      <p>If you did not make this change, please contact our support team immediately.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #999; text-align: center;">&copy; 2024 Meharstare. All rights reserved.</p>
    </div>
  `;
}
