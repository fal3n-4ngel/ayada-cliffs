import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type EmailRequestBody = {
  arrival: string;
  departure: string;
  adults: number;
  children: number;
  guestInfo: string;
  name: string;
  email: string;
  phone: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: EmailRequestBody = await request.json();
    const {
      arrival,
      departure,
      adults,
      children,
      guestInfo,
      name,
      email,
      phone,
    } = body;

    // Create a transporter using Resend SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      secure: true,
      port: 465,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY || "",
      },
    });

    // Email content
    const mailOptions = {
      from: "hello@adithyakrishnan.com",
      to: "adiadithyakrishnan@gmail.com",
      subject: `New booking request from ${name}`,
      replyTo: email,
      text: `
        Name: ${name}
        Email: ${email}
        phone:${phone}
        Arrival: ${arrival}
        Departure: ${departure}
        Adults: ${adults}
        Children: ${children}
        
        Guest Information:
        ${guestInfo.toString()}
      `,
      html: `
        <div>
          <h2>New Booking Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Arrival:</strong> ${arrival}</p>
          <p><strong>Departure:</strong> ${departure}</p>
          <p><strong>Adults:</strong> ${adults}</p>
          <p><strong>Children:</strong> ${children}</p>
          <p><strong>Guest Information:</strong></p>
          <p>${guestInfo}</p>
        </div>
      `,
    };
    console.log("Sending email with options:", mailOptions);
    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
