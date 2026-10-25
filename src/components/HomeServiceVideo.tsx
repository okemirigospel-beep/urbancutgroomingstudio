"use client";
import { useEffect, useRef, useState } from "react";
export default function HomeServiceVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    const node = video.current;
    if (!node) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false,
      pending = false,
      blocked = false,
      disposed = false;
    const suspended = () =>
      !visible ||
      document.hidden ||
      !!document.querySelector("dialog[open]") ||
      motion.matches;
    const sync = () => {
      if (suspended()) {
        node.pause();
        if (motion.matches) setShowVideo(false);
        return;
      }
      if (!node.getAttribute("src") || pending || blocked || !node.paused)
        return;
      pending = true;
      node.muted = true;
      void node
        .play()
        .then(() => {
          if (disposed || suspended()) node.pause();
          else setShowVideo(true);
        })
        .catch((error) => {
          if (!disposed && error.name !== "AbortError") {
            blocked = true;
            setShowVideo(false);
          }
        })
        .finally(() => {
          pending = false;
          // Retry only an interrupted attempt when eligible again, never a policy refusal.
          if (!disposed && !blocked && !suspended() && node.paused) sync();
        });
    };
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.preload = "metadata";
        node.src = "/media/refinement/home-service-full.mp4";
        near.disconnect();
        sync();
      },
      { rootMargin: "400px" },
    );
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
        sync();
      },
      { threshold: [0, 0.15] },
    );
    near.observe(node);
    observer.observe(node);
    const dialogs = new MutationObserver(sync);
    dialogs.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["open"],
    });
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    return () => {
      disposed = true;
      near.disconnect();
      observer.disconnect();
      dialogs.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      node.pause();
    };
  }, []);
  return (
    <div className="home-service-media">
      <img
        className="home-service-poster"
        src="/media/refinement/home-service-poster.webp"
        alt="UrbanCut grooming at your location"
        width={720}
        height={1280}
        loading="lazy"
      />
      <video
        ref={video}
        width={720}
        height={1280}
        muted
        playsInline
        loop
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
        aria-hidden="true"
        preload="none"
        poster="/media/refinement/home-service-poster.webp"
        style={{ opacity: showVideo ? 1 : 0 }}
        onError={() => setShowVideo(false)}
      />
    </div>
  );
}
