"use client";
import Image from "next/image";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function HomeServiceVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const node = video.current;
    if (!node) return;
    const pauseHidden = () => {
      if (document.hidden || document.querySelector("dialog[open]"))
        node.pause();
    };
    const viewport = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.15)
          node.pause();
      },
      { threshold: [0, 0.15] },
    );
    viewport.observe(node);
    const dialogs = new MutationObserver(pauseHidden);
    dialogs.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["open"],
    });
    document.addEventListener("visibilitychange", pauseHidden);
    return () => {
      viewport.disconnect();
      dialogs.disconnect();
      document.removeEventListener("visibilitychange", pauseHidden);
      node.pause();
    };
  }, []);
  return (
    <div className="home-service-media">
      <video
        ref={video}
        width={720}
        height={1280}
        playsInline
        controls={started}
        tabIndex={started ? 0 : -1}
        preload="none"
        aria-label="UrbanCut grooming at your location"
      />
      {!started && (
        <button
          type="button"
          className="home-film-start"
          aria-label="Play UrbanCut Home Service film"
          onClick={() => {
            const node = video.current;
            if (!node) return;
            node.src = "/media/service-previews/home-service-feature.mp4";
            node.poster =
              "/media/service-previews/home-service-grooming-poster.webp";
            setStarted(true);
            void node.play().catch(() => {
              /* Native controls remain available after failed playback. */
            });
            requestAnimationFrame(() => node.focus());
          }}
        >
          <Image
            src="/media/service-previews/home-service-grooming-poster.webp"
            width={720}
            height={1280}
            alt=""
            sizes="(max-width: 600px) 80vw, 340px"
          />
          <span>
            <Play aria-hidden="true" fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  );
}
