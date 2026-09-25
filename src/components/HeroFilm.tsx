"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export default function HeroFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const manualPause = useRef(false);
  const visible = useRef(true);
  const reduced = useRef(true);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  function fail() {
    manualPause.current = true;
    video.current?.pause();
    setPlaying(false);
    setFailed(true);
  }
  useEffect(() => {
    const film = video.current;
    if (!film) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (
        reduced.current ||
        manualPause.current ||
        !visible.current ||
        document.hidden
      )
        film.pause();
      else void film.play().catch(() => setPlaying(false));
    };
    const onPreference = () => {
      reduced.current = preference.matches;
      sync();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    onPreference();
    observer.observe(film);
    preference.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", sync);
      film.pause();
    };
  }, []);
  function toggle() {
    const film = video.current;
    if (!film) return;
    if (!film.paused) {
      manualPause.current = true;
      film.pause();
    } else {
      manualPause.current = false;
      void film.play().catch(fail);
    }
  }
  return (
    <figure className="hero-film">
      <div className="film-frame">
        <video
          ref={video}
          poster="/media/hero-poster.jpg"
          muted
          playsInline
          loop
          preload="none"
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={fail}
          aria-label="Stock barbering film showing hairline detail and braids"
        >
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
        <div className="film-shade" />
        <div className="film-caption">
          <span>
            THE CRAFT IS IN
            <br />
            THE DETAILS.
          </span>
          <button
            className="film-control"
            onClick={toggle}
            disabled={failed}
            aria-label={
              failed
                ? "Barbering film unavailable"
                : playing
                  ? "Pause barbering film"
                  : "Play barbering film"
            }
          >
            {playing ? <Pause size={17} /> : <Play size={17} />}
          </button>
        </div>
      </div>
      <figcaption>
        {failed
          ? "Film unavailable. Still image shown."
          : "Barbering inspiration · Stock footage"}
      </figcaption>
    </figure>
  );
}
