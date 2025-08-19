"use client";

import { useEffect, useState } from "react";

export default function BlogContent({ content }: { content: string }) {
  const [safeContent, setSafeContent] = useState("");
  useEffect(() => {
    setSafeContent(content);
  }, [content]);
  return (
    <div
      className="text-gray-700 prose max-w-none blog-content"
      dangerouslySetInnerHTML={{ __html: safeContent }}
    ></div>
  );
}
