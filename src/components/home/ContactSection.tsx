"use client";

import Image from "next/image";
import { ContactFormData } from "@/types";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import PopupMessage from "@/components/PopupMessage";
import { useRouter } from "next/navigation";
export default function ContactSection() {
  const router = useRouter();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone_number: "",
    message: "",
  });

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const [captchaToken, setCaptchaToken] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      setPopup({
        show: true,
        message: "Please complete the CAPTCHA.",
        type: "error",
      });
      return;
    }

    try {
      // Save data to DB
      const dbRes = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, captchaToken }),
      });

      if (!dbRes.ok) throw new Error(`DB save failed: ${dbRes.statusText}`);
      else {
        router.push("/thank-you");
      }
      // Send email
      const mailRes = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", ...formData }),
      });

      if (!mailRes.ok)
        throw new Error(`Mail send failed: ${mailRes.statusText}`);

      // Success
      setPopup({
        show: true,
        message: "Message sent successfully!",
        type: "success",
      });
      setFormData({ name: "", phone_number: "", email: "", message: "" });
      setCaptchaToken("");
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setPopup({
        show: true,
        message: "Failed to send message.",
        type: "error",
      });
    }
  };

  return (
    <section id="contact-section" className="contact-section md:my-10 my-5">
      <div className="container">
        <div className="grid md:grid-cols-2 grid-cols-1">
          <div className="form md:w-10/12 w-11/12 md:py-8 mx-auto">
            <h4 className="text-3xl font-semibold">Having Any Query?</h4>
            <p className="my-3">
              Welcome to MPG Stone! We’re here to assist you in any way we can.
              Please feel free to reach out to us using the contact form.
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
            </form>
          </div>

          <div className="img-box relative md:w-10/12 w-11/12 md:block none mx-auto h-full">
            <Image
              src="/media/contact-image.webp"
              alt="Contact Us"
              fill
              className="object-cover rounded-sm"
            />
          </div>
        </div>
      </div>

      {/* Popup */}
      <PopupMessage
        message={popup.message}
        type={popup.type}
        show={popup.show}
        onClose={() => setPopup({ ...popup, show: false })}
      />
    </section>
  );
}
