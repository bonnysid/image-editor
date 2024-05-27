import { FC, useState } from 'react';
import { Button, Card, Range } from '@src/components';
import { useImageContext } from '@src/providers/ImageContextProvider';
import {
  performCannyEdgeDetection,
  performEmboss,
  performMedianFilter,
  performMotionBlur, performRobertsEdgeDetection,
  performSharpen
} from '@src/utils/colors';
import { useApplyEffectToImage } from '@src/hooks/useApplyEffectToImage';
import { useImageSettingContext } from '@src/providers/ImageSettingsProvider';

export const ImageSettingsCard: FC = () => {
  const {
    median,
    onChangeMedian,
    sharpen,
    emboss,
    canny,
    motionBlur,
    onChangeCanny,
    onChangeEmboss,
    onChangeMotionBlur,
    onChangeSharpen,
  } = useImageSettingContext();
  const { ctx, canvas, canvasImageData } = useImageContext();

  const handleClickOperatorRoberts = () => {
    if (ctx && canvas && canvasImageData) {
      const newImageData = performRobertsEdgeDetection(canvasImageData);
      ctx.putImageData(newImageData, 0, 0);
    }
  }

  useApplyEffectToImage({
    ctx,
    deps: [motionBlur],
    fn: () => {
      if (ctx && canvasImageData) {
        return performMotionBlur(canvasImageData, motionBlur);
      }
    }
  })

  useApplyEffectToImage({
    ctx,
    deps: [median],
    fn: () => {
      if (ctx && canvasImageData) {
        return performMedianFilter(canvasImageData, median);
      }
    }
  })

  useApplyEffectToImage({
    ctx,
    deps: [canny],
    fn: () => {
      if (ctx && canvasImageData) {
        return performCannyEdgeDetection(canvasImageData, canny);
      }
    }
  })

  useApplyEffectToImage({
    ctx,
    deps: [sharpen],
    fn: () => {
      if (ctx && canvasImageData) {
        return performSharpen(canvasImageData, sharpen);
      }
    }
  })

  useApplyEffectToImage({
    ctx,
    deps: [emboss],
    fn: () => {
      if (ctx && canvasImageData) {
        return performEmboss(canvasImageData, emboss);
      }
    }
  })

  return (
    <Card title="Настройки изображения">
      <Button text="Оператор Робертса" onClick={handleClickOperatorRoberts} />

      <Range value={motionBlur} onChange={onChangeMotionBlur} caption="Размытие в движении" min="1" />
      <Range value={median} onChange={onChangeMedian} caption="Медианная фильтрация" min="1" max="50" />
      <Range value={canny} onChange={onChangeCanny} caption="Детектор Canny" min="0" max="750" />
      <Range value={sharpen} onChange={onChangeSharpen} caption="Резкость" min="0" max="50" />
      <Range value={emboss} onChange={onChangeEmboss} caption="Тиснение" min="0" max="50" />
    </Card>
  )
}
