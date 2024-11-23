import { Navbar } from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-[#f8f5ed]">
        <h1>Inicia sesión!</h1>
      </main>
    </div>
  );
}
