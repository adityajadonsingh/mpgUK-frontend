"use client";

import { useEffect, useState } from "react";

export default function PopupMessage({
  message,
  type = "success", // or "error"
  show,
  onClose,
}: {
  message: string;
  type?: "success" | "error";
  show: boolean;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded shadow-lg transition-all duration-500 ease-in-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
        ${type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
    >
      {message}
    </div>
  );
}
