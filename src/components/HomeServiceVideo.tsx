"use client";
import { useEffect, useRef } from "react";
import { shouldAutoplayFeature } from "@/lib/service-media";

export default function HomeServiceVideo() {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const node = video.current;
    if (!node) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let userPaused = false;
    let blocked = false;
    let pending = false;
    let disposed = false;
    let lifecyclePauses = 0;
    const suspended = () =>
      !visible || document.hidden || !!document.querySelector("dialog[open]");
    const pauseForLifecycle = () => {
      if (!node.paused) {
        lifecyclePauses++;
        node.pause();
      }
    };
    const sync = () => {
      if (suspended() || motion.matches) {
        pauseForLifecycle();
        return;
      }
      if (
        !node.getAttribute("src") ||
        pending ||
        !node.paused ||
        !shouldAutoplayFeature({
          visible,
          hidden: document.hidden,
          dialog: !!document.querySelector("dialog[open]"),
          reduced: motion.matches,
          userPaused,
          blocked,
        })
      )
        return;
      pending = true;
      void node
        .play()
        .then(() => {
          if (disposed || suspended() || motion.matches) pauseForLifecycle();
        })
        .catch((error) => {
          // A lifecycle interruption is not an autoplay-policy refusal.
          if (!disposed && error.name !== "AbortError") blocked = true;
        })
        .finally(() => {
          pending = false;
          if (!disposed) sync();
        });
    };
    const onPause = () => {
      if (lifecyclePauses) {
        lifecyclePauses--;
        return;
      }
      userPaused = true;
    };
    const onPlay = () => {
      if (suspended()) {
        pauseForLifecycle();
        return;
      }
      // Native controls are also the recovery path after blocked autoplay.
      userPaused = false;
      blocked = false;
    };
    node.addEventListener("pause", onPause);
    node.addEventListener("play", onPlay);
    const nearby = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.preload = "metadata";
        node.src = "/media/service-previews/home-service-feature-silent.mp4";
        nearby.disconnect();
        sync();
      },
      { rootMargin: "400px" },
    );
    const viewport = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
        sync();
      },
      { threshold: [0, 0.15] },
    );
    nearby.observe(node);
    viewport.observe(node);
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
      nearby.disconnect();
      viewport.disconnect();
      dialogs.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      node.removeEventListener("pause", onPause);
      node.removeEventListener("play", onPlay);
      pauseForLifecycle();
    };
  }, []);
  return (
    <div className="home-service-media">
      <video
        ref={video}
        width={720}
        height={1280}
        muted
        playsInline
        loop
        controls
        preload="none"
        poster="/media/service-previews/home-service-grooming-poster.webp"
        aria-label="UrbanCut grooming at your location"
      />
    </div>
  );
}
