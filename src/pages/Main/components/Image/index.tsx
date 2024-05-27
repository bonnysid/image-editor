import { FC, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as ST from './styled';
import { IconSize } from '@src/components';
import { useImageContext } from '@src/providers/ImageContextProvider';

export const IMAGE_ELEMENT_ID = 'image';

export const Image: FC = () => {
  const {
    onLoadImage,
    image,
    ctx,
    setCtx, canvas,
    setCanvas,
    onChangeCurrentColor,
    setCanvasImageData,
  } = useImageContext();

  const {getInputProps, getRootProps} = useDropzone({
    onDrop: async (acceptedFiles, fileRejections, event) => {
      const file = acceptedFiles[0];
      if (file) {
        onLoadImage(file);
      }
    },
  });

  useEffect(() => {
    if (canvas && ctx && image) {
      canvas.width = image?.naturalWidth;
      canvas.height = image?.naturalHeight;
      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setCanvasImageData(imageData);
    }
  }, [canvas, ctx, image]);

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const x = event.nativeEvent.offsetX;
        const y = event.nativeEvent.offsetY;

        const pixelData = ctx.getImageData(x, y, 1, 1).data;

        const [r,g,b] = pixelData;

        onChangeCurrentColor({
          r,
          g,
          b,
        });
      }
    }
  }

  return (
    <ST.Wrapper isUpload={!image} {...(!image ? getRootProps() : {})}>
      {!image && (
        <>
          <ST.UploadContainer>
            <ST.StyledIcon type="cloud-upload" size={IconSize.XXXL} />
            <ST.UploadText>Загрузите изображение</ST.UploadText>
          </ST.UploadContainer>
        </>
      )}
      <ST.StyledCanvas
        hidden={!image}
        ref={(ref) => {
          setCanvas(ref);
          setCtx(ref?.getContext('2d'));
        }}
        width={image?.width}
        height={image?.height}
        onClick={handleClick}
      />
      <ST.Input {...(!image ? getInputProps() : {})} />
    </ST.Wrapper>
  )
}
