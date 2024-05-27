import { FC, useEffect } from 'react';
import { Button, Card, Range, Select } from '@src/components';
import { gammaCorrection, linearCorrection } from '@src/utils/colors';
import { useImageContext } from '@src/providers/ImageContextProvider';
import { useColorSettingsContext } from '@src/providers/ColorSettingsProvider';

export enum ImageCorrectionVariants {
  LINEAR = 'linear',
  GAMMA = 'gamma'
}

const CORRECTION_OPTIONS = [
  { label: 'Линейная коррекция (y = slope * x + intercept)', value: ImageCorrectionVariants.LINEAR },
  { label: 'Нелинейная коррекция (Гамма)', value: ImageCorrectionVariants.GAMMA },
]

export const ColorSettingsCard: FC = () => {
  const {
    isBlack,
    onSelectedCorrection,
    intercept,
    gamma,
    slope,
    onChangeSaturation,
    onChangeIntercept,
    contrast,
    brightness,
    selectedCorrection,
    onChangeContrast,
    onChangeBrightness,
    saturation,
    onChangeGamma,
    onChangeSlope,
    toggleBlack,
  } = useColorSettingsContext();
  const { ctx, canvas, image, setCanvasImageData, canvasImageData, setFormattedCanvasImageData } = useImageContext();

  const handleClickGrayScale = () => {
    if (ctx && canvas && image) {
      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3; // Вычисляем среднее значение каналов RGB
        data[i] = avg; // Устанавливаем значение красного канала
        data[i + 1] = avg; // Устанавливаем значение зеленого канала
        data[i + 2] = avg; // Устанавливаем значение синего канала
      }

      ctx.putImageData(imageData, 0, 0);
      setCanvasImageData(imageData);
      toggleBlack();
    }
  }

  useEffect(() => {
    if (ctx && canvas && image && canvasImageData) {
      ctx.putImageData(canvasImageData, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // saturation
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const avg = (r + g + b) / 3;
        data[i] = avg + saturation / 100 * (r - avg); // Изменяем красный канал
        data[i + 1] = avg + saturation / 100 * (g - avg); // Изменяем зеленый канал
        data[i + 2] = avg + saturation / 100 * (b - avg); // Изменяем синий канал
      }

      // contrast
      const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

      for (let i = 0; i < data.length; i += 4) {
        data[i] = factor * (data[i] - 128) + 128; // Изменяем красный канал
        data[i + 1] = factor * (data[i + 1] - 128) + 128; // Изменяем зеленый канал
        data[i + 2] = factor * (data[i + 2] - 128) + 128; // Изменяем синий канал
      }

      //brightness
      for (let i = 0; i < data.length; i += 4) {
        data[i] += brightness; // Изменяем яркость красного канала
        data[i + 1] += brightness; // Изменяем яркость зеленого канала
        data[i + 2] += brightness; // Изменяем яркость синего канала
      }

      if (isBlack) {
        if (selectedCorrection === ImageCorrectionVariants.LINEAR) {
          linearCorrection(imageData, slope, intercept);
        }

        if (selectedCorrection === ImageCorrectionVariants.GAMMA) {
          gammaCorrection(imageData, gamma);
        }
      }

      setFormattedCanvasImageData(imageData);
      ctx.putImageData(imageData, 0, 0);
    }
  }, [saturation, contrast, brightness, slope, intercept, gamma]);

  return (
    <Card title="Настройки цвета">
      <Range value={brightness} onChange={onChangeBrightness} caption="Яркость" />
      <Range value={saturation} onChange={onChangeSaturation} caption="Насыщенность" />
      <Range value={contrast} onChange={onChangeContrast} caption="Контрастность" />
      <Button text="Преобразовать в градациях серого" onClick={handleClickGrayScale} />
      {isBlack && <Select value={selectedCorrection} onChange={onSelectedCorrection} options={CORRECTION_OPTIONS} caption="Коррекция" />}
      {isBlack && selectedCorrection === ImageCorrectionVariants.LINEAR && (
        <>
          <Range value={slope} onChange={onChangeSlope} caption="Slope" />
          <Range value={intercept} onChange={onChangeIntercept} caption="Intercept" />
        </>
      )}
      {isBlack && selectedCorrection === ImageCorrectionVariants.GAMMA && (
        <>
          <Range value={gamma} onChange={onChangeGamma} caption="Gamma" />
        </>
      )}
    </Card>
  )
}
