export const wavePhotos = [
  {
    src: "/media/oct31/1001242376.webp",
    width: 720,
    height: 713,
    alt: "Sporting waves with a defined hairline",
    source: "1001242376.jpg",
  },
  {
    src: "/media/oct31/1001242380.webp",
    width: 720,
    height: 716,
    alt: "Sporting waves with a defined hairline",
    source: "1001242380.jpg",
  },
  {
    src: "/media/oct31/1001242382.webp",
    width: 720,
    height: 713,
    alt: "Sporting waves with a defined hairline",
    source: "1001242382.jpg",
  },
] as const;
export const waveKit = {
  src: "/media/oct31/wave-kit.webp",
  width: 1080,
  height: 810,
  alt: "Wave cream, durag, wave brush and wave texturizer",
  source: "Premium wave grooming essentials still life.png",
};
export const galleryStep = (index: number, step: number) =>
  (index + step + wavePhotos.length) % wavePhotos.length;
