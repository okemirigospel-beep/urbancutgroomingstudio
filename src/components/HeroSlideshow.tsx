"use client";
import { useEffect, useRef, useState } from "react";
import { heroPhotos } from "@/lib/hero";
import { nextPhotoIndex } from "@/lib/slideshow";

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
  const [manualStep, setManualStep] = useState<number | null>(null);
  const upcoming = nextPhotoIndex(heroPhotos, active, failed, manualStep ?? 1);
  const ready = upcoming !== null && loaded.includes(heroPhotos[upcoming].id);
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

  // Readiness belongs to the currently mounted image, not a past download.
  // A browser may revalidate or evict a previously displayed photo.
  useEffect(() => {
    if (upcoming === null) return;
    const id = heroPhotos[upcoming].id;
    const image = region.current?.querySelector<HTMLImageElement>(
      `img[data-photo-id="${id}"]`,
    );
    setLoaded((ids) => {
      const readyNow = image?.complete && image.naturalWidth > 0;
      if (readyNow) return ids.includes(id) ? ids : [...ids, id];
      return ids.includes(id) ? ids.filter((value) => value !== id) : ids;
    });
  }, [upcoming]);
  // Hold the current portrait while loading; skip failed/stalled requests
  // for this mount instead of retrying forever or running catch-up transitions.
  useEffect(() => {
    if (upcoming === null || ready) return;
    const id = heroPhotos[upcoming].id;
    const timer = window.setTimeout(
      () => setFailed((ids) => (ids.includes(id) ? ids : [...ids, id])),
      15000,
    );
    return () => window.clearTimeout(timer);
  }, [upcoming, ready]);

  useEffect(() => {
    if (upcoming === null || !ready || (!running && manualStep === null))
      return;
    const timer = window.setTimeout(
      () => {
        setSlide({ active: upcoming, previous: active });
        setManualStep(null);
      },
      manualStep === null ? 2800 : 0,
    );
    return () => window.clearTimeout(timer);
  }, [running, active, upcoming, ready, manualStep]);

  const move = (step: number) => setManualStep(step);
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
        {heroPhotos.map((photo, index) =>
          index === active || index === previous || index === upcoming ? (
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
                  srcSet={`/media/grooming/look-${photo.id}-480.webp 480w, /media/grooming/look-${photo.id}-720.webp ${photo.width}w`}
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
                  loading="eager"
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                  onError={() =>
                    setFailed((ids) =>
                      ids.includes(photo.id) ? ids : [...ids, photo.id],
                    )
                  }
                />
              )}
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}
