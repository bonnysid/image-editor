import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';

type ImageSettingsProviderState = {
  motionBlur: number;
  median: number;
  emboss: number;
  sharpen: number;
  canny: number;

  onChangeMotionBlur: (v: number) => void;
  onChangeMedian: (v: number) => void;
  onChangeEmboss: (v: number) => void;
  onChangeSharpen: (v: number) => void;
  onChangeCanny: (v: number) => void;

  resetImageSettings: () => void;
}

const ImageSettingsContext = createContext<ImageSettingsProviderState>({} as ImageSettingsProviderState);

export const useImageSettingContext = () => useContext(ImageSettingsContext);

const DEFAULT_BLUR = 1;
const DEFAULT_MEDIAN = 1;
const DEFAULT_CANNY = 0;
const DEFAULT_EMBOSS = 0;
const DEFAULT_SHARPEN = 0;

export const ImageSettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [motionBlur, setMotionBlur] = useState(DEFAULT_BLUR);
  const [median, setMedian] = useState(DEFAULT_MEDIAN);
  const [emboss, setEmboss] = useState(DEFAULT_EMBOSS);
  const [sharpen, setSharpen] = useState(DEFAULT_SHARPEN);
  const [canny, setCanny] = useState(DEFAULT_CANNY);

  const onChangeMotionBlur = (value: number) => {
    setMotionBlur(value);

    setMedian(DEFAULT_MEDIAN);
    setEmboss(DEFAULT_EMBOSS);
    setSharpen(DEFAULT_SHARPEN);
    setCanny(DEFAULT_CANNY);
  }

  const onChangeMedian = (value: number) => {
    setMedian(value);

    setMotionBlur(DEFAULT_BLUR);
    setEmboss(DEFAULT_EMBOSS);
    setSharpen(DEFAULT_SHARPEN);
    setCanny(DEFAULT_CANNY);
  }

  const onChangeSharpen = (value: number) => {
    setSharpen(value);

    setMotionBlur(DEFAULT_BLUR);
    setMedian(DEFAULT_MEDIAN);
    setEmboss(DEFAULT_EMBOSS);
    setCanny(DEFAULT_CANNY);
  }

  const onChangeEmboss = (value: number) => {
    setEmboss(value);

    setMotionBlur(DEFAULT_BLUR);
    setMedian(DEFAULT_MEDIAN);
    setSharpen(DEFAULT_SHARPEN);
    setCanny(DEFAULT_CANNY);
  }

  const onChangeCanny = (value: number) => {
    setCanny(value);

    setMotionBlur(DEFAULT_BLUR);
    setMedian(DEFAULT_MEDIAN);
    setEmboss(DEFAULT_EMBOSS);
    setSharpen(DEFAULT_CANNY);
  }

  const resetImageSettings = () => {
    setMotionBlur(DEFAULT_BLUR);
    setMedian(DEFAULT_MEDIAN);
    setEmboss(DEFAULT_EMBOSS);
    setSharpen(DEFAULT_CANNY);
    setCanny(DEFAULT_CANNY);
  }

  return (
    <ImageSettingsContext.Provider value={{
      canny,
      emboss,
      median,
      sharpen,
      motionBlur,

      onChangeEmboss,
      onChangeMedian,
      onChangeMotionBlur,
      onChangeSharpen,
      onChangeCanny,

      resetImageSettings,
    }}>
      {children}
    </ImageSettingsContext.Provider>
  )
}
