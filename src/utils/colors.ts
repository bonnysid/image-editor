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

export const performErosion = (imageData: ImageData, level: number = 1) => {
  if (!level) {
    return imageData;
  }

  const width = imageData.width;
  const height = imageData.height;
  let srcPixels = imageData.data.slice(); // Создаем копию исходного массива пикселей

  // Применяем эрозию level раз
  for (let i = 0; i < level; i++) {
    const dstPixels = new Uint8ClampedArray(srcPixels.length);

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        let minR = 255;
        let minG = 255;
        let minB = 255;

        // Проверяем 3x3 область вокруг текущего пикселя
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const currentIdx = ((y + dy) * width + (x + dx)) * 4;
            minR = Math.min(minR, srcPixels[currentIdx]);
            minG = Math.min(minG, srcPixels[currentIdx + 1]);
            minB = Math.min(minB, srcPixels[currentIdx + 2]);
          }
        }

        dstPixels[idx] = minR;
        dstPixels[idx + 1] = minG;
        dstPixels[idx + 2] = minB;
        dstPixels[idx + 3] = 255; // Альфа-канал сохраняется
      }
    }
    srcPixels = dstPixels; // Обновляем исходные пиксели для следующей итерации
  }

  return new ImageData(srcPixels, width, height);
}

// Функция для дилатации
export const performDilation = (imageData: ImageData, level = 1) => {
  if (!level) {
    return imageData;
  }

  const width = imageData.width;
  const height = imageData.height;
  let srcPixels = imageData.data.slice(); // Создаем копию исходного массива пикселей

  // Применяем дилатацию level раз
  for (let i = 0; i < level; i++) {
    const dstPixels = new Uint8ClampedArray(srcPixels.length);

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        let maxR = 0;
        let maxG = 0;
        let maxB = 0;

        // Проверяем 3x3 область вокруг текущего пикселя
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const currentIdx = ((y + dy) * width + (x + dx)) * 4;
            maxR = Math.max(maxR, srcPixels[currentIdx]);
            maxG = Math.max(maxG, srcPixels[currentIdx + 1]);
            maxB = Math.max(maxB, srcPixels[currentIdx + 2]);
          }
        }

        dstPixels[idx] = maxR;
        dstPixels[idx + 1] = maxG;
        dstPixels[idx + 2] = maxB;
        dstPixels[idx + 3] = 255; // Альфа-канал сохраняется
      }
    }
    srcPixels = dstPixels; // Обновляем исходные пиксели для следующей итерации
  }

  return new ImageData(srcPixels, width, height);
}

export const performOpening = (imageData: ImageData, level: number): ImageData => {
  if (!level) {
    return imageData;
  }

  const eroded = performErosion(imageData, level);
  return performDilation(eroded, level);
}

export const performClosing = (imageData: ImageData, level: number): ImageData => {
  if (!level) {
    return imageData;
  }

  const dilated = performDilation(imageData, level);
  return performErosion(dilated, level);
}

export const performGradient = (imageData: ImageData, level: number): ImageData => {
  if (!level) {
    return imageData;
  }

  const dilated = performDilation(imageData, level);
  const eroded = performErosion(imageData, level);

  const width = imageData.width;
  const height = imageData.height;
  const result = new Uint8ClampedArray(imageData.data.length);

  for (let i = 0; i < result.length; i += 4) {
    result[i] = dilated.data[i] - eroded.data[i];
    result[i + 1] = dilated.data[i + 1] - eroded.data[i + 1];
    result[i + 2] = dilated.data[i + 2] - eroded.data[i + 2];
    result[i + 3] = 255; // Альфа-канал
  }

  return new ImageData(result, width, height);
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

export const applyConvolution = (imageData: ImageData, kernel: number[], kernelWidth: number, kernelHeight: number): ImageData => {
  const width = imageData.width;
  const height = imageData.height;
  const srcPixels = imageData.data;
  const dstPixels = new Uint8ClampedArray(srcPixels.length);
  const halfWidth = Math.floor(kernelWidth / 2);
  const halfHeight = Math.floor(kernelHeight / 2);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0, g = 0, b = 0, a = 0;

      for (let ky = 0; ky < kernelHeight; ky++) {
        for (let kx = 0; kx < kernelWidth; kx++) {
          const scy = y + ky - halfHeight;
          const scx = x + kx - halfWidth;

          if (scy >= 0 && scy < height && scx >= 0 && scx < width) {
            const srcIdx = (scy * width + scx) * 4;
            const weight = kernel[ky * kernelWidth + kx];

            r += srcPixels[srcIdx] * weight;
            g += srcPixels[srcIdx + 1] * weight;
            b += srcPixels[srcIdx + 2] * weight;
            a += srcPixels[srcIdx + 3] * weight;
          }
        }
      }

      const dstIdx = (y * width + x) * 4;
      dstPixels[dstIdx] = Math.min(Math.max(r, 0), 255);
      dstPixels[dstIdx + 1] = Math.min(Math.max(g, 0), 255);
      dstPixels[dstIdx + 2] = Math.min(Math.max(b, 0), 255);
      dstPixels[dstIdx + 3] = Math.min(Math.max(a, 0), 255);
    }
  }

  return new ImageData(dstPixels, width, height);
}

export const performSharpen = (imageData: ImageData, level: number): ImageData => {
  const kernel = [
    0, -level, 0,
    -level, 1 + 4 * level, -level,
    0, -level, 0
  ];
  return applyConvolution(imageData, kernel, 3, 3);
}

