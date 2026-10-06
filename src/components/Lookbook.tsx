"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  lookbookPhotos,
  galleryIndex,
  LOOKBOOK_TRANSITION_MS,
} from "@/lib/lookbook";

function useReducedMotion() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

function LookbookVideo() {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [hasPlayed, setHasPlayed] = useState(false);
  useEffect(() => {
    const update = () => setTabVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    const preloader = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: "300px" },
    );
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (frame.current) {
      preloader.observe(frame.current);
      observer.observe(frame.current);
    }
    return () => {
      preloader.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  useEffect(() => {
    const node = video.current;
    if (!node) return;
    let cancelled = false;
    if (near && visible && tabVisible && !reduced) {
      node.muted = true;
      void node.play().catch(() => {
        if (!cancelled) setHasPlayed(false);
      });
    } else node.pause();
    return () => {
      cancelled = true;
      node.pause();
    };
  }, [near, visible, tabVisible, reduced]);
  return (
    <div
      className="lookbook-frame lookbook-video"
      ref={frame}
      role="img"
      aria-label="Grooming process at the studio"
    >
      <img
        className="lookbook-poster"
        src="/media/lookbook/lookbook-poster.jpg"
        width={540}
        height={960}
        alt=""
        loading="lazy"
      />
      <video
        ref={video}
        src={
          near && !reduced ? "/media/lookbook/lookbook-grooming.mp4" : undefined
        }
        poster="/media/lookbook/lookbook-poster.jpg"
        muted
        loop
        playsInline
        preload="none"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
        aria-hidden="true"
        style={{ opacity: hasPlayed && !reduced ? 1 : 0 }}
        onPlaying={() => setHasPlayed(true)}
        onError={() => setHasPlayed(false)}
      />
    </div>
  );
}

function LookbookPhotos() {
  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState<{
    next: number;
    direction: -1 | 1;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const reduced = useReducedMotion();
  const locked = useRef(false);
  const mounted = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const imageLoads = useRef(new Map<string, Promise<void>>());
  const frame = useRef<HTMLDivElement>(null);
  const [manual, setManual] = useState(false);
  const manualRef = useRef(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const eligible = useRef(false);
  const autoplay = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queued = useRef<-1 | 1 | null>(null);
  const navigateRef = useRef<
    (direction: -1 | 1, automatic?: boolean, base?: number) => void
  >(() => {});
  function stopAutoplay() {
    manualRef.current = true;
    setManual(true);
    if (autoplay.current) clearTimeout(autoplay.current);
  }
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const motion = () => {
      if (media.matches) stopAutoplay();
    };
    const visibility = () => setTabVisible(!document.hidden);
    motion();
    visibility();
    media.addEventListener("change", motion);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(
      ([entry]) =>
        setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.1),
      { threshold: 0.1 },
    );
    if (frame.current) observer.observe(frame.current);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", motion);
      document.removeEventListener("visibilitychange", visibility);
      if (autoplay.current) clearTimeout(autoplay.current);
    };
  }, []);
  eligible.current = visible && tabVisible && !reduced && !manual;
  useEffect(() => {
    if (!eligible.current || busy) return;
    autoplay.current = setTimeout(() => {
      if (!manualRef.current && eligible.current) navigateRef.current(1, true);
    }, 3000);
    return () => {
      if (autoplay.current) clearTimeout(autoplay.current);
    };
  }, [visible, tabVisible, reduced, manual, busy, index]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  function prepare(next: number) {
    const src = lookbookPhotos[next].src;
    let promise = imageLoads.current.get(src);
    if (!promise) {
      const image = new window.Image();
      image.src = src;
      promise = image.decode().catch((error) => {
        imageLoads.current.delete(src);
        throw error;
      });
      imageLoads.current.set(src, promise);
    }
    return promise;
  }
  useEffect(() => {
    // Only the displayed image and its two neighbours are requested initially.
    for (const next of [index, galleryIndex(index, 1), galleryIndex(index, -1)])
      void prepare(next).catch(() => {});
  }, [index]);
  function finish(next: number) {
    if (timer.current) clearTimeout(timer.current);
    if (!mounted.current) return;
    setIndex(next);
    setTransition(null);
    setBusy(false);
    locked.current = false;
    const direction = queued.current;
    queued.current = null;
    if (direction !== null)
      queueMicrotask(() => {
        if (mounted.current) navigateRef.current(direction, false, next);
      });
  }
  useEffect(() => {
    if (reduced && transition) finish(transition.next);
  }, [reduced, transition]);
  async function navigate(direction: -1 | 1, automatic = false, base = index) {
    if (!automatic) stopAutoplay();
    if (locked.current) {
      if (!automatic && queued.current === null) queued.current = direction;
      return;
    }
    locked.current = true;
    setBusy(true);
    setError("");
    const next = galleryIndex(base, direction);
    try {
      await prepare(next);
      if (!mounted.current) return;
      if (automatic && (manualRef.current || !eligible.current)) {
        finish(base);
        return;
      }
      if (reduced) {
        finish(next);
        return;
      }
      setTransition({ next, direction });
      // Safety cleanup only, never an automatic advancement timer.
      timer.current = setTimeout(
        () => finish(next),
        LOOKBOOK_TRANSITION_MS + 80,
      );
    } catch {
      if (!mounted.current) return;
      finish(base);
      setError("This photograph could not load. Please try again.");
    }
  }
  navigateRef.current = navigate;
  const photo = (next: number, className: string, hidden: boolean) => {
    const item = lookbookPhotos[next];
    return (
      <img
        key={item.id}
        className={className}
        src={item.src}
        width={item.width}
        height={item.height}
        alt={item.alt}
        aria-hidden={hidden}
        data-lookbook-id={item.id}
        style={{ objectFit: item.fit, objectPosition: item.position }}
        onAnimationEnd={
          className.includes("incoming") ? () => finish(next) : undefined
        }
      />
    );
  };
  return (
    <div className="lookbook-photo-column" aria-label="Photograph gallery">
      <div
        className={`lookbook-frame lookbook-photos ${transition ? (transition.direction === 1 ? "go-next" : "go-previous") : ""}`}
        ref={frame}
        aria-busy={busy}
      >
        {photo(
          index,
          transition ? "lookbook-photo outgoing" : "lookbook-photo",
          !!transition,
        )}
        {transition && photo(transition.next, "lookbook-photo incoming", false)}
      </div>
      <div className="lookbook-navigation">
        <button
          type="button"
          aria-label="Previous photograph"
          onClick={() => void navigate(-1)}
        >
          <ArrowLeft size={22} strokeWidth={1.8} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Next photograph"
          onClick={() => void navigate(1)}
        >
          <ArrowRight size={22} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
      <p
        className="sr-only"
        aria-live={manual ? "polite" : "off"}
        aria-atomic="true"
      >
        {error || `Photograph ${index + 1} of ${lookbookPhotos.length}.`}
      </p>
    </div>
  );
}

export default function Lookbook() {
  return (
    <section
      id="gallery"
      className="lookbook section shell"
      aria-labelledby="lookbook-heading"
    >
      <h2 id="lookbook-heading" className="type-editorial uc-section-title">
        The UrbanCut Lookbook
      </h2>
      <p className="lookbook-intro">
        Precision in every cut. Care in every detail. Explore the finishes that
        define the UrbanCut experience.
      </p>
      <div className="lookbook-grid">
        <LookbookVideo />
        <LookbookPhotos />
      </div>
    </section>
  );
}
