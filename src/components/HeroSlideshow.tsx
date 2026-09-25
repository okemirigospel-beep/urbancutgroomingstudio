"use client";
import { useEffect, useRef, useState } from "react";
import { heroPhotos } from "@/lib/hero";

export default function HeroSlideshow() {
  const region = useRef<HTMLDivElement>(null);
  const [{ active, previous }, setSlide] = useState<{
    active: number;
    previous: number | null;
  }>({ active: 0, previous: null });
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [loaded, setLoaded] = useState<number[]>([]);
  const [failed, setFailed] = useState<number[]>([]);
  const running = !paused && !reduced && visible && tabVisible;

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
      () =>
        setSlide(({ active }) => ({
          active: (active + 1) % heroPhotos.length,
          previous: active,
        })),
      2800,
    );
    return () => window.clearTimeout(timer);
  }, [running, active, loaded]);

  const move = (step: number) =>
    setSlide(({ active }) => ({
      active: (active + step + heroPhotos.length) % heroPhotos.length,
      previous: active,
    }));
  const toggle = () => {
    if (!reduced) setPaused((value) => !value);
  };
  return (
    <div
      className="grooming-slideshow"
      ref={region}
      role="button"
      aria-label="Pause grooming slideshow"
      aria-pressed={paused || reduced}
      aria-disabled={reduced}
      tabIndex={0}
      aria-description={
        reduced
          ? "Automatic cycling is off for reduced motion. Use left and right arrow keys to browse photographs."
          : "Click, tap, or press Enter or Space to pause or resume. Use left and right arrow keys to browse photographs."
      }
      onClick={toggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (!event.repeat) toggle();
        }
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
            className={`grooming-frame${index === active ? " is-active" : ""}${index === previous ? " is-previous" : ""}${index === active && previous !== null ? " is-entering" : ""}`}
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
    </div>
  );
}
