"use client";
import { useState } from "react";
import { signInWithMagicLink } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithMagicLink(email);
      setMessage("Check your email for the magic link!");
    } catch (err) {
      setMessage("Error sending link, try again.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login with Email</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Send Magic Link
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </main>
  );
}
