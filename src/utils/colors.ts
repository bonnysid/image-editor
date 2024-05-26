export const rgbToCmyk = (r: number, g: number, b: number) => {
  const rPrime = r / 255;
  const gPrime = g / 255;
  const bPrime = b / 255;

  const k = 1 - Math.max(rPrime, gPrime, bPrime);
  const c = ((1 - rPrime - k) / (1 - k)) || 0;
  const m = ((1 - gPrime - k) / (1 - k)) || 0;
  const y = ((1 - bPrime - k) / (1 - k)) || 0;

  return { c: c * 100, m: m * 100, y: y * 100, k: k * 100 };
}

export const cmykToRgb = (c: number, m: number, y: number, k: number) => {
  const r = 255 * (1 - Math.min(1, c / 100)) * (1 - Math.min(1, k / 100));
  const g = 255 * (1 - Math.min(1, m / 100)) * (1 - Math.min(1, k / 100));
  const b = 255 * (1 - Math.min(1, y / 100)) * (1 - Math.min(1, k / 100));

  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
}

export const rgbToHsl = (r: number, g: number, b: number) => {
  // Нормализуем значения RGB до диапазона [0, 1]
  const rPrime = r / 255;
  const gPrime = g / 255;
  const bPrime = b / 255;

  const cMax = Math.max(rPrime, gPrime, bPrime);
  const cMin = Math.min(rPrime, gPrime, bPrime);
  const delta = cMax - cMin;

  let h = 0;
  if (delta === 0) {
    h = 0;
  } else if (cMax === rPrime) {
    h = 60 * (((gPrime - bPrime) / delta) % 6);
  } else if (cMax === gPrime) {
    h = 60 * (((bPrime - rPrime) / delta) + 2);
  } else if (cMax === bPrime) {
    h = 60 * (((rPrime - gPrime) / delta) + 4);
  }

  const l = (cMax + cMin) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return { h, s: s, l: l };
}

const hslToRgb = (h: number, s: number, l: number) => {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;

  let r: number, g: number, b: number;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
}

export const rgbToLab = (r: number, g: number, rgbB: number) => {
  // Нормализуем значения RGB до диапазона [0, 1]
  const rPrime = r / 255;
  const gPrime = g / 255;
  const bPrime = rgbB / 255;

  // Применяем преобразование sRGB в XYZ
  const rLinear = rPrime <= 0.04045 ? rPrime / 12.92 : Math.pow((rPrime + 0.055) / 1.055, 2.4);
  const gLinear = gPrime <= 0.04045 ? gPrime / 12.92 : Math.pow((gPrime + 0.055) / 1.055, 2.4);
  const bLinear = bPrime <= 0.04045 ? bPrime / 12.92 : Math.pow((bPrime + 0.055) / 1.055, 2.4);

  const x = rLinear * 0.4124564 + gLinear * 0.3575761 + bLinear * 0.1804375;
  const y = rLinear * 0.2126729 + gLinear * 0.7151522 + bLinear * 0.0721750;
  const z = rLinear * 0.0193339 + gLinear * 0.1191920 + bLinear * 0.9503041;

  // Применяем преобразование XYZ в LAB
  const xPrime = x / 0.95047;
  const yPrime = y / 1.00000;
  const zPrime = z / 1.08883;

  const fX = xPrime > 0.008856 ? Math.pow(xPrime, 1 / 3) : (903.3 * xPrime + 16) / 116;
  const fY = yPrime > 0.008856 ? Math.pow(yPrime, 1 / 3) : (903.3 * yPrime + 16) / 116;
  const fZ = zPrime > 0.008856 ? Math.pow(zPrime, 1 / 3) : (903.3 * zPrime + 16) / 116;

  const l = (116 * fY) - 16;
  const a = 500 * (fX - fY);
  const b = 200 * (fY - fZ);

  return { l, a, b };
}

export const labToRgb = (l: number, a: number, lB: number) => {
  let y = (l + 16) / 116,
    x = a / 500 + y,
    z = y - lB / 200,
    r, g, b;

  x = 0.95047 * ((x * x * x > 0.008856) ? x * x * x : (x - 16/116) / 7.787);
  y = 1.00000 * ((y * y * y > 0.008856) ? y * y * y : (y - 16/116) / 7.787);
  z = 1.08883 * ((z * z * z > 0.008856) ? z * z * z : (z - 16/116) / 7.787);

  r = x *  3.2406 + y * -1.5372 + z * -0.4986;
  g = x * -0.9689 + y *  1.8758 + z *  0.0415;
  b = x *  0.0557 + y * -0.2040 + z *  1.0570;

  r = (r > 0.0031308) ? (1.055 * Math.pow(r, 1/2.4) - 0.055) : 12.92 * r;
  g = (g > 0.0031308) ? (1.055 * Math.pow(g, 1/2.4) - 0.055) : 12.92 * g;
  b = (b > 0.0031308) ? (1.055 * Math.pow(b, 1/2.4) - 0.055) : 12.92 * b;

  return {
    r: Math.max(0, Math.min(1, r)) * 255,
    g: Math.max(0, Math.min(1, g)) * 255,
    b: Math.max(0, Math.min(1, b)) * 255
  }
}

