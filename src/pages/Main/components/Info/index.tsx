import { ChangeEvent, FC, useEffect, useState } from 'react';
import * as ST from './styled';
import { formatBytes } from '@src/utils';
import { SelectedChannelVariant, useImageContext } from '@pages/Main/provider';
import { ColorInputs } from '@pages/Main/components/ColorInputs';
import { ColorsForm } from '@pages/Main/components/ColorsForm';
import { Button } from '@src/components';
import { gammaCorrection, linearCorrection } from '@src/utils/colors';

const DEFAULT_BRIGHTNESS = 0;
const DEFAULT_GAMMA = 1;
const DEFAULT_SATURATION = 100;
const DEFAULT_CONTRAST = 0;
const DEFAULT_SLOPE = 1;
const DEFAULT_INTERCEPT = 0;

export enum ImageCorrectionVariants {
  LINEAR = 'linear',
  GAMMA = 'gamma'
}

export const Info: FC = () => {
  const {
    file,
    imageData,
    setCanvasImageData,
    canvasImageData,
    canvas,
    ctx,
    image,
    currentColor,
    selectedChannel,
    setSelectedChannel,
    setFormattedCanvasImageData,
  } = useImageContext();
  const [brightness, setBrightness] = useState(DEFAULT_BRIGHTNESS); // Начальное значение яркости
  const [gamma, setGamma] = useState(DEFAULT_GAMMA); // Начальное значение яркости
  const [saturation, setSaturation] = useState(DEFAULT_SATURATION);
  const [contrast, setContrast] = useState(DEFAULT_CONTRAST);
  const [selectedCorrection, setSelectedCorrection] = useState(ImageCorrectionVariants.LINEAR);
  const [isBlack, setIsBlack] = useState(false);
  const [slope, setSlope] = useState(DEFAULT_SLOPE);
  const [intercept, setIntercept] = useState(DEFAULT_INTERCEPT);

  const handleBrightnessChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newBrightness = Number(e.target.value);
    setBrightness(newBrightness); // Обновляем значение яркости по мере изменения ползунка
  };

  const handleContrastChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newContrast = Number(e.target.value);
    setContrast(newContrast); // Обновляем значение яркости по мере изменения ползунка
  };

  const handleGammaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newGamma = Number(e.target.value);
    setGamma(newGamma);
    setSlope(DEFAULT_SLOPE);
    setIntercept(DEFAULT_INTERCEPT);
  };

  const handleSlopeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSlope = Number(e.target.value);
    setSlope(newSlope);
    setGamma(DEFAULT_GAMMA);
  };

  const handleInterceptChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newIntercept = Number(e.target.value);
    setIntercept(newIntercept);
    setGamma(DEFAULT_GAMMA);
  };

  const handleSaturationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSaturation = Number(e.target.value);
    setSaturation(newSaturation);
  };

  const handleChannelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedChannel(e.target.value as SelectedChannelVariant);
  };

  const handleCorrectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCorrection(e.target.value as ImageCorrectionVariants);
  };

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
      setIsBlack(true);
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

  const handleReset = () => {
    if (ctx && canvas && image) {
      setBrightness(DEFAULT_BRIGHTNESS);
      setContrast(DEFAULT_CONTRAST);
      setSaturation(DEFAULT_SATURATION);
      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setCanvasImageData(imageData);
      setIsBlack(false);
      setSlope(DEFAULT_SLOPE);
      setIntercept(DEFAULT_INTERCEPT);
      setGamma(DEFAULT_GAMMA);
    }
  }

  return (
    <ST.Wrapper>
      <Button text="Сбросить" onClick={handleReset} />
      <ST.InfoItem>
        Наименование:
        <ST.InfoItemValue>{file?.name}</ST.InfoItemValue>
      </ST.InfoItem>
      <ST.InfoItem>
        Размер:
        <ST.InfoItemValue>{formatBytes(file?.size || 0)}</ST.InfoItemValue>
      </ST.InfoItem>
      <ST.InfoItem>
        Разрешение:
        <ST.InfoItemValue>{imageData?.info.width} x {imageData?.info.height}</ST.InfoItemValue>
      </ST.InfoItem>
      <ST.InfoItem>
        Глубина цвета:
        <ST.InfoItemValue>{imageData?.info.colorDepth}</ST.InfoItemValue>
      </ST.InfoItem>
      <ST.InfoItem>
        Формат файла:
        <ST.InfoItemValue>{imageData?.info.type}</ST.InfoItemValue>
      </ST.InfoItem>
      <ST.InfoItem>
        Цветовая модель:
        <ST.InfoItemValue>{imageData?.info.colorModel}</ST.InfoItemValue>
      </ST.InfoItem>
      <ST.InfoItem>
        Яркость:
        <input
          type="range"
          min="-100"
          max="100"
          value={brightness}
          onChange={handleBrightnessChange}
        />
        {brightness}
      </ST.InfoItem>
      <ST.InfoItem>
        Насыщенность:
        <input
          type="range"
          min="0"
          max="200"
          value={saturation}
          onChange={handleSaturationChange}
        />
        {saturation}
      </ST.InfoItem>
      <ST.InfoItem>
        Контрастность:
        <input
          type="range"
          min="0"
          max="200"
          value={contrast}
          onChange={handleContrastChange}
        />
        {contrast}
      </ST.InfoItem>
      <ST.InfoItem>
        Канал:
        <select value={selectedChannel} onChange={handleChannelChange}>
          <option value="rgb">RGB</option>
          <option value="r">R</option>
          <option value="g">G</option>
          <option value="b">B</option>
        </select>
      </ST.InfoItem>
      <Button text="Преобразовать в градациях серого" onClick={handleClickGrayScale} />
      {isBlack && (
        <ST.InfoItem>
          Коррекция:
          <select value={selectedCorrection} onChange={handleCorrectionChange}>
            <option value="linear">Линейная коррекция (y = slope * x + intercept)</option>
            <option value="gamma">Нелинейная коррекция (Гамма)</option>
          </select>
        </ST.InfoItem>
      )}

      {isBlack && selectedCorrection === ImageCorrectionVariants.LINEAR && (
        <>
          <ST.InfoItem>
            slope:
            <input
              type="range"
              min="0"
              max="2"
              step="0.01"
              value={slope}
              onChange={handleSlopeChange}
            />
            {slope}
          </ST.InfoItem>
          <ST.InfoItem>
            intercept:
            <input
              type="range"
              min="0"
              max="2"
              step="0.01"
              value={intercept}
              onChange={handleInterceptChange}
            />
            {intercept}
          </ST.InfoItem>
        </>
      )}

      {isBlack && selectedCorrection === ImageCorrectionVariants.GAMMA && (
        <>
          <ST.InfoItem>
            gamma:
            <input
              type="range"
              min="0"
              max="2"
              step="0.01"
              value={gamma}
              onChange={handleGammaChange}
            />
            {gamma}
          </ST.InfoItem>
        </>
      )}


      {currentColor && (
        <ColorsForm color={currentColor} />
      )}
    </ST.Wrapper>
  )
}
