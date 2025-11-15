import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    console.log("Received email subscription request:", email);

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Get environment variables
    const brevoHost = process.env.BREVO_SMTP_HOST || "smtp-relay.brevo.com";
    const brevoPort = parseInt(process.env.BREVO_SMTP_PORT || "587");
    const brevoUser = process.env.BREVO_SMTP_USER;
    const brevoPassword = process.env.BREVO_SMTP_PASSWORD;
    const adminEmail = process.env.ADMIN_EMAIL || "web.dev.haseeb@gmail.com";
    // Use a verified sender email - can be the same as brevoUser or a verified email in Brevo
    const fromEmail = process.env.BREVO_FROM_EMAIL || brevoUser || "noreply@cloudvictor.com";

    // Validate required environment variables
    if (!brevoUser || !brevoPassword) {
      console.error("Missing required environment variables:");
      console.error("BREVO_SMTP_USER:", brevoUser ? "✓ Set" : "✗ Missing");
      console.error("BREVO_SMTP_PASSWORD:", brevoPassword ? "✓ Set" : "✗ Missing");
      return NextResponse.json(
        { 
          error: "Email service configuration error. Please check your Brevo SMTP credentials in .env.local file.",
          details: "Missing BREVO_SMTP_USER or BREVO_SMTP_PASSWORD"
        },
        { status: 500 }
      );
    }

    console.log("Configuration:");
    console.log("- SMTP Host:", brevoHost);
    console.log("- SMTP Port:", brevoPort);
    console.log("- SMTP User:", brevoUser);
    console.log("- Admin Email:", adminEmail);
    console.log("- From Email:", fromEmail);

    // Create transporter with better error handling
    const transporter = nodemailer.createTransport({
      host: brevoHost,
      port: brevoPort,
      secure: brevoPort === 465, // true for 465, false for other ports
      auth: {
        user: brevoUser,
        pass: brevoPassword,
      },
      // Add connection timeout
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    // Verify connection before sending
    try {
      await transporter.verify();
      console.log("SMTP connection verified successfully");
    } catch (verifyError) {
      console.error("SMTP connection verification failed:", verifyError);
      return NextResponse.json(
        { 
          error: "Failed to connect to email server. Please check your Brevo SMTP credentials.",
          details: verifyError instanceof Error ? verifyError.message : "Connection verification failed"
        },
        { status: 500 }
      );
    }

    // Email content
    const mailOptions = {
      from: `"Cloud Victor" <${fromEmail}>`, // Sender address with name
      to: adminEmail, // Admin email - web.dev.haseeb@gmail.com
      replyTo: fromEmail,
      subject: "New Newsletter Subscription - Cloud Victor",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #FF9900; margin-bottom: 20px;">New Newsletter Subscription</h2>
          <p style="font-size: 16px; color: #333; margin-bottom: 15px;">A user has subscribed to the newsletter.</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF9900;">
            <p style="margin: 0; font-size: 16px;"><strong style="color: #333;">User Email:</strong></p>
            <p style="margin: 10px 0 0 0; font-size: 18px; color: #FF9900; font-weight: bold;">${email}</p>
          </div>
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            This email was sent from the Cloud Victor website newsletter section.
          </p>
        </div>
      `,
      text: `New Newsletter Subscription\n\nA user has subscribed to the newsletter.\n\nUser Email: ${email}\n\nThis email was sent from the Cloud Victor website newsletter section.`,
    };

    console.log("Sending email to:", adminEmail);

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);

    return NextResponse.json(
      { 
        message: "Email sent successfully",
        messageId: info.messageId
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email - Full error:", error);
    
    // Provide more detailed error information
    let errorMessage = "Failed to send email";
    let errorDetails = "Unknown error";

    if (error instanceof Error) {
      errorDetails = error.message;
      if (error.message.includes("Invalid login")) {
        errorMessage = "Invalid Brevo SMTP credentials. Please check your username and password.";
      } else if (error.message.includes("ECONNREFUSED") || error.message.includes("ETIMEDOUT")) {
        errorMessage = "Could not connect to Brevo SMTP server. Please check your network connection and SMTP settings.";
      } else if (error.message.includes("authentication")) {
        errorMessage = "SMTP authentication failed. Please verify your Brevo credentials.";
      }
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        details: errorDetails
      },
      { status: 500 }
    );
  }
}

