export const getBase64 = async (file: File, onLoad: (res: string) => void) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    onLoad(reader.result as string);
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

const sizes = ['байт', 'КБ', 'МБ', 'ГБ', 'ТБ'];

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) {
    return '0';
  } else {
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}

export const getImageColorDepth = (image: HTMLImageElement, onReady: (deep: number) => void) => {
  let canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  let ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.drawImage(image, 0, 0);

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;
    let colorDepthSet = new Set();

    for (let i = 0; i < data.length; i += 4) {
      // Получаем RGBA значения
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
      let a = data[i + 3];
      // Конвертируем в hex строку, добавляя ведущие нули при необходимости
      let rgbaHex = ('000000' + (r << 16 | g << 8 | b).toString(16)).slice(-6) + ('0' + a.toString(16)).slice(-2);
      colorDepthSet.add(rgbaHex);
    }

    // Глубина цвета - это количество уникальных цветов
    onReady(colorDepthSet.size);
  }
}
