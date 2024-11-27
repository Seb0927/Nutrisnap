import { Navbar } from "@/components/Navbar";
import { NutritionAnalyzer } from "@/components/NutritionAnalyzer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-start justify-center bg-[#f8f5ed]">
        <NutritionAnalyzer />
      </main>
    </div>
  );
}
