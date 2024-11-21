import Image from "next/image";
import { Navbar } from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-[#f8f5ed]">
        <h1 className="text-4xl font-bold text-[#8c7851]">I'm nutrisnap!</h1>
      </main>
    </div>
  );
}
