import { FC, useEffect, useState } from 'react';
import * as ST from './styled';
import { SelectedChannelVariant, useImageContext } from '@pages/Main/provider';
import { COLORS } from '@src/constants';

export const Histogram: FC = () => {
  const { formattedCanvasImageData, canvasImageData, selectedChannel, image } = useImageContext();
  const [canvasHistogram, setCanvasHistogram] = useState<HTMLCanvasElement | null>(null);
  const [ctxHistogram, setCtxHistogram] = useState<CanvasRenderingContext2D | null | undefined>(null);

  const [histogramData, setHistogramData] = useState<{ r: number[]; g: number[]; b: number[] } | undefined>();

  useEffect(() => {
    if (formattedCanvasImageData || canvasImageData) {
      const histogram = calculateHistogram((formattedCanvasImageData || canvasImageData as ImageData).data);

      setHistogramData(histogram);
    }
  }, [formattedCanvasImageData, canvasImageData]);

  const calculateHistogram = (data: Uint8ClampedArray) => {
    const histogram = {
      r: new Array(256).fill(0),
      g: new Array(256).fill(0),
      b: new Array(256).fill(0)
    };

    for (let i = 0; i < data.length; i += 4) {
      histogram.r[data[i]]++;
      histogram.g[data[i + 1]]++;
      histogram.b[data[i + 2]]++;
    }

    return histogram;
  };

  const drawHistogram = () => {
    if (canvasHistogram && ctxHistogram && histogramData) {
      const barWidth = 2;
      const barSpacing = 1;
      const scaleFactor = 0.1 / canvasHistogram.height;
      const offset = 10;

      ctxHistogram.clearRect(0, 0, canvasHistogram.width, canvasHistogram.height);
      ctxHistogram.fillStyle = COLORS.gray90
      ctxHistogram.fillRect(0, 0, canvasHistogram.width, canvasHistogram.height);

      for (let i = 0; i < 256; i++) {
        let value;
        if (selectedChannel.includes(SelectedChannelVariant.R)) {
          value = histogramData.r[i];
          ctxHistogram.fillStyle = 'red';
          ctxHistogram.fillRect(i * (barWidth + barSpacing) + offset, canvasHistogram.height - value * scaleFactor, barWidth, value * scaleFactor);
        }
        if (selectedChannel.includes(SelectedChannelVariant.G)) {
          value = histogramData.g[i];
          ctxHistogram.fillStyle = 'green';
          ctxHistogram.fillRect(i * (barWidth + barSpacing) + offset, canvasHistogram.height - value * scaleFactor, barWidth, value * scaleFactor);
        }
        if (selectedChannel.includes(SelectedChannelVariant.B)) {
          value = histogramData.b[i];
          ctxHistogram.fillStyle = 'blue';
          ctxHistogram.fillRect(i * (barWidth + barSpacing) + offset, canvasHistogram.height - value * scaleFactor, barWidth, value * scaleFactor);
        }
      }
    }
  };

  useEffect(() => {
    if (histogramData) {
      drawHistogram();
    }
  }, [histogramData, selectedChannel]);

  return (
    <ST.Wrapper>
      <ST.Canvas
        ref={(ref) => {
          setCanvasHistogram(ref);
          setCtxHistogram(ref?.getContext('2d'));
        }}
        width={image?.width}
      />
    </ST.Wrapper>
  )
}
