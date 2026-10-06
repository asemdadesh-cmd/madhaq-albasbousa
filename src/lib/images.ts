import type { Photo } from './types';

const UNSPLASH = 'https://images.unsplash.com/';

// One shared grade for the stock photos (Unsplash's imgix CDN applies it): a touch less saturation and
// softer highlights, so pictures from different photographers sit together as one warm, matte set.
const GRADE = '&sat=-12&high=-18&shad=10&con=-4';

/** Builds src/srcSet for a photo. Unsplash photos are resized and cropped by their CDN; local files are used as-is. */
export function imageProps(photo: Photo, ratio: number, widths: number[] = [400, 700, 1000]) {
  if (!photo.src.startsWith(UNSPLASH)) return { src: photo.src };
  const url = (w: number) =>
    `${photo.src}?auto=format&fit=crop&crop=entropy&w=${w}&h=${Math.round(w / ratio)}&q=72${GRADE}`;
  return {
    src: url(widths[Math.min(1, widths.length - 1)]),
    srcSet: widths.map((w) => `${url(w)} ${w}w`).join(', '),
  };
}

export const creditUrl = (username: string) =>
  `https://unsplash.com/@${username}?utm_source=madhaq_albasbousa&utm_medium=referral`;
