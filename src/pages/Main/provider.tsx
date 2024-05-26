import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';
import { getBase64, getImageColorDepth } from '@src/utils';
import { ImageApi } from '@src/api/ImageApi/ImageApi';
import { ImageUploadResult } from '@src/api/ImageApi/models';

export type ImageContextState = {
  image?: HTMLImageElement;
  canvas: HTMLCanvasElement | null;
  ctx?: CanvasRenderingContext2D | null;
  setCanvas: (canvas: HTMLCanvasElement | null) => void;
  setCtx: (ctx: CanvasRenderingContext2D | null | undefined) => void;
  file?: File;
  imageColorDepth?: number;
  imageData?: ImageUploadResult;
  currentColor?: ImageColor;
  onChangeCurrentColor: (color?: ImageColor) => void;
  onLoadImage: (file: File) => void;
}

const ImageContext = createContext<ImageContextState>({} as ImageContextState);

export const useImageContext = () => useContext(ImageContext);

export enum ColorModel {
  RGB = 'rgb',
  HSL = 'hsl',
  CMYK = 'cmyk',
  HSV = 'hsv',
  LAB = 'lab',
  YCbCr = 'YCbCr',
}

export type ImageColor = {
  r: number;
  g: number;
  b: number;
}

export const ImageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [image, setImage] = useState<HTMLImageElement>();
  const [file, setFile] = useState<File>();
  const [imageColorDepth, setImageColorDepth] = useState<number>();
  const [imageData, setImageData] = useState<ImageUploadResult>();
  const [selectedColorModel, setSelectedColorModel] = useState<ColorModel>()
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null | undefined>(null);
  const [currentColor, setCurrentColor] = useState<ImageColor>();

  const onLoadImage = async (file: File) => {
    setFile(file);

    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await ImageApi.uploadImage(formData);
      setImageData(response.data);
    } catch (error) {
      console.error(error);
    }

    await getBase64(file, (base64) => {
      const img = new Image();
      img.src = base64;

      img.onload = () => {
        getImageColorDepth(img, deep => setImageColorDepth(deep))
        setImage(img)
      }
    })
  }

  return (
    <ImageContext.Provider value={{
      file,
      image,
      imageColorDepth,
      imageData,
      onLoadImage,
      ctx,
      canvas,
      setCanvas,
      setCtx,
      currentColor,
      onChangeCurrentColor: setCurrentColor,
    }}>
      {children}
    </ImageContext.Provider>
  )
}
