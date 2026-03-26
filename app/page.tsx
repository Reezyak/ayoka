import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold text-white">
          AYOKA COMING
        </h1>
        <Link 
          href="/login" 
          className="text-white border border-white px-6 py-2 hover:bg-white hover:text-black transition-colors"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
