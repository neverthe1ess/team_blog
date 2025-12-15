"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage(){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({email, password, nickname})
            });
            if(response.ok){
                alert("회원가입 성공! ");
                router.push("/login");
            } else {
                alert("회원가입 실패! ");
            }
        } catch(error){
            console.error("Login Error:", error);
        }
    };
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">이메일</label>
                        <input type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="mt-1 block w-full rounded border border-gray-300 p-2" 
                        required></input>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">비밀번호</label>
                        <input type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="mt-1 block w-full rounded border border-gray-300 p-2" 
                        required></input>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">닉네임</label>
                        <input type="text" 
                        value={nickname} 
                        onChange={(e) => setNickname(e.target.value)} 
                        className="mt-1 block w-full rounded border border-gray-300 p-2" 
                        required></input>
                    </div>
                    <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" 
                    >
                    회원가입하기
                    </button>
                </form>
            </div>
        </div>
    );
}