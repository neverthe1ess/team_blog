// frontend/src/app/page.tsx
"use client"

import { useState } from "react";
import MyButton from "@/components/MyButton";

const DUMMY_POSTS = [
  {id: 1, title: "Next.js 공부하기", content: "생각보다 재밌네요!"},
  {id: 2, title: "React 기초 정복", content: "State, Props 정복 완료."},
  {id: 3, title: "코딩 실력 늘리는 법", content: "매일매일 꾸준히 하기."},
];


// 1. 이게 바로 '컴포넌트'입니다. 그냥 함수에요!
export default function Home(){

  const [likes, setLikes] = useState(0);
  const title = "나만의 학습 게시판";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">
        {title}
      </h1>

      <div></div>

      <div className="mb-8 text-center">
        <p className="text-2xl mb-2">❤️ 좋아요: {likes}</p>
        <button onClick={() => setLikes(likes + 1)} className="bg-pink-500 text-white font-bold py-2 px-6 rounded-full 
        hover:bg-pink-600 transition">좋아요 누르기</button>
      </div>


      <div className="flex gap-4">
        <MyButton label="로그인" color="blue"></MyButton>
        <MyButton label="회원가입" color="blue"></MyButton>
      </div>
    </div>
  );
}