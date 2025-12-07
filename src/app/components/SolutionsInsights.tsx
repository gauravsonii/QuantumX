"use client";
import React, { useCallback, useEffect, useRef } from "react";
import Image from "next/image";

type Card = {
  no: string;
  title: string;
  description: string;
  symbolSrc: string;
  bg: string; // tailwind bg class for the right media panel
  shapeViewBox: string;
  shapePath: string;
  color: string; // hex background color for the full card
};

const CARDS: Card[] = [
  {
    no: "01",
    title: "Fast. Powerful. Secure.",
    description:
      "The groundbreaking QuantumX consensus powers a network of fast, efficient, highly-optimized chains that finalize transactions almost instantly. Accompanied by a best-in-class developer experience and suite of tools, QuantumX is the platform of choice for builders and users ready for what’s next in Web3.",
    symbolSrc: "/assets/home/card1.svg",
    bg: "bg-neutral-100 dark:bg-slate-600",
    shapeViewBox: "0 0 380 658",
    shapePath:
      "M 13 1 L 294 1 Q 305 1 316 12 L 369 63 Q 379 75 379 86 L 379 645 Q 380 658 367 657 L 13 657 Q 0 658 1 645 L 1 13 Q 0 0 13 1 Z",
    color: "#F6F6F6",
  },
  {
    no: "02",
    title: "Infinitely Scalable by Design",
    description:
      "QuantumX is where Web3's big ideas scale with confidence. Whether it’s a single application, or launching a fully-customizable Layer 1 blockchain, QuantumX makes it easy to scale up — or across — in an interconnected ecosystem.",
    symbolSrc: "/assets/home/card2.svg",
    bg: "bg-blue-600",
    shapeViewBox: "0 0 380 600",
    shapePath:
      "M 13 1 L 294 1 Q 305 1 316 12 L 369 63 Q 379 75 379 86 L 379 587 Q 380 600 367 599 L 13 599 Q 0 600 1 587 L 1 13 Q 0 0 13 1 Z",
    color: "#0061E2",
  },
  {
    no: "03",
    title: "Customizable Layer 1s",
    description:
      "Whatever your use-case, QuantumX makes launching your own L1 more economically feasible, simpler to customize, smoother to maintain and quicker to bring to market. The network is anchored by a lightning-fast and efficient primary chain and a universe of sovereign blockchains, all natively connected through QuantumX Interchain Messaging.",
    symbolSrc: "/assets/home/card3.svg",
    bg: "bg-gray-500 dark:bg-slate-800",
    shapeViewBox: "0 0 380 450",
    shapePath:
      "M 13 1 L 294 1 Q 305 1 316 12 L 369 63 Q 379 75 379 86 L 379 437 Q 380 450 367 449 L 13 449 Q 0 450 1 437 L 1 13 Q 0 0 13 1 Z",
    color: "#6D6D6D",
  },
  {
    no: "04",
    title: "Global Community",
    description:
      "QuantumX is more than just a blockchain network. It's a global community of builders, creators, and collaborators, all together on a mission to drive the adoption of blockchain technology. There are no gatekeepers, just an open ecosystem where knowledge and resources are shared, creating a global movement ready to turn ideas into real-world impact.",
    symbolSrc: "/assets/home/card4.svg",
    bg: "bg-red-500",
    shapeViewBox: "0 0 380 509",
    shapePath:
      "M 13 1 L 294 1 Q 305 1 316 12 L 369 63 Q 379 75 379 86 L 379 496 Q 380 509 367 508 L 13 508 Q 0 509 1 496 L 1 13 Q 0 0 13 1 Z",
    color: "#FF394A",
  },
];

function CornerShape({ viewBox, d }: { viewBox: string; d: string }) {
  return (
    <svg
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={viewBox}
      aria-hidden="true"
    >
      <path strokeWidth="1.5" stroke="currentColor" fill="none" d={d}></path>
    </svg>
  );
}

