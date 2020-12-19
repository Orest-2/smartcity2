export const harmonicSpline = (s: number, a: number, b:number): number => {
  if (s < a) { return 0 }

  if (s > b) { return 1 }

  const f = s - b
  const fs = b - a

  return 0.5 + (0.5 * Math.cos((f / fs) * Math.PI))
}
