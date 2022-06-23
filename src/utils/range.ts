export default function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (v, k) => k + start);
}
