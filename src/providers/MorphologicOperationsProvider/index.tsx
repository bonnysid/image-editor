import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';

const DEFAULT_EROSION = 0;
const DEFAULT_DILATION = 0;
const DEFAULT_OPENING = 0;
const DEFAULT_CLOSING = 0;
const DEFAULT_GRADIENT = 0;

type MorphologicOperationsContextState = {
  erosion: number;
  dilation: number;
  opening: number;
  closing: number;
  gradient: number;

  onChangeErosion: (v: number) => void;
  onChangeDilation: (v: number) => void;
  onChangeClosing: (v: number) => void;
  onChangeOpening: (v: number) => void;
  onChangeGradient: (v: number) => void;

  resetMorphologicOperations: () => void;
}

const MorphologicOperationsContext = createContext<MorphologicOperationsContextState>({} as MorphologicOperationsContextState);

export const useMorphologicOperationsContext = () => useContext(MorphologicOperationsContext);

export const MorphologicOperationsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [erosion, setErosion] = useState(DEFAULT_EROSION);
  const [dilation, setDilation] = useState(DEFAULT_DILATION);
  const [opening, setOpening] = useState(DEFAULT_OPENING);
  const [closing, setClosing] = useState(DEFAULT_CLOSING);
  const [gradient, setGradient] = useState(DEFAULT_GRADIENT);

  const onChangeErosion = (value: number) => {
    setErosion(value); // Обновляем значение яркости по мере изменения ползунка

    setDilation(DEFAULT_DILATION);
    setOpening(DEFAULT_OPENING);
    setClosing(DEFAULT_CLOSING);
    setGradient(DEFAULT_GRADIENT);
  };

  const onChangeDilation = (value: number) => {
    setDilation(value); // Обновляем значение яркости по мере изменения ползунка

    setErosion(DEFAULT_EROSION);
    setOpening(DEFAULT_OPENING);
    setClosing(DEFAULT_CLOSING);
    setGradient(DEFAULT_GRADIENT);
  };

  const onChangeOpening = (value: number) => {
    setOpening(value); // Обновляем значение яркости по мере изменения ползунка

    setErosion(DEFAULT_EROSION);
    setClosing(DEFAULT_CLOSING);
    setGradient(DEFAULT_GRADIENT);
    setDilation(DEFAULT_DILATION);
  };

  const onChangeClosing = (value: number) => {
    setClosing(value); // Обновляем значение яркости по мере изменения ползунка

    setErosion(DEFAULT_EROSION);
    setOpening(DEFAULT_OPENING);
    setGradient(DEFAULT_GRADIENT);
    setDilation(DEFAULT_DILATION);
  };

  const onChangeGradient = (value: number) => {
    setGradient(value); // Обновляем значение яркости по мере изменения ползунка

    setErosion(DEFAULT_EROSION);
    setOpening(DEFAULT_OPENING);
    setClosing(DEFAULT_CLOSING);
    setDilation(DEFAULT_DILATION);
  };

  const resetMorphologicOperations = () => {
    setErosion(DEFAULT_EROSION);
    setOpening(DEFAULT_OPENING);
    setClosing(DEFAULT_CLOSING);
    setDilation(DEFAULT_DILATION);
    setGradient(DEFAULT_GRADIENT);
  }

  return (
    <MorphologicOperationsContext.Provider value={{
      erosion,
      dilation,
      opening,
      closing,
      gradient,

      onChangeClosing,
      onChangeErosion,
      onChangeDilation,
      onChangeGradient,
      onChangeOpening,

      resetMorphologicOperations,
    }}>
      {children}
    </MorphologicOperationsContext.Provider>
  )
}