export const performMotionBlur = (imageData: ImageData, level: number): ImageData => {
  const kernel = Array(level).fill(1 / level);
  return applyConvolution(imageData, kernel, level, 1);
}

export const performEmboss = (imageData: ImageData, level: number): ImageData => {
  const kernel = [
    -level, -1, 0,
    -1, 1, 1,
    0, 1, level
  ];
  return applyConvolution(imageData, kernel, 3, 3);
}

export const performRobertsEdgeDetection = (imageData: ImageData): ImageData => {
  const width = imageData.width;
  const height = imageData.height;
  const srcPixels = imageData.data;
  const dstPixels = new Uint8ClampedArray(srcPixels.length);

  const gx = [
    1, 0,
    0, -1
  ];

  const gy = [
    0, 1,
    -1, 0
  ];

  for (let y = 0; y < height - 1; y++) {
    for (let x = 0; x < width - 1; x++) {
      let sumX = 0;
      let sumY = 0;

      for (let dy = 0; dy <= 1; dy++) {
        for (let dx = 0; dx <= 1; dx++) {
          const currentIdx = ((y + dy) * width + (x + dx)) * 4;
          const gray = 0.299 * srcPixels[currentIdx] + 0.587 * srcPixels[currentIdx + 1] + 0.114 * srcPixels[currentIdx + 2];

          sumX += gx[dy * 2 + dx] * gray;
          sumY += gy[dy * 2 + dx] * gray;
        }
      }

      const idx = (y * width + x) * 4;
      const magnitude = Math.sqrt(sumX * sumX + sumY * sumY);
      dstPixels[idx] = dstPixels[idx + 1] = dstPixels[idx + 2] = magnitude > 128 ? 255 : 0;
      dstPixels[idx + 3] = 255; // Альфа-канал
    }
  }

  return new ImageData(dstPixels, width, height);
}

export const performCannyEdgeDetection = (imageData: ImageData, threshold: number): ImageData => {
  if (!threshold) {
    return imageData;
  }

  const width = imageData.width;
  const height = imageData.height;
  const srcPixels = imageData.data;
  const dstPixels = new Uint8ClampedArray(srcPixels.length);

  // Применяем оператор Собеля для вычисления градиента
  const gx = [
    -1, 0, 1,
    -2, 0, 2,
    -1, 0, 1
  ];

  const gy = [
    -1, -2, -1,
    0, 0, 0,
    1, 2, 1
  ];

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let sumX = 0;
      let sumY = 0;

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const currentIdx = ((y + dy) * width + (x + dx)) * 4;
          const gray = 0.299 * srcPixels[currentIdx] + 0.587 * srcPixels[currentIdx + 1] + 0.114 * srcPixels[currentIdx + 2];

          sumX += gx[(dy + 1) * 3 + (dx + 1)] * gray;
          sumY += gy[(dy + 1) * 3 + (dx + 1)] * gray;
        }
      }

      const idx = (y * width + x) * 4;
      const magnitude = Math.sqrt(sumX * sumX + sumY * sumY);
      dstPixels[idx] = dstPixels[idx + 1] = dstPixels[idx + 2] = magnitude > threshold ? 255 : 0;
      dstPixels[idx + 3] = 255; // Альфа-канал
    }
  }

  return new ImageData(dstPixels, width, height);
}

export const findMedian = (histogram: number[], windowSize: number): number => {
  let count = 0;
  const medianIndex = Math.floor(windowSize / 2);
  for (let i = 0; i < histogram.length; i++) {
    count += histogram[i];
    if (count > medianIndex) {
      return i;
    }
  }
  return 0;
}

export const performMedianFilter = (imageData: ImageData, level: number): ImageData => {
  const width = imageData.width;
  const height = imageData.height;
  const srcPixels = imageData.data;
  const dstPixels = new Uint8ClampedArray(srcPixels.length);
  const halfLevel = Math.floor(level / 2);
  const windowSize = level * level;
  const histogramR = new Array(256).fill(0);
  const histogramG = new Array(256).fill(0);
  const histogramB = new Array(256).fill(0);

  for (let y = halfLevel; y < height - halfLevel; y++) {
    for (let x = halfLevel; x < width - halfLevel; x++) {
      // Обнуление гистограммы
      histogramR.fill(0);
      histogramG.fill(0);
      histogramB.fill(0);

      // Заполнение гистограммы для текущего окна
      for (let dy = -halfLevel; dy <= halfLevel; dy++) {
        for (let dx = -halfLevel; dx <= halfLevel; dx++) {
          const idx = ((y + dy) * width + (x + dx)) * 4;
          histogramR[srcPixels[idx]]++;
          histogramG[srcPixels[idx + 1]]++;
          histogramB[srcPixels[idx + 2]]++;
        }
      }

      // Поиск медианы для каждого канала
      const medianR = findMedian(histogramR, windowSize);
      const medianG = findMedian(histogramG, windowSize);
      const medianB = findMedian(histogramB, windowSize);

      const idx = (y * width + x) * 4;
      dstPixels[idx] = medianR;
      dstPixels[idx + 1] = medianG;
      dstPixels[idx + 2] = medianB;
      dstPixels[idx + 3] = 255; // Альфа-канал
    }
  }

  return new ImageData(dstPixels, width, height);
}

