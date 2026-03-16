"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import logoImage from "../assets/logo/logo.png";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const nav = navRef.current;
    const logo = logoRef.current;
    const links = linksRef.current;

    if (!nav || !logo || !links) return;

    // 入场动画：从小胶囊展开
    gsap.fromTo(
      nav,
      {
        width: 180,
        opacity: 0,
        y: -20,
      },
      {
        width: "calc(100vw - 2rem)",
        maxWidth: 600,
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      }
    );

    // 导航链接淡入
    gsap.fromTo(
      links,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.8,
      }
    );

    // Logo 淡入
    gsap.fromTo(
      logo,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.5,
      }
    );
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div
        ref={navRef}
        className="flex items-center bg-white/40 dark:bg-zinc-800/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-full px-6 py-3"
        style={{
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          width: 180,
        }}
      >
        <Link href="/" className="block shrink-0">
          <Image
            ref={logoRef}
            src={logoImage}
            alt="SPGA Logo"
            className="rounded-lg w-auto h-8"
          />
        </Link>

        <div ref={linksRef} className="flex-1 flex items-center justify-center gap-6 opacity-0">
          <Link
            href="/members"
            className={`text-sm font-medium transition-colors ${
              isActive("/members")
                ? "text-zinc-900 dark:text-white"
                : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            成员
          </Link>
          <Link
            href="/status"
            className={`text-sm font-medium transition-colors ${
              isActive("/status")
                ? "text-zinc-900 dark:text-white"
                : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            状态
          </Link>
        </div>

        <div className="shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
