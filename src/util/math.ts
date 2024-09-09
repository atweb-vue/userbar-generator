export const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
export const clamp = (a: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, a));
export const invlerp = (x: number, y: number, a: number) =>
  clamp((a - x) / (y - x));
