export function computeBMI(weight: number, height: number) {
  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) return '0';
  return (weight / Math.pow(height / 100, 2)).toFixed(1);
}
