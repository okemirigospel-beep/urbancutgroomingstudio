"use client";
import { useEffect, useRef, type ReactNode } from "react";
export default function StoryReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  replay = true,
  sequence = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "inward";
  delay?: number;
  replay?: boolean;
  sequence?: boolean;
  as?: "div" | "figure";
}) {
  const node = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = node.current;
    if (!el || !window.IntersectionObserver || !el.animate) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = matchMedia("(max-width: 767px)");
    let armed = true;
    let animations: Animation[] = [];
    const cancel = () => {
      animations.forEach((a) => a.cancel());
      animations = [];
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          if (replay) armed = true;
          cancel();
          return;
        }
        if (!armed || entry.intersectionRatio < 0.12) return;
        armed = false;
        if (motion.matches || el.contains(document.activeElement)) return;
        cancel();
        const targets = sequence
          ? Array.from(el.querySelectorAll<HTMLElement>("[data-reveal-step]"))
          : [el];
        animations = targets.map((target, i) =>
          target.animate(
            [
              {
                opacity: 0,
                transform:
                  direction === "inward" && !mobile.matches
                    ? "translateX(24px)"
                    : "translateY(24px)",
                ...(sequence ? { clipPath: "inset(0 100% 0 0)" } : {}),
              },
              {
                opacity: 1,
                transform: "none",
                ...(sequence ? { clipPath: "inset(0)" } : {}),
              },
            ],
            {
              duration: 1200,
              delay: sequence
                ? ([0, 450, 950][i] ?? 0)
                : mobile.matches
                  ? 0
                  : delay,
              easing: "cubic-bezier(.22,.61,.36,1)",
              fill: "backwards",
            },
          ),
        );
      },
      { threshold: [0, 0.12] },
    );
    observer.observe(el);
    const preference = () => {
      if (motion.matches) cancel();
    };
    motion.addEventListener("change", preference);
    el.addEventListener("focusin", cancel);
    return () => {
      observer.disconnect();
      cancel();
      motion.removeEventListener("change", preference);
      el.removeEventListener("focusin", cancel);
    };
  }, [direction, delay, replay, sequence]);
  return (
    <Tag
      ref={(el) => {
        node.current = el;
      }}
      className={className}
      data-reveal-group
    >
      {children}
    </Tag>
  );
}
