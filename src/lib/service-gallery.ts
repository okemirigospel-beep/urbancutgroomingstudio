export const wavePhotos = [
  {
    src: "/media/nov1/waves-front.webp",
    width: 720,
    height: 655,
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
    src: "/media/nov1/waves-side.webp",
    width: 720,
    height: 520,
    alt: "Side view of defined waves and hairline",
    source: "IMG-20261031-WA0087.jpg",
  },
] as const;
export const waveKit = {
  src: "/media/oct31/wave-kit.webp",
  width: 1080,
  height: 810,
  alt: "Wave cream, durag, wave brush and wave texturizer",
  source: "Premium wave grooming essentials still life.png",
};
export const colourPhotos = [
  {
    src: "/media/oct25/hair-care-1-720.webp",
    width: 720,
    height: 960,
    alt: "Vivid red cropped hairstyle",
    source: "7.jpg",
  },
  {
    src: "/media/oct25/hair-care-2-720.webp",
    width: 720,
    height: 960,
    alt: "Red colour with a detailed shaved design",
    source: "8 (2).jpg",
  },
  {
    src: "/media/oct31/hair-care-7-720.webp",
    width: 720,
    height: 954,
    alt: "Red hair colour during a studio treatment",
    source: "1001242363.jpg",
  },
] as const;
export type GalleryPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  source: string;
};
export const galleryStep = (
  index: number,
  step: number,
  count: number = wavePhotos.length,
) => (index + step + count) % count;
