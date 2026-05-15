import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendMail(to: string, subject: string, text: string) {
  try {
    await transporter.sendMail({
      from: `"Meharstare" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

// EMAIL 1 — When customer places order
export function orderConfirmationTemplate(name: string, orderNumber: string, total: string) {
  return `Hi ${name},

Thank you for your order!

Order Number: ${orderNumber}
Payment: Cash on Delivery
Total: $${total}

We will deliver to your address.
You pay when it arrives.

Track your order at:
www.meharstare.com/track-order

Thank you,
Meharstare Team`;
}

// EMAIL 2 — When admin ships order
export function orderShippedTemplate(name: string, orderNumber: string, tracking: string, courier: string) {
  return `Hi ${name},

Great news! Your order has been shipped.

Order Number: ${orderNumber}
Tracking Number: ${tracking}
Courier: ${courier}

Track your order at:
www.meharstare.com/track-order

Thank you,
Meharstare Team`;
}

// EMAIL 3 — When customer forgets password
export function forgotPasswordTemplate(resetLink: string) {
  return `Hi,

Click the link below to reset 
your password. Link expires in 1 hour.

${resetLink}

If you did not request this, 
ignore this email.

Meharstare Team`;
}

// EMAIL 4 — When password is changed
export function passwordChangedEmailTemplate(name: string) {
  return `Hi ${name},

Your password has been successfully changed.
If you did not make this change, please contact support immediately.

Meharstare Team`;
}
