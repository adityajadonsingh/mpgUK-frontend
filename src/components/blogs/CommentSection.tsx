'use client';

import React, { useEffect, useState } from 'react';

type Comment = {
  id: number;
  name: string;
  email: string;
  comment: string;
  blog_id: number;
  created_at: string;
};

type CommentSectionProps = {
  blogId: number;
  blogTitle: string;
};

const CommentSection: React.FC<CommentSectionProps> = ({ blogId, blogTitle }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await fetch('https://backend.mpgstone.co.uk/api/comments/');
      if (!res.ok) throw new Error('Failed to load comments');
      const data: Comment[] = await res.json();

      const filteredComments = data.filter(
        (comment) => String(comment.blog_id) === String(blogId)
      );

      setComments(filteredComments.reverse()); // latest first
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Step 1: Save comment to server
    const commentResponse = await fetch("https://backend.mpgstone.co.uk/api/comments/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blog_id: blogId,
        name,
        email,
        comment,
      }),
    });

    if (!commentResponse.ok) throw new Error("Failed to save comment");

    // Step 2: Send email notification
    const emailResponse = await fetch("/api/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "blog",
        name,
        email,
        message: comment,
        blog_name: blogTitle,
      }),
    });

    if (!emailResponse.ok) throw new Error("Failed to send email");

    // Reset form and refresh comments
    setName('');
    setEmail('');
    setComment('');
    setSuccessMsg('Comment submitted successfully!');
    fetchComments();
  } catch (err) {
    console.error('Error submitting comment:', err);
  } finally {
    setLoading(false);
    setTimeout(() => setSuccessMsg(''), 3000);
  }
};


  return (
    <div className="w-full mt-10">
      <h2 className="text-xl font-semibold mb-4">Leave a Comment</h2>

      {successMsg && (
        <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          placeholder="Your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="w-full h-32 border px-3 py-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#5a5c5d] cursor-pointer text-white px-4 py-2 rounded hover:bg-[#f36c23]"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      <h3 className="text-lg font-medium mb-2">Comments:</h3>
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className=" p-3 rounded" style={{
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"
            }}>
              <p className="font-semibold">{comment.name}</p>
              <p className="text-sm text-gray-600">
                {new Date(comment.created_at).toLocaleString()}
              </p>
              <p className="mt-2">{comment.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
