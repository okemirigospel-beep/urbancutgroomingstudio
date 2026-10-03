/** Next usable photograph, with a bounded scan even if every request fails. */
export function nextPhotoIndex(
  photos: readonly { id: number }[],
  active: number,
  failed: readonly number[],
  step = 1,
): number | null {
  for (let offset = 1; offset < photos.length; offset++) {
    const index =
      (active + (step < 0 ? -offset : offset) + photos.length) % photos.length;
    if (!failed.includes(photos[index].id)) return index;
  }
  return null;
}
