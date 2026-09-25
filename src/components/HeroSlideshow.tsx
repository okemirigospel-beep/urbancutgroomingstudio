"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { heroPhotos } from "@/lib/hero";

export default function HeroSlideshow() {
  const region = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [loaded, setLoaded] = useState<number[]>([]);
  const [failed, setFailed] = useState<number[]>([]);
  const running =
    !paused && !reduced && visible && tabVisible && !hovered && !focused;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduced(query.matches);
    const updateTab = () => setTabVisible(!document.hidden);
    // Cached images can finish before React attaches onLoad during hydration.
    const cached = Array.from(
      region.current?.querySelectorAll<HTMLImageElement>(
        "img[data-photo-id]",
      ) ?? [],
    )
      .filter((image) => image.complete && image.naturalWidth > 0)
      .map((image) => Number(image.dataset.photoId));
    setLoaded((ids) => Array.from(new Set([...ids, ...cached])));
    updateMotion();
    updateTab();
    query.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateTab);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    if (region.current) observer.observe(region.current);
    return () => {
      query.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateTab);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (
      !running ||
      !loaded.includes(heroPhotos[(active + 1) % heroPhotos.length].id)
    )
      return;
    const timer = window.setTimeout(
      () => setActive((index) => (index + 1) % heroPhotos.length),
      2800,
    );
    return () => window.clearTimeout(timer);
  }, [running, active, loaded]);

  const move = (step: number) =>
    setActive(
      (index) => (index + step + heroPhotos.length) % heroPhotos.length,
    );
  return (
    <div
      className="grooming-slideshow"
      ref={region}
      role="region"
      aria-roledescription="carousel"
      aria-label="Grooming photographs"
      tabIndex={0}
      aria-description="Use the left and right arrow keys to browse photographs."
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
      <div
        className="grooming-frames"
        aria-live={running ? "off" : "polite"}
        aria-atomic="true"
      >
        {heroPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className={`grooming-frame${index === active ? " is-active" : ""}`}
            aria-hidden={index !== active}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${heroPhotos.length}`}
          >
            {failed.includes(photo.id) ? (
              <p className="photo-unavailable">
                This photograph could not load.
              </p>
            ) : (
              <img
                src={`/media/grooming/look-${photo.id}-720.webp`}
                srcSet={`/media/grooming/look-${photo.id}-480.webp 480w, /media/grooming/look-${photo.id}-720.webp 720w`}
                sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 900px) 620px, 576px"
                style={{ objectPosition: photo.position }}
                onLoad={() =>
                  setLoaded((ids) =>
                    ids.includes(photo.id) ? ids : [...ids, photo.id],
                  )
                }
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                data-photo-id={photo.id}
                loading={
                  index === 0 || index === (active + 1) % heroPhotos.length
                    ? "eager"
                    : "lazy"
                }
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                onError={() => setFailed((ids) => [...ids, photo.id])}
              />
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="slideshow-play"
        disabled={reduced}
        aria-label={
          reduced
            ? "Autoplay off: reduced motion"
            : paused
              ? "Play slideshow"
              : "Pause slideshow"
        }
        onClick={() => setPaused((value) => !value)}
      >
        {paused || reduced ? (
          <Play size={16} aria-hidden="true" />
        ) : (
          <Pause size={16} aria-hidden="true" />
        )}
        <span className="sr-only">
          {reduced ? "Motion off" : paused ? "Play" : "Pause"}
        </span>
      </button>
    </div>
  );
}
