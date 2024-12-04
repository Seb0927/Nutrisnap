import { Navbar } from "@/components/Navbar";
import { Assistant } from "@/components/Assistant";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-start justify-center bg-[#f8f5ed]">
        <Assistant />
      </main>
    </div>
  );
}