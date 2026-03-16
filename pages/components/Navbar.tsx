"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import logoImage from "../assets/logo/logo.png";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const links = linksRef.current;
    const logo = logoRef.current;

    if (!nav || !links || !logo) return;

    // 入场动画：从小胶囊展开成完整导航栏
    gsap.fromTo(
      nav,
      {
        width: 180,
        opacity: 0,
        y: -20,
      },
      {
        width: "calc(100vw - 2rem)",
        maxWidth: 1152,
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      }
    );

    gsap.fromTo(
      links,
      {
        opacity: 0,
        width: 0,
      },
      {
        opacity: 1,
        width: "auto",
        duration: 0.8,
        ease: "power3.out",
        delay: 0.8,
      }
    );

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

    // 滚动收缩动画
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "+=150",
        scrub: 0.5,
      },
    });

    // 导航栏向中间收缩
    scrollTl.to(
      nav,
      {
        width: 180,
        maxWidth: 180,
        duration: 0.5,
        ease: "power2.out",
      },
      0
    );

    // 导航选项淡出并收起
    scrollTl.to(
      links,
      {
        opacity: 0,
        width: 0,
        duration: 0.3,
        ease: "power2.out",
      },
      0
    );

    // Logo 缩小
    scrollTl.to(
      logo,
      {
        scale: 0.75,
        duration: 0.3,
        ease: "power2.out",
      },
      0
    );

    // 内边距缩小
    scrollTl.to(
      nav,
      {
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        duration: 0.3,
        ease: "power2.out",
      },
      0
    );

    // 链接hover效果
    const linkElements = links.querySelectorAll("a");
    const handleMouseEnter = (link: Element) => {
      gsap.to(link, {
        y: -2,
        duration: 0.2,
        ease: "power2.out",
      });
    };
    const handleMouseLeave = (link: Element) => {
      gsap.to(link, {
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    linkElements.forEach((link) => {
      link.addEventListener("mouseenter", () => handleMouseEnter(link));
      link.addEventListener("mouseleave", () => handleMouseLeave(link));
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div
        ref={navRef}
        className="flex items-center bg-white/30 dark:bg-zinc-900/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/20 dark:border-zinc-700/30 rounded-full"
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 12,
          paddingBottom: 12,
          width: 180,
        }}
      >
        {/* Logo 区域 */}
        <div ref={leftRef} className="shrink-0">
          <Image
            ref={logoRef}
            src={logoImage}
            alt="SPGA Logo"
            className="rounded-lg w-auto h-8"
          />
        </div>

        {/* 中间导航选项 */}
        <div
          ref={linksRef}
          className="flex-1 flex items-center justify-center gap-6 overflow-hidden"
          style={{ width: 0, opacity: 0 }}
        >
          <Link
            href="#about"
            className="text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition-colors font-medium text-sm whitespace-nowrap"
          >
            简介
          </Link>
          <Link
            href="#members"
            className="text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition-colors font-medium text-sm whitespace-nowrap"
          >
            成员
          </Link>
        </div>

        {/* 右侧主题切换 */}
        <div ref={rightRef} className="shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
