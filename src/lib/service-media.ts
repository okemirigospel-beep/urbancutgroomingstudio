export const servicePreviews = {
  haircuts: [
    {
      src: "/media/service-previews/haircuts-1",
      width: 720,
      height: 747,
      position: "50% 42%",
    },
    {
      src: "/media/service-previews/haircuts-2",
      width: 720,
      height: 882,
      position: "50% 50%",
    },
    {
      src: "/media/service-previews/haircuts-3",
      width: 720,
      height: 947,
      position: "54% 43%",
    },
    {
      src: "/media/service-previews/haircuts-4",
      width: 720,
      height: 960,
      position: "50% 54%",
    },
  ],
  beard: [
    {
      src: "/media/service-previews/beard-1",
      width: 720,
      height: 948,
      position: "46% 60%",
    },
    {
      src: "/media/service-previews/beard-2",
      width: 720,
      height: 965,
      position: "50% 48%",
    },
    {
      src: "/media/service-previews/beard-3",
      width: 720,
      height: 943,
      position: "53% 50%",
    },
    {
      src: "/media/service-previews/beard-4",
      width: 720,
      height: 951,
      position: "50% 52%",
    },
  ],
  "hair-care": [
    {
      src: "/media/service-previews/hair-care-1",
      width: 720,
      height: 960,
      position: "50% 52%",
    },
    {
      src: "/media/service-previews/hair-care-2",
      width: 720,
      height: 825,
      position: "52% 46%",
    },
    {
      src: "/media/service-previews/hair-care-3",
      width: 720,
      height: 976,
      position: "45% 50%",
    },
    {
      src: "/media/service-previews/hair-care-4",
      width: 720,
      height: 748,
      position: "52% 56%",
    },
  ],
} as const;

export function nextPreview(
  active: number,
  count: number,
  failed: readonly number[],
) {
  for (let step = 1; step < count; step++) {
    const next = (active + step) % count;
    if (!failed.includes(next)) return next;
  }
  return null;
}
export function canPreviewRun(state: {
  paused: boolean;
  reduced: boolean;
  hidden: boolean;
  dialog: boolean;
  visible: boolean;
  interacting: boolean;
}) {
  return (
    state.visible &&
    !state.paused &&
    !state.reduced &&
    !state.hidden &&
    !state.dialog &&
    !state.interacting
  );
}
