// frontend/src/app/page.tsx
"use client"

import { useEffect, useState } from "react";
import MyButton from "@/components/MyButton";
import { useRouter } from "next/navigation";

interface Post{
  id: number;
  title: string;
  content: string;
}


// 1. 이게 바로 '컴포넌트'입니다. 그냥 함수에요!
export default function Home(){
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [likes, setLikes] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const logout = () => {
    localStorage.removeItem('accessToken');
    alert("로그아웃 되었습니다.");
    router.replace("/login")
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
      console.log("환영 메시지가 종료됨!");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/posts?page=${page}`)
      .then((res)=> res.json())
      .then((data)=> {
        console.log("데이터 도착!", data);
        setPosts(data.data);
        setTotalPages(data.meta.lastPage);
      });
  }, [page]);
  // eslint-disable-next-line
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if(token){
      setIsLoggedIn(true);
    }
  },[]);


  const title = "나만의 학습 게시판";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      {showWelcome && (
        <div className="fixed top-10 bg-green-500 text-white px-6 py-3 rounded-full shadow-xl animate-bounce">
          환영합니다 ! (3초 뒤 사라져요)
        </div>
      )}
      <h1 className="text-4xl font-bold mb-8">
        {title}
      </h1>

      <div className="w-full max-w-md bg-white text-black rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">최신 글</h2>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} 
            className="p-4 bg-gray-100 rounded hover:bg-gray-200 transition cursor-pointer"
            onClick={() => router.push(`posts/${post.id}`)}>
              <h3 className="font-bold text-lg">{post.title}</h3>
              <p className="text-gray-600">{post.content}</p>
            </li>
          ))}

        </ul>
      </div>


      {/* 페이지네이션 버튼 */}
      <div className="mb-8 flex gap-2 justify-center mt-8">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`px-4 py-2 rounded ${
              page === pageNum ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      <div className="mb-8 text-center">
        <p className="text-2xl mb-2">❤️ 좋아요: {likes}</p>
        <button onClick={() => setLikes(likes + 1)} className={`bg-pink-500 text-white font-bold py-2 px-6 rounded-full 
        hover:bg-pink-600 transition`}>좋아요 누르기</button>
      </div>

      <div className="flex gap-4">
        {isLoggedin ? (
          <>
            <MyButton label="로그아웃" color="blue" onClick={logout}></MyButton>
            <MyButton label="글쓰기" color="blue" onClick={() => router.push('/write')}></MyButton>
          </>
        ) : (
          <>
            <MyButton label="로그인" color="blue" onClick={() => router.push('/login')}></MyButton>
            <MyButton label="회원가입" color="blue" onClick={() => router.push('/signup')}></MyButton>
          </>
        )}
      </div>


    </div>
  );
}