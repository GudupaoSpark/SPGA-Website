"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import logoImage from "../assets/logo/logo.png";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const hasPlayedEntrance = useRef(false);
  const isAnimating = useRef(false);
  const animationTl = useRef<gsap.core.Timeline | null>(null);

  // 初始化时检查滚动位置
  useEffect(() => {
    const scrollY = window.scrollY;
    const threshold = 100;
    setIsScrolled(scrollY > threshold);
    setIsInitialized(true);
  }, []);

  // 入场动画
  useEffect(() => {
    const nav = navRef.current;
    const logo = logoRef.current;
    const links = linksRef.current;

    if (!nav || !logo || !links || !isInitialized) return;

    // 入场动画只执行一次
    if (hasPlayedEntrance.current) return;

    hasPlayedEntrance.current = true;
    isAnimating.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    // 根据当前滚动位置决定初始状态
    if (isScrolled) {
      // 已经滚动了，直接设置为收缩状态
      gsap.set(nav, {
        width: 240,
        maxWidth: 240,
        opacity: 1,
        y: 0,
      });
      gsap.set(links, {
        opacity: 0,
        scaleX: 0,
      });
      tl.fromTo(
        logo,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    } else {
      // 在顶部，入场动画：从小胶囊展开
      tl.fromTo(
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
      tl.fromTo(
        links,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      );

      // Logo 淡入
      tl.fromTo(
        logo,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.4"
      );
    }
  }, [isInitialized, isScrolled]);

  // 滚动监听
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 100;
      const newScrolled = scrollY > threshold;

      if (newScrolled !== isScrolled) {
        setIsScrolled(newScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  // 滚动动画效果
  useEffect(() => {
    const nav = navRef.current;
    const links = linksRef.current;

    if (!nav || !links || !hasPlayedEntrance.current) return;

    // 取消之前的动画
    if (animationTl.current) {
      animationTl.current.kill();
    }

    // 创建新的 timeline
    const tl = gsap.timeline();
    animationTl.current = tl;

    if (isScrolled) {
      // 滚动后：缩小导航栏，隐藏中间链接
      tl.to(nav, {
        width: 240,
        maxWidth: 240,
        duration: 0.6,
        ease: "back.in(1.5)",
      });
      tl.to(
        links,
        {
          opacity: 0,
          scaleX: 0,
          duration: 0.4,
          ease: "back.in(1.5)",
        },
        0
      );
    } else {
      // 回到顶部：恢复导航栏
      tl.to(nav, {
        width: "calc(100vw - 2rem)",
        maxWidth: 600,
        duration: 0.7,
        ease: "back.out(1.5)",
      });
      tl.to(
        links,
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.5,
          ease: "back.out(1.5)",
        },
        0.15
      );
    }
  }, [isScrolled]);

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

        <div ref={linksRef} className="flex-1 flex items-center justify-center gap-6 opacity-0 overflow-hidden">
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
          <a
            href="https://space.bilibili.com/642078584"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium transition-colors text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
          >
            联系
          </a>
        </div>

        <div className="shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
