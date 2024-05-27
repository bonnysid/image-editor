import { FC } from 'react';
import { Card, Range } from '@src/components';
import { performClosing, performErosion, performGradient, performOpening, performDilation } from '@src/utils/colors';
import { useImageContext } from '@src/providers/ImageContextProvider';
import { useApplyEffectToImage } from '@src/hooks/useApplyEffectToImage';
import { useMorphologicOperationsContext } from '@src/providers/MorphologicOperationsProvider';

export const MorphologicOperationsCard: FC = () => {
  const { ctx, canvasImageData } = useImageContext();
  const {
    erosion,
    closing,
    opening,
    dilation,
    gradient,
    onChangeErosion,
    onChangeGradient,
    onChangeDilation,
    onChangeClosing,
    onChangeOpening,
  } = useMorphologicOperationsContext();

  useApplyEffectToImage({
    ctx,
    fn: () => {
      if (canvasImageData) {
        return performErosion(canvasImageData, erosion)
      }
    },
    deps: [erosion]
  });

  useApplyEffectToImage({
    ctx,
    fn: () => {
      if (canvasImageData) {
        return performDilation(canvasImageData, dilation);
      }
    },
    deps: [dilation]
  });

  useApplyEffectToImage({
    ctx,
    fn: () => {
      if (canvasImageData) {
        return performOpening(canvasImageData, opening);
      }
    },
    deps: [opening]
  });

  useApplyEffectToImage({
    ctx,
    fn: () => {
      if (canvasImageData) {
        return performClosing(canvasImageData, closing);
      }
    },
    deps: [closing]
  });

  useApplyEffectToImage({
    ctx,
    fn: () => {
      if (canvasImageData) {
        return performGradient(canvasImageData, gradient);
      }
    },
    deps: [gradient]
  });

  return (
    <Card title="Морфологические операции">
      <Range value={erosion} onChange={onChangeErosion} caption="Эрозия" />
      <Range value={dilation} onChange={onChangeDilation} caption="Дилатация" />
      <Range value={opening} onChange={onChangeOpening} caption="Открытие" />
      <Range value={closing} onChange={onChangeClosing} caption="Закрытие" />
      <Range value={gradient} onChange={onChangeGradient} caption="Градиент" />
    </Card>
  )
}
