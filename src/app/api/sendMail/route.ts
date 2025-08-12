// app/api/sendMail/route.ts
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const {
      type,
      name,
      email,
      phone_number,
      message,
      product_name,
      blog_name,
    } = await request.json();

    if (
      !email ||
      (type === "contact" && (!name || !message)) ||
      (type === "product" && (!name || !message || !product_name)) ||
      (type === "blog" && (!name || !message || !blog_name))
    ) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
      tls: { rejectUnauthorized: false },
    });

    // 📌 Helper to create a consistent email wrapper
    const wrapEmail = (title: string, content: string) => `
      <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: white; border-radius: 6px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background-color: #5a5c5d; padding: 15px 20px;">
            <h2 style="margin: 0; font-size: 20px; color: white;">${title}</h2>
          </div>
          
          <!-- Body -->
          <div style="padding: 20px; color: #333;">
            ${content}
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f36c23; color: white; text-align: center; padding: 10px;">
            <p style="margin: 0; font-size: 14px;">MPG Stone UK — Bringing Excellence in Natural Stones</p>
          </div>
        </div>
      </div>
    `;

    const createTable = (rows: [string, string][]) => `
      <table cellpadding="8" cellspacing="0" width="100%" style="border-collapse: collapse; font-size: 14px;">
        <thead>
          <tr style="background-color: #f36c23; color: white;">
            <th align="left" style="padding: 8px;">Field</th>
            <th align="left" style="padding: 8px;">Details</th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              ([label, value], i) => `
            <tr style="background-color: ${i % 2 === 0 ? "#f9f9f9" : "#ffffff"};">
              <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold; color: #5a5c5d;">${label}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${value || "-"}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;

    let adminSubject = "";
    let adminContent = "";
    let userSubject = "";
    let userContent = "";

    switch (type) {
      case "contact":
        adminSubject = "New Contact Form Submission — MPG Stone UK";
        adminContent = wrapEmail(
          "New Contact Submission",
          createTable([
            ["Name", name],
            ["Email", email],
            ["Phone Number", phone_number],
            ["Message", message],
          ])
        );

        userSubject = "Thank you for contacting MPG Stone";
        userContent = wrapEmail(
          "We’ve Received Your Message",
          `<p style="font-size: 14px;">Hi ${name},</p>
          <p style="font-size: 14px;">Thank you for reaching out to us. We will respond to your message as soon as possible.</p>
          <p style="font-size: 14px; margin-top: 20px;">Best regards,<br>MPG Stone Team</p>`
        );
        break;

      case "product":
        adminSubject = `New Product Enquiry from MPG Stone UK — ${product_name}`;
        adminContent = wrapEmail(
          "Product Enquiry",
          createTable([
            ["Name", name],
            ["Email", email],
            ["Phone Number", phone_number],
            ["Product Name", product_name],
            ["Message", message],
          ])
        );

        userSubject = `Thank you for your enquiry — ${product_name}`;
        userContent = wrapEmail(
          "We’ve Received Your Product Enquiry",
          `<p style="font-size: 14px;">Hi ${name},</p>
          <p style="font-size: 14px;">Thank you for your interest in <strong>${product_name}</strong>. Our team will get back to you shortly.</p>
          <p style="font-size: 14px; margin-top: 20px;">Best regards,<br>MPG Stone Team</p>`
        );
        break;

      case "blog":
        adminSubject = `New Blog Comment from MPG Stone UK — ${blog_name}`;
        adminContent = wrapEmail(
          "New Blog Comment",
          createTable([
            ["Name", name],
            ["Email", email],
            ["Blog Title", blog_name],
            ["Comment", message],
          ])
        );

        userSubject = "Thank you for your comment";
        userContent = wrapEmail(
          "We’ve Received Your Comment",
          `<p style="font-size: 14px;">Hi ${name},</p>
          <p style="font-size: 14px;">Thank you for leaving a comment on "<strong>${blog_name}</strong>".</p>
          <p style="font-size: 14px; margin-top: 20px;">Best regards,<br>MPG Stone Team</p>`
        );
        break;
    }

    // Send admin email
    await transporter.sendMail({
      from: "digital@mpgstone.com",
      to: "digital@mpgstone.com",
      subject: adminSubject,
      html: adminContent,
    });

    // Send user email
    await transporter.sendMail({
      from: "digital@mpgstone.com",
      to: email,
      subject: userSubject,
      html: userContent,
    });

    return new Response(
      JSON.stringify({ message: "Emails sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Email error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to send email" }),
      { status: 500 }
    );
  }
}
