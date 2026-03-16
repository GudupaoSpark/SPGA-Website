import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Members() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen bg-background text-foreground`}
    >
      <Navbar />

      <main className="pt-24 px-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">成员</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 成员卡片占位 */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white/40 dark:bg-zinc-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg"
            >
              <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-700 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-center">成员 {i}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center mt-2">
                角色描述
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
