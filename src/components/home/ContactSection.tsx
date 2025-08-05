"use client";

import Image from "next/image";
import { ContactFormData } from "@/types";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone_number: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    if (!captchaToken) {
      setStatus("Please complete the CAPTCHA.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, captchaToken }),
      });
      if (!res.ok) {
        throw new Error(`Failed Send Data: ${res.status} ${res.statusText}`);
      }
      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({
          name: "",
          phone_number: "",
          email: "",
          message: "",
        });
        setCaptchaToken("");
        recaptchaRef.current?.reset(); // Reset CAPTCHA
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("An error occurred.");
    }
  };

  return (
    <section className="contact-section my-10">
      <div className="container">
        <div className="grid grid-cols-2">
          <div className="form w-10/12 py-8 mx-auto">
            <h4 className="text-3xl font-semibold">Having Any Query?</h4>
            <p className="my-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
              doloremque animi quasi exercitationem? Dolor, voluptatibus!
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border-2 rounded-sm border-[#7d7d7d52] p-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border-2 rounded-sm border-[#7d7d7d52] p-2"
              />
              <input
                type="text"
                name="phone_number"
                placeholder="Your Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                className="w-full border-2 rounded-sm border-[#7d7d7d52] p-2"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full h-32 border-2 rounded-sm border-[#7d7d7d52] p-2"
              />

              {/* reCAPTCHA */}
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={(token) => setCaptchaToken(token || "")}
                ref={recaptchaRef}
              />

              <button
                type="submit"
                className="bg-[#5a5c5d] hover:bg-[#f36c23] cursor-pointer text-white px-6 rounded-sm py-2 font-medium"
              >
                Submit
              </button>
              {status && <p>{status}</p>}
            </form>
          </div>
          <div className="img-box relative w-10/12 mx-auto h-full">
            <Image
              src="/media/contact-home.png"
              alt="Contact Us"
              fill
              className="object-cover rounded-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
