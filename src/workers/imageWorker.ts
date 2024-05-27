// @ts-ignore
type ImageDataEvent = {
  imageData: ImageData;
  type: 'erosion' | 'dilation';
  level: number; // Уровень эрозии
};

// eslint-disable-next-line no-restricted-globals
self.onmessage = function(e: MessageEvent<ImageDataEvent>) {
  const { imageData, type, level } = e.data;
  let result: ImageData;
  console.log(level,type)
  if (type === 'erosion') {
    result = performErosion(imageData, level);
  } if (type === 'dilation') {
    result = performDilation(imageData, level);
  } else {
    result = imageData; // Если нужна функция дилатации, здесь должна быть реализация
  }
  postMessage({ imageData: result });
};

const performErosion = (imageData: ImageData, level: number = 1) => {
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
const performDilation = (imageData: ImageData, level = 1) => {
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
