import { FC } from 'react';
import * as ST from './styled';
import { formatBytes } from '@src/utils';
import { useImageContext } from '@pages/Main/provider';
import { ColorInputs } from '@pages/Main/components/ColorInputs';
import { ColorsForm } from '@pages/Main/components/ColorsForm';


export const Info: FC = () => {
  const { file, imageData, ctx, image, currentColor } = useImageContext();

  return (
    <ST.Wrapper>
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

      {currentColor && (
        <ColorsForm color={currentColor} />
      )}
    </ST.Wrapper>
  )
}
