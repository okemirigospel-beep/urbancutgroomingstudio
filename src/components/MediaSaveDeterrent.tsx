"use client";
import { useEffect } from "react";

// A convenience deterrent, not access control: public media can still be captured.
export default function MediaSaveDeterrent() {
  useEffect(() => {
    const preventMediaSave = (event: Event) => {
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest(
          "img, video, picture, .home-service-media, .grooming-slideshow",
        )
      )
        event.preventDefault();
    };
    // Delegation also covers photos mounted later inside service dialogs.
    document.addEventListener("contextmenu", preventMediaSave, true);
    document.addEventListener("dragstart", preventMediaSave, true);
    return () => {
      document.removeEventListener("contextmenu", preventMediaSave, true);
      document.removeEventListener("dragstart", preventMediaSave, true);
    };
  }, []);
  return null;
}