export default function SolutionsInsights() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  // Ensure refs length matches cards length
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, CARDS.length);
  }, []);

  const updateOffsets = useCallback(() => {
    const step = Math.max(48, Math.min(96, Math.round(window.innerHeight * 0.075)));
    cardRefs.current.forEach((el, idx) => {
      if (!el) return;
      el.style.setProperty("--index", String(idx));
      el.style.setProperty("--offset", `${step * idx}px`);
    });
  }, []);

  useEffect(() => {
    updateOffsets();
    window.addEventListener("resize", updateOffsets);
    return () => window.removeEventListener("resize", updateOffsets);
  }, [updateOffsets]);

  // Toggle .visible when section is in view
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) root.classList.add("visible");
        else root.classList.remove("visible");
      },
      { threshold: 0.25 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section id="solutions-insights" className="relative w-full bg-white dark:bg-white">
      <div
        id="solutions-insights-inner"
        ref={sectionRef}
        className="group/section animate-in-view w-full flex flex-col items-stretch justify-start gap-8 p-4 md:p-6 transition-mode bg-transparent relative z-10"
        style={{
          // @ts-expect-error custom property
          "--insight-card-height": "100lvh",
        }}
      >
        {/* Outer frame background overlay (sticky within section) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-[calc(var(--insight-card-height)-var(--navbar-height))] sticky top-[var(--navbar-height)] corner-background-top text-transparent border-t border-black">
            <svg
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1045 692"
              aria-hidden="true"
            >
              <rect width="100%" height="100%" fill="#000000" />
              <path
                strokeWidth="0"
                stroke="none"
                fill="#ffffff"
                d="M 17 0 L 957 0 Q 970 0 983 13 L 1032 62 Q 1045 75 1045 88 L 1045 675 Q 1045 692 1028 692 L 17 692 Q 0 692 0 675 L 0 17 Q 0 0 17 0 Z"
              />
              {/* White-out the bottom band to remove black corners at the bottom only */}
              <rect x="0" y="675" width="100%" height="40" fill="#ffffff" />
            </svg>
          </div>
        </div>

        <div className="relative flex flex-col items-stretch justify-start text-black">
          <h2 className="uppercase mb-10 md:mb-12 lg:mb-16 leading-[0.8] text-[clamp(2.75rem,12vw,9rem)]">
            <span className="inline-block pl-2 pr-2 pt-1">Why</span>
            <span className="block pl-2 pt-1">QuantumX</span>
          </h2>

          {CARDS.map((card, idx) => (
            <div
              key={card.no}
              ref={(el) => {
                if (el) cardRefs.current[idx] = el;
              }}
              className={
                "insight sticky top-[calc(var(--navbar-height)+var(--padding-md)+var(--offset))] " +
                "h-[calc(var(--insight-card-height)-var(--navbar-height)-var(--offset)-var(--padding-md)*2)] " +
                "grid grid-cols-1 place-items-stretch lg:grid-cols-[2fr_1.2fr] will-change-transform transition-mode " +
                "text-black dark:text-white"
              }
            >
              {/* Left/Text column */}
              <div
                className={`relative h-full flex flex-col lg:flex-row gap-4 lg:gap-8 p-4 lg:pr-16 border border-current rounded-2xl ${idx === 0 ? "text-black" : "text-white"}`}
                style={{ backgroundColor: card.color, borderColor: "#DADADA" }}
              >
                <p className="font-mono text-sm opacity-80">{card.no}</p>
                <div className="relative flex flex-col items-start justify-between gap-4 h-full">
                  <div className="flex flex-col gap-2">
                    <h3 className="leading-none uppercase pr-6 lg:pr-0 text-[clamp(1.25rem,2.4vw,2.25rem)] lg:text-[clamp(1.5rem,2.2vw,3rem)]">
                      {card.title}
                    </h3>
                    <p className="text-[1rem] sm:text-lg leading-[1.2] opacity-90">
                      {card.description}
                    </p>
                  </div>
                  {/* Bottom-left QuantumX logo aligned with text start */}
                  <div className="absolute bottom-3 left-0 z-10 pointer-events-none select-none">
                    <Image
                      src="/assets/home/logo.svg"
                      alt="QuantumX logo"
                      width={56}
                      height={56}
                      className="w-14 h-14 opacity-90"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>

              {/* Right/Media column (only the corner SVG overlay) */}
              <div className="relative h-full">
                {/* Centered per-card symbol */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <Image
                    src={card.symbolSrc}
                    alt={`${card.title} symbol`}
                    width={201}
                    height={200}
                    className="h-20 py-1 lg:h-[clamp(6.625rem,-0.089rem+10.491vw,12.5rem)] w-auto shrink-0"
                    priority={idx === 0}
                  />
                </div>
                <div className="absolute inset-0 z-10 pointer-events-none" style={{ color: "#DADADA" }}>
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 380 658"
                    aria-hidden="true"
                  >
                    <path
                      strokeWidth="1"
                      stroke="currentColor"
                      fill={card.color}
                      d="M 13 1 L 294 1 Q 305 1 316 12 L 369 63 Q 379 75 379 86 L 379 645 Q 380 658 367 657 L 13 657 Q 0 658 1 645 L 1 13 Q 0 0 13 1 Z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
