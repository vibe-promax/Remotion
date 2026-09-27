import { interpolate } from "remotion";

export const clamp = (n: number, min = 0, max = 1) => Math.max(min, Math.min(max, n));
export const easeOut = (t: number) => 1 - Math.pow(1 - clamp(t), 3);
export const easeInOut = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const reveal = (frame: number, duration: number, inFrames = 10, outFrames = 10) => {
  const opacity = interpolate(frame, [0, inFrames, Math.max(inFrames, duration - outFrames), duration], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const y = interpolate(frame, [0, inFrames], [36, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return {opacity, y};
};