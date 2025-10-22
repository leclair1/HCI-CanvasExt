export function normalizeHex(hex: string): string {
  const value = hex.trim();
  if (value.startsWith('#') && (value.length === 4 || value.length === 7)) {
    return value;
  }

  const cleaned = value.replace('#', '');
  if (cleaned.length === 3) {
    return (
      '#' +
      cleaned
        .split('')
        .map((char) => char + char)
        .join('')
    );
  }

  if (cleaned.length === 6) {
    return `#${cleaned}`;
  }

  // Fallback to black if parsing fails
  return '#000000';
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = normalizeHex(hex).replace('#', '');
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return { r, g, b };
}

export function getReadableTextColor(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const lum =
    (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  // Return dark text for light colors, otherwise white
  return lum > 0.55 ? '#0F172A' : '#FFFFFF';
}

export function applyAlpha(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${Math.min(Math.max(alpha, 0), 1)})`;
}

export function mixWithLight(hex: string, amount = 0.12): string {
  const { r, g, b } = hexToRgb(hex);
  const mix = (channel: number) => Math.round(channel + (255 - channel) * amount);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}
