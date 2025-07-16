"use client";

import { useEffect, useRef } from "react";

export default function SearchPopup({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 backdrop-blur-[2px] bg-[#00000038]">
      <div
        ref={popupRef}
        className="bg-white w-full max-w-md mx-auto p-6 rounded shadow-md animate-slide-down relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
        >
        <i className="bi bi-x-lg"></i>
        </button>
        <h2 className="text-lg mb-4 font-semibold">Search</h2>
        <div className="flex">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className="flex-grow border border-gray-300 px-4 py-2 rounded-l"
          />
          <button className="bg-[#e6af5d] hover:bg-[#c09d68] cursor-pointer text-white px-4 py-2 rounded-r">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
