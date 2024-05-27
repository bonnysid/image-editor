import { ChangeEvent, FC } from 'react';
import * as ST from './styled';
import { SelectedChannelVariant, useImageContext } from '@src/providers/ImageContextProvider';
import { ColorsForm } from '@pages/Main/components/ColorsForm';
import { Button } from '@src/components';
import { HistogramCard, ImageInfoCard, MorphologicOperationsCard } from '@pages/Main/components';
import { ColorSettingsCard } from '@pages/Main/components/ColorSettingsCard';
import { useColorSettingsContext } from '@src/providers/ColorSettingsProvider';
import { useMorphologicOperationsContext } from '@src/providers/MorphologicOperationsProvider';
import { ImageSettingsCard } from '@pages/Main/components/ImageSettingsCard';
import { useImageSettingContext } from '@src/providers/ImageSettingsProvider';

export const Info: FC = () => {
  const {
    setCanvasImageData,
    canvas,
    ctx,
    image,
    currentColor,
  } = useImageContext();
  const { resetColorSettings } = useColorSettingsContext();
  const { resetMorphologicOperations } = useMorphologicOperationsContext();
  const { resetImageSettings } = useImageSettingContext();

  const handleReset = () => {
    if (ctx && canvas && image) {
      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setCanvasImageData(imageData);
      resetColorSettings();
      resetMorphologicOperations();
      resetImageSettings();
    }
  }

  return (
    <ST.Wrapper>
      <Button text="Сбросить" onClick={handleReset} />

      <ImageInfoCard />
      <ColorSettingsCard />
      <MorphologicOperationsCard />
      <ImageSettingsCard />
      <HistogramCard />

      {currentColor && (
        <ColorsForm color={currentColor} />
      )}
    </ST.Wrapper>
  )
}
