import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type FormData = {
  prefix: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequest: string;
}

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
        { status: 400 }
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
        Prefix: ${info.prefix || 'Not specified'}
        First Name: ${info.firstName}
        Last Name: ${info.lastName}
        Email: ${info.email}
        Phone: ${info.phone}
        Special Requests: ${info.specialRequest || 'None'}
      `;
    };

    // Email content
    const mailOptions = {
      from: "hello@adithyakrishnan.com",
      to: "reserve@ayadacliff.com", 
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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
            New Reservation Request
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-left: 4px solid #3498db;">
            <h3 style="color: #2c3e50; margin-top: 0;">Guest Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
          </div>
          
          <div style="background-color: #e8f5e8; padding: 20px; margin: 20px 0; border-left: 4px solid #27ae60;">
            <h3 style="color: #2c3e50; margin-top: 0;">Booking Details</h3>
            <p><strong>Villa:</strong> ${villaName}</p>
            <p><strong>Arrival:</strong> ${arrival}</p>
            <p><strong>Departure:</strong> ${departure}</p>
            <p><strong>Guests:</strong> ${adults} Adult${adults !== 1 ? 's' : ''}, ${children} Child${children !== 1 ? 'ren' : ''}</p>
          </div>
          
          <div style="background-color: #fff3cd; padding: 20px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <h3 style="color: #2c3e50; margin-top: 0;">Additional Information</h3>
            <p><strong>Prefix:</strong> ${guestInfo.prefix || 'Not specified'}</p>
            <p><strong>First Name:</strong> ${guestInfo.firstName}</p>
            <p><strong>Last Name:</strong> ${guestInfo.lastName}</p>
            <p><strong>Special Requests:</strong></p>
            <p style="background-color: white; padding: 10px; border-radius: 5px; margin-top: 5px;">
              ${guestInfo.specialRequest || 'None'}
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #f1f2f6;">
            <p style="color: #666; font-size: 14px;">
              This reservation request was submitted through the Ayada Cliff booking system.
            </p>
          </div>
        </div>
      `,
    };

    console.log("Sending email with options:", {
      ...mailOptions,
      text: mailOptions.text.substring(0, 100) + "...",
      html: "HTML content (truncated for log)"
    });

    // Send the email
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result.messageId);

    return NextResponse.json({ 
      success: true, 
      messageId: result.messageId 
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
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}