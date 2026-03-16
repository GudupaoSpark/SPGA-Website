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

export default function Status() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen bg-background text-foreground`}
    >
      <Navbar />

      <main className="pt-24 px-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">状态</h1>

        <div className="space-y-6">
          {/* 状态卡片占位 */}
          <div className="bg-white/40 dark:bg-zinc-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">项目进度</h2>
            <div className="space-y-3">
              {["项目 A", "项目 B", "项目 C"].map((project, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span>{project}</span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    进行中
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/40 dark:bg-zinc-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">最近动态</h2>
            <div className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
              <p>暂无动态</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
