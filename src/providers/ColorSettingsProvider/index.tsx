import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';

const DEFAULT_BRIGHTNESS = 0;
const DEFAULT_SATURATION = 100;
const DEFAULT_CONTRAST = 0;
const DEFAULT_GAMMA = 1;
const DEFAULT_SLOPE = 1;
const DEFAULT_INTERCEPT = 0;

type ColorSettingsContextState = {
  brightness: number;
  saturation: number;
  contrast: number;
  slope: number;
  intercept: number;
  gamma: number;
  isBlack: boolean;
  selectedCorrection: ImageCorrectionVariants;

  onChangeBrightness: (v: number) => void;
  onChangeSaturation: (v: number) => void;
  onChangeContrast: (v: number) => void;
  onChangeSlope: (v: number) => void;
  onChangeIntercept: (v: number) => void;
  onChangeGamma: (v: number) => void;
  onSelectedCorrection: (v: string) => void;
  toggleBlack: () => void;

  resetColorSettings: () => void;
}

const ColorSettingsContext = createContext<ColorSettingsContextState>({} as ColorSettingsContextState);

export enum ImageCorrectionVariants {
  LINEAR = 'linear',
  GAMMA = 'gamma'
}

export const useColorSettingsContext = () => useContext(ColorSettingsContext);

export const ColorSettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [brightness, setBrightness] = useState(DEFAULT_BRIGHTNESS); // Начальное значение яркости
  const [saturation, setSaturation] = useState(DEFAULT_SATURATION);
  const [contrast, setContrast] = useState(DEFAULT_CONTRAST);
  const [slope, setSlope] = useState(DEFAULT_SLOPE);
  const [intercept, setIntercept] = useState(DEFAULT_INTERCEPT);
  const [gamma, setGamma] = useState(DEFAULT_GAMMA); // Начальное значение яркости
  const [isBlack, setIsBlack] = useState(false);
  const [selectedCorrection, setSelectedCorrection] = useState<ImageCorrectionVariants>(ImageCorrectionVariants.LINEAR);

  const onChangeGamma = (value: number) => {
    setGamma(value);

    setSlope(DEFAULT_SLOPE);
    setIntercept(DEFAULT_INTERCEPT);
  };

  const onChangeSlope = (value: number) => {
    setSlope(value);

    setGamma(DEFAULT_GAMMA);
  };

  const onChangeIntercept = (value: number) => {
    setIntercept(value);

    setGamma(DEFAULT_GAMMA);
  };

  const toggleBlack = () => {
    setIsBlack(prev => !prev);
  }

  const resetColorSettings = () => {
    setIsBlack(false);
    setGamma(DEFAULT_GAMMA);
    setSlope(DEFAULT_SLOPE);
    setIntercept(DEFAULT_INTERCEPT);
    setSaturation(DEFAULT_SATURATION);
    setContrast(DEFAULT_CONTRAST);
    setBrightness(DEFAULT_BRIGHTNESS);
    setSelectedCorrection(ImageCorrectionVariants.LINEAR);
  }

  const onSelectedCorrection = (value: string) => {
    setSelectedCorrection(value as ImageCorrectionVariants);
  }

  useEffect(() => {
    if (selectedCorrection === ImageCorrectionVariants.GAMMA) {
      setSlope(DEFAULT_SLOPE);
      setBrightness(DEFAULT_BRIGHTNESS);
    } else {
      setGamma(DEFAULT_GAMMA);
    }
  }, [selectedCorrection]);

  return (
    <ColorSettingsContext.Provider value={{
      brightness,
      contrast,
      gamma,
      intercept,
      isBlack,
      saturation,
      slope,
      selectedCorrection,

      toggleBlack,
      onChangeBrightness: setBrightness,
      onChangeContrast: setContrast,
      onChangeGamma,
      onChangeIntercept,
      onChangeSaturation: setSaturation,
      resetColorSettings,
      onChangeSlope,
      onSelectedCorrection,
    }}>
      {children}
    </ColorSettingsContext.Provider>
  )
}
