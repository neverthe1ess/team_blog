"use client";

import MyButton from "@/components/MyButton";
import { apiFetch } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function EditPage(){
    const router = useRouter();
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await apiFetch(`http://localhost:3000/posts/${id}`);
                if(!res.ok) throw new Error("Failed to fetch post");
                const data = await res.json();
                setTitle(data.title);
                setContent(data.content);
            } catch(e){
                console.error(e);
                setTitle("");
                setContent("");
            }
        }
        fetchPost();
    },[])
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("accessToken");
        if(!token){
            alert("로그인이 필요합니다.");
            router.push('/login');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/posts/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token}`
                },
                body:JSON.stringify({title, content})
            });
            if(response.ok){
                alert("수정이 완료되었습니다.");
                router.push("/");
            } else {
                alert("수정 실패!");
            }
        } catch (error) {
            console.error("수정 오류! : " + error);
        }
    }
    
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold mb-8">수정하기</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
                    <div>
                        <label className="block mb-2 font-bold">제목</label>
                        <input type="text"
                        className="w-full p-2 border rounded text-black"
                        placeholder="제목을 입력하세요"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        ></input>

                    </div>
                    <div>
                        <label className="block mb-2 font-bold">내용</label>
                        <textarea className="w-full p-2 border rounded h-40 text-black resize-none"
                        placeholder="무슨 생각을 하고 계신가요?" required
                        value={content} onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="flex gap-2 justify-end mt-4">
                        <MyButton label="취소" color="red" onClick={() => router.back()}></MyButton>
                        <MyButton label="수정" color="blue" type="submit"></MyButton>
                    </div>
                </form>
        </div>
    );

}