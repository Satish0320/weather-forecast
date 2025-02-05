"use client"

import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Registerpage(){
    const emailref = useRef<HTMLInputElement>(null)
    const passwordref = useRef<HTMLInputElement>(null)
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const email = await emailref.current?.value;
        const password = await passwordref.current?.value;

        const res = await fetch("api/register",{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }), 
        });

        if (res.ok) {
            router.push("/login")
        }else{
            alert('Registration failed');
            // const data = await res.json()
            // console.log(data);   
        }
    };

return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl mb-4">Register</h2>
      <input
        type="email"
        ref={emailref}
        placeholder="Email"
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
          type="password"
          placeholder="Password"
          ref={passwordref}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
        </div>   
)

}