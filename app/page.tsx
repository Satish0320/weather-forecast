"use client"

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl mb-4">Welcome to Weather Forecast</h1>
        <Link href="/login" className="block text-blue-500 hover:underline">
          Login
        </Link>
        <Link href="/register" className="block text-blue-500 hover:underline mt-2">
          register
        </Link>
      </div>
    </div>
  );
}