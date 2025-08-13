import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type FormData = {
  prefix: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequest: string;
};

type EmailRequestBody = {
  arrival: string;
  departure: string;
  adults: number;
  children: number;
  villaName: string;
  guestInfo: FormData;
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
      villaName,
      guestInfo,
      name,
      email,
      phone,
    } = body;

    if (!name || !email || !phone || !arrival || !departure) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      secure: true,
      port: 465,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY || "",
      },
    });

    // Format guest information
    const formatGuestInfo = (info: FormData): string => {
      return `
        Prefix: ${info.prefix || "Not specified"}
        First Name: ${info.firstName}
        Last Name: ${info.lastName}
        Email: ${info.email}
        Phone: ${info.phone}
        Special Requests: ${info.specialRequest || "None"}
      `;
    };

    // Email content
    const mailOptions = {
      from: "hello@adithyakrishnan.com",
      to: "reservations@ayadacliff.com",
      cc: "adiadithyakrishnan@gmail.com",
      subject: `New Reservation Request - ${villaName} - ${name}`,
      replyTo: email,
      text: `
        NEW RESERVATION REQUEST
        
        Guest Details:
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        
        Booking Details:
        Villa: ${villaName}
        Arrival: ${arrival}
        Departure: ${departure}
        Adults: ${adults}
        Children: ${children}
        
        Guest Information:
        ${formatGuestInfo(guestInfo)}
      `,
      html: `
<div style="font-family: 'Open Sans', Arial, sans-serif; background-color: #F8F5F2; padding: 30px;">
  <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 8px; overflow: hidden; border: 1px solid #E0D9D1;">
    <div style="text-align: center; padding: 20px;">
      <img src="https://ayadacliff.com/logo.png" alt="Ayada Cliff" style="max-width: 140px; margin-bottom: 10px;" />
      <h2 style="color: #8B4D3E; margin: 0; font-weight: 600;">Reservation Request Submitted</h2>
      <p style="color: #6B5A53; font-size: 15px; margin-top: 10px;">
        Thank you for your reservation request. Your details have been sent to our reservations team at
        <a href="mailto:reserve@ayadacliff.com" style="color: #8B4D3E; text-decoration: none;">reserve@ayadacliff.com</a>.
        We will contact you shortly to confirm your stay.
      </p>
    </div>

    <!-- Reservation Summary -->
    <div style="background-color: #fff; padding: 20px; border-top: 1px solid #E0D9D1; border-bottom: 1px solid #E0D9D1;">
      <h3 style="color: #8B4D3E; margin-top: 0; border-bottom: 2px solid #E0D9D1; padding-bottom: 8px;">Reservation Summary</h3>
      <p style="margin: 6px 0; font-size: 15px;">📅 <strong>Arrival:</strong> ${arrival}</p>
      <p style="margin: 6px 0; font-size: 15px;">📅 <strong>Departure:</strong> ${departure}</p>
      <p style="margin: 6px 0; font-size: 15px;">👥 <strong>Guests:</strong> ${adults} Adult${adults !== 1 ? "s" : ""}, ${children} Child${children !== 1 ? "ren" : ""}</p>

      <hr style="border: none; border-top: 1px solid #E0D9D1; margin: 12px 0;" />

      <p style="margin: 6px 0; font-size: 15px;"><strong>Villa:</strong> ${villaName}</p>
      <p style="margin: 6px 0; font-size: 15px;"><strong>Guest:</strong> ${name}</p>
      <p style="margin: 6px 0; font-size: 15px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #8B4D3E; text-decoration: none;">${email}</a></p>
      <p style="margin: 6px 0; font-size: 15px;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #8B4D3E; text-decoration: none;">${phone}</a></p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding: 20px;">
      <a href="https://ayadacliff.com/reservations" 
         style="display: inline-block; padding: 12px 20px; border: 1px solid #8B4D3E; border-radius: 4px; text-decoration: none; color: #8B4D3E; font-weight: 500;">
        Make Another Reservation
      </a>
    </div>
  </div>
</div>
`,
    };

    console.log("Sending email with options:", {
      ...mailOptions,
      text: mailOptions.text.substring(0, 100) + "...",
      html: "HTML content (truncated for log)",
    });

    // Send the email
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result.messageId);

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
    });
  } catch (error) {
    console.error("Email sending error:", error);

    // More detailed error logging
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
