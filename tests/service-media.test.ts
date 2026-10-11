import test from "node:test";
import assert from "node:assert/strict";
import {
  servicePreviews,
  nextPreview,
  canPreviewRun,
  shouldAutoplayFeature,
} from "../src/lib/service-media.ts";
import { whatsappUrl, whatsappBase } from "../src/lib/booking.ts";

test("each preview has four ordered, isolated assets; wrap and failures remain forward", () => {
  for (const [category, photos] of Object.entries(servicePreviews)) {
    assert.equal(photos.length, 4);
    photos.forEach((photo, index) =>
      assert.equal(
        photo.src,
        `/media/service-previews/${category}-${index + 1}`,
      ),
    );
  }
  assert.equal(nextPreview(3, 4, []), 0);
  assert.equal(nextPreview(3, 4, [0]), 1);
  assert.equal(nextPreview(0, 4, [1, 2, 3]), null);
});
test("service preview lifecycle respects reduced motion and temporary suspension", () => {
  const state = {
    reduced: false,
    hidden: false,
    dialog: false,
    visible: true,
    interacting: false,
  };
  assert.equal(canPreviewRun(state), true);
  for (const key of ["reduced", "hidden", "dialog", "interacting"] as const)
    assert.equal(canPreviewRun({ ...state, [key]: true }), false);
  assert.equal(canPreviewRun({ ...state, visible: false }), false);
});
test("new shared WhatsApp destination encodes punctuation and multiline data exactly once", () => {
  const message =
    "Name: Élodie O’Neil & Co\nNotes: 50% + detail? #1\n₦100,000 — yes!";
  const url = new URL(whatsappUrl(message));
  assert.equal(whatsappBase, "https://wa.me/2347063291013");
  assert.equal(url.origin + url.pathname, whatsappBase);
  assert.equal(url.searchParams.get("text"), message);
  assert.equal(url.searchParams.size, 1);
});

test("feature autoplay respects explicit pause and never retries a blocked attempt automatically", () => {
  const state = {
    visible: true,
    hidden: false,
    dialog: false,
    reduced: false,
    userPaused: false,
    blocked: false,
  };
  assert.equal(shouldAutoplayFeature(state), true);
  for (const key of [
    "hidden",
    "dialog",
    "reduced",
    "userPaused",
    "blocked",
  ] as const)
    assert.equal(shouldAutoplayFeature({ ...state, [key]: true }), false);
  assert.equal(shouldAutoplayFeature({ ...state, visible: false }), false);
  assert.equal(
    shouldAutoplayFeature({ ...state, userPaused: true, visible: true }),
    false,
  );
});
