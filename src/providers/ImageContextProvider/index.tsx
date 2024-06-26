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
  canvasImageData?: ImageData;
  formattedCanvasImageData?: ImageData;
  setCanvasImageData: (value: ImageData) => void;
  setFormattedCanvasImageData: (value: ImageData) => void;
  currentColor?: ImageColor;
  onChangeCurrentColor: (color?: ImageColor) => void;
  selectedChannel: SelectedChannelVariant;
  setSelectedChannel: (value: string) => void;
  onLoadImage: (file: File) => void;
  processImage: (method: ProcessImageVariants) => void;
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

export enum SelectedChannelVariant {
  RGB = 'rgb',
  R = 'r',
  G = 'g',
  B = 'b',
}

export enum ProcessImageVariants {
  HARRIS = 'harris',
  SIFT = 'sift',
  SURF = 'surf',
  FAST = 'fast',
}

export const ImageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedChannel, setSelectedChannel] = useState<SelectedChannelVariant>(SelectedChannelVariant.RGB);
  const [image, setImage] = useState<HTMLImageElement>();
  const [file, setFile] = useState<File>();
  const [imageColorDepth, setImageColorDepth] = useState<number>();
  const [imageData, setImageData] = useState<ImageUploadResult>();
  const [canvasImageData, setCanvasImageData] = useState<ImageData>();
  const [formattedCanvasImageData, setFormattedCanvasImageData] = useState<ImageData>();
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

  const processImage = async (method: ProcessImageVariants) => {
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('method', method);

      try {
        const response = await ImageApi.processImage(formData);
        const url = response.data.image_url;
        const img = new Image();
        img.src = url;

        img.onload = () => {
          if (ctx) {
            ctx.drawImage(img, 0, 0);
          }
        }
      } catch (error) {
        console.error('Error processing image:', error);
      }
    }
  };

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
      canvasImageData,
      setCanvasImageData,
      onChangeCurrentColor: setCurrentColor,
      selectedChannel,
      setSelectedChannel: (value: string) => setSelectedChannel(value as SelectedChannelVariant),
      formattedCanvasImageData,
      setFormattedCanvasImageData,
      processImage,
    }}>
      {children}
    </ImageContext.Provider>
  )
}
