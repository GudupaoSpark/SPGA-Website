import { Geist, Geist_Mono } from "next/font/google";
import MaskReveal from "./components/MaskReveal";

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
      className={`${geistSans.className} ${geistMono.className} min-h-screen bg-zinc-50 dark:bg-black`}
    >
      {/* 第一板块：全屏背景动画 */}
      <section className="relative h-screen w-full">
        <MaskReveal />
      </section>

      {/* 后续板块可以继续添加 */}
    </div>
  );
}
