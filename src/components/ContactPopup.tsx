"use client";

import { ProductFormData } from "@/types";
import { useRef, useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import clsx from "clsx";

export default function ContactPopup({
  isOpen,
  onClose,
  onSuccessMessage,
  product
}: {
  isOpen: boolean;
  product: string;
  onClose: () => void;
  onSuccessMessage: (msg: string) => void;
}) {
  const [formData, setFormData] = useState<ProductFormData>({
    product_name: product,
    name: "",
    email: "",
    phone_number: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [visible, setVisible] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      // Delay hide to allow closing animation
      const timeout = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, captchaToken }),
      });

      if (!res.ok) throw new Error("Failed to send");

      // Send email
      const mailRes = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "product", ...formData }),
      });

      if (!mailRes.ok)
        throw new Error(`Mail send failed: ${mailRes.statusText}`);

      setStatus("Message sent successfully!");
      onSuccessMessage("Message sent successfully!");
      setFormData({ name: "", phone_number: "", email: "", message: "", product_name: product });
      setCaptchaToken("");
      recaptchaRef.current?.reset();

      // Delay close
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error(error);
      setStatus("An error occurred.");
    }
  };

  if (!visible) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-[#0000006b] bg-opacity-60 backdrop-blur-[2px] transition-opacity duration-300",
        {
          "opacity-100 pointer-events-auto": isOpen,
          "opacity-0 pointer-events-none": !isOpen,
        }
      )}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "bg-white w-11/12 max-w-md p-6 rounded-md shadow-lg transform transition-all duration-300",
          {
            "opacity-100 scale-100 translate-y-0": isOpen,
            "opacity-0 scale-95 -translate-y-4": !isOpen,
          }
        )}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-2 right-3 text-xl text-gray-500 hover:text-black"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-sm"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-sm"
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Your Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-sm"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full h-28 border border-gray-300 p-2 rounded-sm resize-none"
          />
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={(token) => setCaptchaToken(token || "")}
            ref={recaptchaRef}
          />
          <button
            type="submit"
            className="bg-[#5a5c5d] cursor-pointer hover:bg-[#f36c23] text-white px-6 py-2 rounded-sm font-medium w-full"
          >
            Submit
          </button>
          {status && <p className="text-sm mt-1 text-center">{status}</p>}
        </form>
      </div>
    </div>
  );
}
