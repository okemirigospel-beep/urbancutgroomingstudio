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
      src: "/media/oct25/beard-1",
      width: 720,
      height: 960,
      position: "50% 45%",
    },
    {
      src: "/media/oct25/beard-2",
      width: 720,
      height: 961,
      position: "50% 45%",
    },
    {
      src: "/media/oct25/beard-3",
      width: 720,
      height: 1022,
      position: "50% 45%",
    },
    {
      src: "/media/oct25/beard-4",
      width: 720,
      height: 961,
      position: "50% 45%",
    },
  ],
  "hair-care": [
    {
      src: "/media/oct25/hair-care-1",
      width: 720,
      height: 960,
      position: "50% 45%",
    },
    {
      src: "/media/oct25/hair-care-2",
      width: 720,
      height: 960,
      position: "50% 45%",
    },
    {
      src: "/media/oct25/hair-care-3",
      width: 720,
      height: 960,
      position: "50% 45%",
    },
    {
      src: "/media/oct25/hair-care-4",
      width: 720,
      height: 825,
      position: "50% 45%",
    },
    {
      src: "/media/oct25/hair-care-5",
      width: 720,
      height: 960,
      position: "50% 45%",
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
  reduced: boolean;
  hidden: boolean;
  dialog: boolean;
  visible: boolean;
  interacting: boolean;
}) {
  return (
    state.visible &&
    !state.reduced &&
    !state.hidden &&
    !state.dialog &&
    !state.interacting
  );
}

export function shouldAutoplayFeature(state: {
  visible: boolean;
  hidden: boolean;
  dialog: boolean;
  reduced: boolean;
  userPaused: boolean;
  blocked: boolean;
}) {
  return (
    state.visible &&
    !state.hidden &&
    !state.dialog &&
    !state.reduced &&
    !state.userPaused &&
    !state.blocked
  );
}
