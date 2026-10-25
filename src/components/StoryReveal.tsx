"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
export default function StoryReveal({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const node = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches || !node.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={node}
      className={`${className} story-reveal${entered ? " has-entered" : ""}`}
    >
      {children}
    </div>
  );
}
