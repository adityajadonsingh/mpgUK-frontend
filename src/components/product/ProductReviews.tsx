"use client";

import { useState } from "react";
import PopupMessage from "../PopupMessage";
import { Review } from "@/types";

export default function ProductReviews({
  fetchReviews,
  product_id,
}: {
  fetchReviews: Review[];
  product_id: number;
}) {
  const [reviews, setReviews] = useState<Review[]>(fetchReviews || []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://backend.mpgstone.co.uk/api/reviews/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id,
          name,
          email,
          rating,
          comment,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit review");

      const newReview = await res.json();
      setReviews([newReview, ...reviews]);
      setName("");
      setEmail("");
      setRating(5);
      setComment(""); 
      setPopup({
        show: true,
        message: "Review submitted successfully!",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      setPopup({
        show: true,
        message: "Error submitting review",
        type: "error",
      });
    }
  };

  return (
    <div className="sm:w-2/3 w-full mx-auto my-8">
      {/* Popup Message */}
      <PopupMessage
        show={popup.show}
        type={popup.type as "success" | "error"}
        message={popup.message}
        onClose={() => setPopup({ ...popup, show: false })}
      />

      <div className="container">
        {/* Review Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-[#f6f4f5] p-5 rounded-md shadow"
      >
        <h2 className="text-xl font-semibold">Leave a Review</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
          className="w-full px-4 py-2 rounded border border-gray-300"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          required
          className="w-full px-4 py-2 rounded border border-gray-300"
        />

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full px-4 py-2 rounded border border-gray-300"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 ? "s" : ""}
            </option>
          ))}
        </select>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your Review"
          required
          className="w-full px-4 py-2 rounded border border-gray-300"
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
        >
          Submit Review
        </button>
      </form>

      {/* Review List */}
      <div className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Customer Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          reviews.map((review, idx) => (
            <div
              key={idx}
              className="border border-gray-200 p-4 rounded bg-white"
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium">{review.name}</span>
                <span className="text-yellow-500">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))
        )}
      </div>
      </div>
    </div>
  );
}
