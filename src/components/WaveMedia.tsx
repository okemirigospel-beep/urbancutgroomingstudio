"use client";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { wavePhotos, waveKit, galleryStep } from "@/lib/service-gallery";
export default function WaveMedia({ inclusions }: { inclusions?: string[] }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const move = (step: number) => {
    setIndex((i) => galleryStep(i, step));
    setFailed(false);
  };
  const photo = wavePhotos[index];
  return (
    <div className={`wave-media${inclusions ? " with-kit" : ""}`}>
      <div
        className="wave-gallery"
        role="region"
        aria-label="Sporting Waves hairstyle photographs"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            move(e.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        <div
          className="wave-stage"
          tabIndex={0}
          aria-label="Swipe or use arrow keys to browse hairstyles"
          onTouchStart={(e) => {
            touch.current = {
              x: e.touches[0].clientX,
              y: e.touches[0].clientY,
            };
          }}
          onTouchCancel={() => {
            touch.current = null;
          }}
          onTouchEnd={(e) => {
            const start = touch.current;
            touch.current = null;
            if (!start) return;
            const dx = e.changedTouches[0].clientX - start.x,
              dy = e.changedTouches[0].clientY - start.y;
            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2)
              move(dx < 0 ? 1 : -1);
          }}
        >
          {failed ? (
            <p role="status">
              This photograph could not load. Use the controls to view another.
            </p>
          ) : (
            <img
              key={photo.src}
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              draggable={false}
              onError={() => setFailed(true)}
            />
          )}
        </div>
        <div className="wave-navigation">
          <button
            type="button"
            aria-label="Previous hairstyle"
            onClick={() => move(-1)}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <span aria-live="polite" aria-atomic="true">
            {index + 1} / {wavePhotos.length}
          </span>
          <button
            type="button"
            aria-label="Next hairstyle"
            onClick={() => move(1)}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
      {inclusions && (
        <div className="wave-kit">
          <img
            src={waveKit.src}
            width={waveKit.width}
            height={waveKit.height}
            alt={waveKit.alt}
          />
          <div className="uc-inclusions">
            <h3>What’s included</h3>
            <ul>
              {inclusions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
