import {FC} from 'react';
import * as ST from './styled';
import {ProcessImageVariants, useImageContext} from '@src/providers/ImageContextProvider';
import {ColorsForm} from '@pages/Main/components/ColorsForm';
import {Button} from '@src/components';
import {HistogramCard, ImageInfoCard, MorphologicOperationsCard} from '@pages/Main/components';
import {ColorSettingsCard} from '@pages/Main/components/ColorSettingsCard';
import {useColorSettingsContext} from '@src/providers/ColorSettingsProvider';
import {useMorphologicOperationsContext} from '@src/providers/MorphologicOperationsProvider';
import {ImageSettingsCard} from '@pages/Main/components/ImageSettingsCard';
import {useImageSettingContext} from '@src/providers/ImageSettingsProvider';
import {EditorVariants, useEditorTypeContext} from "@src/providers/EditorTypeProvider";
import {ProcessTypeVariants, useVideoContext} from "@src/providers/VideoProvider";
import {PointDetectionCard} from "@pages/Main/components/PointDetectionCard";

export const Info: FC = () => {
  const {
    setCanvasImageData,
    canvas,
    ctx,
    image,
    currentColor,
    processImage,
  } = useImageContext();
  const { processVideo } = useVideoContext();
  const { editorType } = useEditorTypeContext();
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

  const handleClickBackground = () => {
    processVideo(ProcessTypeVariants.BACKGROUND_SUBTRACTION);
  }

  const handleClickBlur = () => {
    processVideo(ProcessTypeVariants.BLUR_MOVING_OBJECTS);
  }

  return (
    <ST.Wrapper>
      {editorType === EditorVariants.IMAGE && (
        <>
          <Button text="Сбросить" onClick={handleReset} />

          <ImageInfoCard />
          <ColorSettingsCard />
          <MorphologicOperationsCard />
          <ImageSettingsCard />
          <HistogramCard />
          <PointDetectionCard />

          {currentColor && (
            <ColorsForm color={currentColor} />
          )}

        </>
      )}


      {editorType === EditorVariants.VIDEO && (
        <>
          <Button text="Вычитание фона" onClick={handleClickBackground} />
          <Button text="Размытие движущихся объектов" onClick={handleClickBlur} />
        </>
      )}
    </ST.Wrapper>
  )
}
