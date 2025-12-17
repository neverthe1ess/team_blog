"use client";

import CommentList from "@/components/CommentList";
import MyButton from "@/components/MyButton";
import { apiFetch } from "@/lib/api";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Post{
    id: number;
    title: string;
    content: string;
    authorId: number;
    comments: any[];
}

interface JwtPayload {
    sub: number;
}

export default function DetailedPage(){
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [post, setPost] = useState<Post | null>(null);
    const [showDeleteButton, setShowDeleteButton] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await apiFetch(`http://localhost:3000/posts/${id}`);
                if(!res.ok) throw new Error("Failed to fetch post");
                const data = await res.json();
                setPost(data);
            } catch(e){
                console.error(e);
                setPost(null);
            }
        };
        fetchPost();
    }, [id]);

    useEffect(() => {
        if(!post) return;

        const token = localStorage.getItem('accessToken');
        if(!token) return;

        const myInfo = jwtDecode<JwtPayload>(token);

        if(post.authorId === myInfo.sub){
            setShowDeleteButton(true);
        } else {
            setShowDeleteButton(false);
        }
    }, [post]);

    const handleDelete = async () => {
        if(!confirm("정말로 삭제하시겠습니까?")) return;

        const token = localStorage.getItem('accessToken');
        
        try {
            const res = await apiFetch(`http://localhost:3000/posts/${id}`,{
            method: "DELETE",
            headers:{
                Authorization: `Bearer ${token}`,
            }
        });

        if(!res.ok){
            alert("삭제 실패!");
            return;
        }
        alert("삭제 완료했습니다!");
        router.push('/');
        }  catch(e) {
            console.error(e);
            alert("삭제에 실패했습니다.");
        }
    };

    if (!post) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="p-24 flex flex-col items-center">
            <div className="max-w-xl w-full bg-white text-black p-8 rounded shadow">
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <p className="text-gray-700 min-h-[200px]">{post.content}</p>
                <div className="mt-8 flex justify-end">
                    <MyButton label="목록으로" color="blue" onClick={() => router.back()}></MyButton>
                    {showDeleteButton && (
                        <>
                            <MyButton label="삭제하기" color="red" onClick={handleDelete}></MyButton>
                            <MyButton label="수정하기" color="red" onClick={() => router.push(`/edit/${id}`)}></MyButton>
                        </>
                    )}
                </div>
                <div className="mt-8 border-t pt-8 w-full">
                    <CommentList postId={id} initialComments={post.comments} />
                </div>
            </div>
        </div>
    );
}