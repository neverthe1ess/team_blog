"use client";

import { useState } from "react";
import MyButton from "./MyButton";

interface Comment {
  id: number;
  content: string;
  author: {
    nickname: string;
  };
}

interface Props {
  postId: string; // 댓글 달 글 번호
  initialComments?: Comment[]; // 처음에 가져온 댓글들
}

export default function CommentList({ postId, initialComments = [] }: Props) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다!");
      return;
    }

    const res = await fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: input, postId: Number(postId) }),
    });

    if (res.ok) {
      alert("댓글 등록 완료!");
      setInput("");
      window.location.reload(); // 간단하게 새로고침 (나중에 멋지게 고쳐봅시다)
    }
  };

  return (
    <div className="mt-12 w-full max-w-xl">
      <h3 className="text-xl font-bold mb-4">댓글 ({comments.length})</h3>

      {/* 댓글 쓰기 창 */}
      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="댓글을 남겨보세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <MyButton label="등록" color="blue" onClick={handleSubmit} />
      </div>

      {/* 댓글 목록 */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 bg-gray-50 rounded">
            <div className="font-bold text-sm mb-1">{comment.author.nickname}</div>
            <div>{comment.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}