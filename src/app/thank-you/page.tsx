// app/thank-you/page.tsx
"use client";

import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-[80vh] bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* Container */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center border border-gray-200">
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100">
          {/* Checkmark Icon (SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          We have received your message and will get back to you shortly.
        </p>


        <Link
          href="/"
          className="inline-block bg-[#f36c23] hover:bg-[#5a5c5d] !text-white px-6 py-2 rounded-md transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
