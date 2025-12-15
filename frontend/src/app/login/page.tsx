// frontend/src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // 페이지 이동을 위해 필요!

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");     // 이메일 입력값
  const [password, setPassword] = useState(""); // 비밀번호 입력값

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 중요: 폼 제출 시 새로고침 방지
    
    // 백엔드로 로그인 요청
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // 💾 토큰 저장 (Mission 1)
        localStorage.setItem("accessToken", data.access_token);
        
        alert("로그인 성공! 🔑");
        router.push("/"); // 메인 페이지로 이동
      } else {
        alert("로그인 실패!");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            로그인하기
          </button>
        </form>
      </div>
    </div>
  );
}