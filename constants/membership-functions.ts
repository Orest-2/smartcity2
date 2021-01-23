export const harmonicSpline = (s: number, a: number, b:number): number => {
  if (s < a) { return 0 }

  if (s > b) { return 1 }

  const f = s - b
  const fs = b - a

  return 0.5 + (0.5 * Math.cos((f / fs) * Math.PI))
}

export const squareSpline = (t: number, a: number, b:number): number => {
  if (t <= a) { return 0 }

  if (t >= b) { return 1 }

  const ab2 = (a + b) / 2
  const s = b - a

  if (a < t && t <= ab2) {
    const f = t - a

    return 2 * Math.pow(f / s, 2)
  }

  const f = b - t

  return 1 - 2 * Math.pow(f / s, 2)
}

export const linearSshaped = (o:number, a: number, b:number): number => {
  if (o <= a) { return 0 }

  if (o >= b) { return 1 }

  const f = o - a
  const fs = b - a

  return f / fs
}
