"use client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Pause, Play } from "lucide-react";
import {
  servicePreviews,
  nextPreview,
  canPreviewRun,
} from "@/lib/service-media";

const MediaContext = createContext({
  paused: false,
  reduced: true,
  hidden: false,
  dialog: false,
});

// This provider owns preview state; slide ticks never rerender the booking form.
export function ServiceMediaProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [dialog, setDialog] = useState(false);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const motion = () => setReduced(query.matches);
    const visibility = () => setHidden(document.hidden);
    const modal = () => setDialog(!!document.querySelector("dialog[open]"));
    motion();
    visibility();
    modal();
    query.addEventListener("change", motion);
    document.addEventListener("visibilitychange", visibility);
    const observer = new MutationObserver(modal);
    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["open"],
    });
    return () => {
      query.removeEventListener("change", motion);
      document.removeEventListener("visibilitychange", visibility);
      observer.disconnect();
    };
  }, []);
  return (
    <MediaContext.Provider value={{ paused, reduced, hidden, dialog }}>
      <div className="service-preview-controls">
        <button
          type="button"
          className="service-preview-toggle"
          disabled={reduced}
          aria-label={
            reduced ? "Service previews paused for reduced motion" : undefined
          }
          onClick={() => setPaused((value) => !value)}
        >
          {paused || reduced ? (
            <Play aria-hidden="true" />
          ) : (
            <Pause aria-hidden="true" />
          )}
          {paused || reduced ? "Play previews" : "Pause previews"}
        </button>
      </div>
      {children}
    </MediaContext.Provider>
  );
}

function usePreviewVisibility() {
  const region = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [interacting, setInteracting] = useState(false);
  useEffect(() => {
    const node = region.current;
    if (!node) return;
    const preload = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          preload.disconnect();
        }
      },
      { rootMargin: "250px" },
    );
    const viewport = new IntersectionObserver(
      ([entry]) =>
        setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.25),
      { threshold: [0, 0.25] },
    );
    preload.observe(node);
    viewport.observe(node);
    const card = node.closest("button");
    const update = () =>
      setInteracting(
        !!card &&
          (card.matches(":hover") || card.contains(document.activeElement)),
      );
    for (const event of ["pointerenter", "pointerleave", "focusin", "focusout"])
      card?.addEventListener(event, update);
    return () => {
      preload.disconnect();
      viewport.disconnect();
      for (const event of [
        "pointerenter",
        "pointerleave",
        "focusin",
        "focusout",
      ])
        card?.removeEventListener(event, update);
    };
  }, []);
  return { region, near, visible, interacting };
}

function PhotoPreview({
  category,
}: {
  category: keyof typeof servicePreviews;
}) {
  const state = useContext(MediaContext);
  const { region, near, visible, interacting } = usePreviewVisibility();
  const [{ active, previous }, setSlide] = useState<{
    active: number;
    previous: number | null;
  }>({ active: 0, previous: null });
  const [failed, setFailed] = useState<number[]>([]);
  const [ready, setReady] = useState<number | null>(null);
  const photos = servicePreviews[category];
  const advanced = useRef(false);
  const upcoming = nextPreview(active, photos.length, failed);
  const running = canPreviewRun({ ...state, visible, interacting });
  useEffect(() => {
    if (!near || upcoming === null) return;
    const image = region.current?.querySelector<HTMLImageElement>(
      `img[data-index="${upcoming}"]`,
    );
    setReady(image?.complete && image.naturalWidth ? upcoming : null);
  }, [near, upcoming, region]);
  useEffect(() => {
    if (!near || upcoming === null || ready === upcoming) return;
    const timer = setTimeout(
      () =>
        setFailed((ids) => (ids.includes(upcoming) ? ids : [...ids, upcoming])),
      15000,
    );
    return () => clearTimeout(timer);
  }, [near, upcoming, ready]);
  useEffect(() => {
    if (
      upcoming === null ||
      ready !== upcoming ||
      previous !== null ||
      (!running && !failed.includes(active))
    )
      return;
    const offset = !advanced.current
      ? { haircuts: 0, beard: 180, "hair-care": 360 }[category]
      : 0;
    const timer = setTimeout(
      () => {
        advanced.current = true;
        setSlide({
          active: upcoming,
          previous: failed.includes(active) ? null : active,
        });
      },
      failed.includes(active) ? 0 : 3000 + offset,
    );
    return () => clearTimeout(timer);
  }, [running, active, previous, upcoming, ready, failed, category]);
  useEffect(() => {
    if (previous === null) return;
    const timer = setTimeout(
      () => setSlide((value) => ({ ...value, previous: null })),
      400,
    );
    return () => clearTimeout(timer);
  }, [previous]);
  return (
    <div
      className="service-preview"
      ref={region}
      aria-hidden="true"
      data-category={category}
      data-active={active + 1}
      data-running={running}
    >
      {photos.map((photo, index) =>
        index === active ||
        index === previous ||
        (near && index === upcoming) ? (
          <img
            key={photo.src}
            data-index={index}
            src={`${photo.src}-720.webp`}
            srcSet={`${photo.src}-480.webp 480w, ${photo.src}-720.webp 720w`}
            sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 1100px) 44vw, 380px"
            width={photo.width}
            height={photo.height}
            alt=""
            loading={index === active && !near ? "lazy" : "eager"}
            decoding="async"
            style={{ objectPosition: photo.position }}
            className={`service-preview-frame${index === active ? " active" : ""}${index === previous ? " previous" : ""}${index === active && previous !== null ? " entering" : ""}`}
            onLoad={() => {
              if (index === upcoming) setReady(index);
            }}
            onError={() =>
              setFailed((ids) => (ids.includes(index) ? ids : [...ids, index]))
            }
          />
        ) : null,
      )}
    </div>
  );
}

function CardVideo() {
  const state = useContext(MediaContext);
  const { region, near, visible, interacting } = usePreviewVisibility();
  const video = useRef<HTMLVideoElement>(null);
  const running = canPreviewRun({ ...state, visible, interacting });
  useEffect(() => {
    const node = video.current;
    if (!node) return;
    let cancelled = false;
    if (running && near)
      void node
        .play()
        .then(() => {
          if (cancelled) node.pause();
        })
        .catch(() => {});
    else node.pause();
    return () => {
      cancelled = true;
      node.pause();
    };
  }, [running, near]);
  return (
    <div
      className="service-preview service-preview-video"
      ref={region}
      aria-hidden="true"
    >
      <img
        src="/media/service-previews/home-service-card-poster.webp"
        width={464}
        height={832}
        alt=""
        loading="lazy"
      />
      <video
        ref={video}
        src={
          near && !state.reduced
            ? "/media/service-previews/home-service-card.mp4"
            : undefined
        }
        poster="/media/service-previews/home-service-card-poster.webp"
        muted
        loop
        playsInline
        preload="none"
        width={464}
        height={832}
        tabIndex={-1}
      />
    </div>
  );
}

export default function ServiceMedia({ category }: { category: string }) {
  if (category === "home") return <CardVideo />;
  if (category in servicePreviews)
    return <PhotoPreview category={category as keyof typeof servicePreviews} />;
  return null;
}