export const rgbToHsv = (r: number, g: number, b: number) => {
  // Нормализуем значения RGB до диапазона [0, 1]
  const rPrime = r / 255;
  const gPrime = g / 255;
  const bPrime = b / 255;

  const max = Math.max(rPrime, gPrime, bPrime);
  const min = Math.min(rPrime, gPrime, bPrime);
  const delta = max - min;

  let h = 0;
  let s = 0;
  let v = max;

  if (delta !== 0) {
    s = delta / max;

    if (max === rPrime) {
      h = 60 * (((gPrime - bPrime) / delta) % 6);
    } else if (max === gPrime) {
      h = 60 * (((bPrime - rPrime) / delta) + 2);
    } else {
      h = 60 * (((rPrime - gPrime) / delta) + 4);
    }
  }

  if (h < 0) {
    h += 360;
  }

  return { h, s: s, v: v };
}

export const hsvToRgb = (h: number, s: number, v: number) => {
  let r = 0;
  let g = 0;
  let b = 0;

  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
  } else if (h >= 120 && h < 180) {
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
}

export const rgbToYcc = (r: number, g: number, b: number) => {
  // Нормализуем значения RGB до диапазона [0, 1]
  const rPrime = r / 255;
  const gPrime = g / 255;
  const bPrime = b / 255;

  const y = 0.299 * rPrime + 0.587 * gPrime + 0.114 * bPrime;
  const cb = -0.1687 * rPrime - 0.3313 * gPrime + 0.5 * bPrime + 0.5;
  const cr = 0.5 * rPrime - 0.4187 * gPrime - 0.0813 * bPrime + 0.5;

  return { y, cb, cr };
}

export const yccToRgb = (y: number, cb: number, cr: number) => {
  const r = y + 1.402 * (cr - 0.5);
  const g = y - 0.344136 * (cb - 0.5) - 0.714136 * (cr - 0.5);
  const b = y + 1.772 * (cb - 0.5);

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

type ConvertColorProps = {
  rgb?: number[];
  cmyk?: number[];
  hsl?: number[];
  lab?: number[];
  hsv?: number[];
  ycc?: number[];
}

export const rgbToOther = (r: number, g: number, b: number) => {
  return {
    rgb: { r, g, b },
    cmyk: rgbToCmyk(r, g, b),
    hsl: rgbToHsl(r, g, b),
    lab: rgbToLab(r, g, b),
    hsv: rgbToHsv(r, g, b),
    ycc: rgbToYcc(r, g, b),
  }
}

export const linearCorrection = (imageData: ImageData, slope: number, intercept: number) => {
  for (let i = 0; i < imageData.data.length; i += 4) {
    let avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3; // Среднее значение яркости пикселя
    // Применяем линейное преобразование к среднему значению яркости пикселя
    avg = slope * avg + intercept;
    // Ограничиваем среднее значение яркости пикселя от 0 до 255
    avg = Math.min(255, Math.max(0, avg));
    // Обновляем значения каналов RGB пикселя с учетом среднего значения яркости
    imageData.data[i] = avg; // Красный канал
    imageData.data[i + 1] = avg; // Зеленый канал
    imageData.data[i + 2] = avg; // Синий канал
  }
  return imageData;
}

export const gammaCorrection = (imageData: ImageData, gamma: number) => {
  for (let i = 0; i < imageData.data.length; i += 4) {
    let avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3; // Среднее значение яркости пикселя
    // Применяем гамма-коррекцию к среднему значению яркости пикселя
    avg = 255 * Math.pow(avg / 255, 1 / gamma);
    // Обновляем значения каналов RGB пикселя с учетом среднего значения яркости
    imageData.data[i] = avg; // Красный канал
    imageData.data[i + 1] = avg; // Зеленый канал
    imageData.data[i + 2] = avg; // Синий канал
  }
  return imageData;
}

export const convertColor = ({
  ycc,
  hsv,
  hsl,
  lab,
  rgb,
  cmyk,
}: ConvertColorProps) => {
  if (rgb) {
    const r = rgb[0];
    const g = rgb[1];
    const b = rgb[2];

    return rgbToOther(r, g, b);
  }

  if (cmyk) {
    const c = cmyk[0];
    const m = cmyk[1];
    const y = cmyk[2];
    const k = cmyk[3];
    const { r, g, b } = cmykToRgb(c, m, y, k);

    return rgbToOther(r, g, b);
  }

  if (hsv) {
    const h = hsv[0];
    const s = hsv[1];
    const v = hsv[2];

    const { r, g, b } = hsvToRgb(h, s, v);

    return rgbToOther(r, g, b);
  }

  if (hsl) {
    const h = hsl[0];
    const s = hsl[1];
    const l = hsl[2];

    const { r, g, b } = hslToRgb(h, s, l);

    return rgbToOther(r, g, b);
  }

  if (lab) {
    const l = lab[0];
    const a = lab[1];
    const labB = lab[2];

    const { r, g, b } = labToRgb(l, a, labB);

    return rgbToOther(r, g, b);
  }

  if (ycc) {
    const y = ycc[0];
    const cb = ycc[1];
    const cr = ycc[2];

    const { r, g, b } = yccToRgb(y, cb, cr);

    return rgbToOther(r, g, b);
  }
}
