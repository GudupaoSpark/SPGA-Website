import { Geist, Geist_Mono } from "next/font/google";
import MaskReveal from "./components/MaskReveal";
import { Navbar } from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen bg-background text-foreground`}
    >
      <Navbar />

      {/* 第一板块：全屏背景动画 */}
      <section className="relative h-screen w-full">
        <MaskReveal />
      </section>

      {/* 简介板块 */}
      <section id="about" className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-white">
            关于我们
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            这里是简介内容...
          </p>
        </div>
      </section>

      {/* 成员板块 */}
      <section id="members" className="min-h-screen py-20 px-4 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-white">
            团队成员
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            这里是成员内容...
          </p>
        </div>
      </section>
    </div>
  );
}
