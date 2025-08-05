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

        // Basic field validation
        const missingFields =
            !email ||
            (type === "contact" && (!name || !message)) ||
            (type === "product" && (!name || !message || !product_name)) ||
            (type === "blog" && (!name || !message || !blog_name));

        if (missingFields) {
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
            tls: {
                rejectUnauthorized: false,
            },
        });

        // Admin HTML content
        let adminHtml = "";
        let adminSubject = "";

        // User HTML content
        let userSubject = "";
        let userHtml = "";

        switch (type) {
            case "product":
                adminSubject = `New enquiry for ${product_name} (MPG Stone UK)`;
                adminHtml = `
          <h3>New Product Enquiry</h3>
          <table border="1" cellpadding="10" cellspacing="0" style="font-family:sans-serif;">
            <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
            <tr><td><strong>Phone Number:</strong></td><td>${phone_number || "-"}</td></tr>
            <tr><td><strong>Product Name:</strong></td><td>${product_name}</td></tr>
            <tr><td><strong>Message:</strong></td><td>${message}</td></tr>
          </table>
        `;
                userSubject = "Thank you for your product enquiry";
                userHtml = `
          <p style="font-family:sans-serif;">Hi ${name},</p>
          <p>Thank you for your interest in <strong>${product_name}</strong>. We’ve received your enquiry and will get back to you shortly.</p>
          <p>Best regards,<br>MPG Stone Team</p>
        `;
                break;

            case "contact":
                adminSubject = "New Contact Form Submission (MPG Stone UK)";
                adminHtml = `
          <h3>New Contact Form Submission</h3>
          <table border="1" cellpadding="10" cellspacing="0" style="font-family:sans-serif;">
            <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
            <tr><td><strong>Phone Number:</strong></td><td>${phone_number || "-"}</td></tr>
            <tr><td><strong>Message:</strong></td><td>${message}</td></tr>
          </table>
        `;
                userSubject = "Thank you for contacting us";
                userHtml = `
          <p style="font-family:sans-serif;">Hi ${name},</p>
          <p>Thank you for reaching out to us. We have received your message and will respond as soon as possible.</p>
          <p>Best regards,<br>MPG Stone Team</p>
        `;
                break;

            case "blog":
                adminSubject = `New blog comment on "${blog_name} (MPG Stone UK)"`;
                adminHtml = `
          <h3>New Blog Comment</h3>
          <table border="1" cellpadding="10" cellspacing="0" style="font-family:sans-serif;">
            <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
            <tr><td><strong>Blog Name:</strong></td><td>${blog_name}</td></tr>
            <tr><td><strong>Comment:</strong></td><td>${message}</td></tr>
          </table>
        `;
                userSubject = "Thank you for your comment";
                userHtml = `
          <p style="font-family:sans-serif;">Hi ${name},</p>
          <p>Thank you for your comment on our blog titled "<strong>${blog_name}</strong>". We appreciate your feedback!</p>
          <p>Best regards,<br>MPG Stone Team</p>
        `;
                break;

            default:
                adminSubject = "New Newsletter Subscription (MPG Stone UK)";
                adminHtml = `
          <h3>New Newsletter Subscriber</h3>
          <p style="font-family:sans-serif;">Email: <strong>${email}</strong></p>
        `;
                userSubject = "Thank you for subscribing";
                userHtml = `
          <p style="font-family:sans-serif;">Hi,</p>
          <p>Thank you for subscribing to our newsletter! You'll now receive our latest updates and offers.</p>
          <p>Best regards,<br>MPG Stone Team</p>
        `;
        }

        // Send admin email
        await transporter.sendMail({
            from: "digital@mpgstone.com",
            to: "digital@mpgstone.com",
            subject: adminSubject,
            html: adminHtml,
        });

        // Send user email
        await transporter.sendMail({
            from: "digital@mpgstone.com",
            to: email,
            subject: userSubject,
            html: userHtml,
        });

        return new Response(
            JSON.stringify({ message: "Emails sent successfully" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Email error:", error as any);
        return new Response(
            JSON.stringify({ message: "Failed to send email" }),
            { status: 500 }
        );
    }
}
