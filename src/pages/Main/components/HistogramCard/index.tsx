import { FC, useEffect, useState } from 'react';
import * as ST from './styled';
import { SelectedChannelVariant, useImageContext } from '@src/providers/ImageContextProvider';
import { COLORS } from '@src/constants';
import { Card, Select } from '@src/components';

const CHANNEL_OPTIONS = [
  { value: SelectedChannelVariant.RGB, label: 'RGB' },
  { value: SelectedChannelVariant.R, label: 'R' },
  { value: SelectedChannelVariant.G, label: 'G' },
  { value: SelectedChannelVariant.B, label: 'B' },
]

export const HistogramCard: FC = () => {
  const { formattedCanvasImageData, canvasImageData, selectedChannel, setSelectedChannel } = useImageContext();
  const [canvasHistogram, setCanvasHistogram] = useState<HTMLCanvasElement | null>(null);
  const [ctxHistogram, setCtxHistogram] = useState<CanvasRenderingContext2D | null | undefined>(null);

  const [histogramData, setHistogramData] = useState<{ r: number[]; g: number[]; b: number[] } | undefined>();

  useEffect(() => {
    if (formattedCanvasImageData || canvasImageData) {
      const histogram = calculateHistogram((formattedCanvasImageData || canvasImageData as ImageData).data);

      setHistogramData(histogram);
    }
  }, [formattedCanvasImageData, canvasImageData, canvasHistogram, ctxHistogram]);

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
      const maxH = Math.max(...histogramData.b, ...histogramData.r, ...histogramData.b);

      const offset = 10;
      const scaleFactorH = 1 / (maxH / (canvasHistogram.height - offset * 2));
      const scaleFactorW = 1 / (barWidth * (canvasHistogram.width - offset * 2) / canvasHistogram.width);

      ctxHistogram.clearRect(0, 0, canvasHistogram.width, canvasHistogram.height);
      ctxHistogram.fillStyle = COLORS.white
      ctxHistogram.fillRect(0, 0, canvasHistogram.width, canvasHistogram.height);

      for (let i = 0; i < 256; i++) {
        let value;
        if (selectedChannel.includes(SelectedChannelVariant.R)) {
          value = histogramData.r[i];
          ctxHistogram.fillStyle = 'red';
          ctxHistogram.fillRect(i * (barWidth) * scaleFactorW + offset, canvasHistogram.height - value * scaleFactorH - offset, barWidth * scaleFactorW, value * scaleFactorH);
        }
        if (selectedChannel.includes(SelectedChannelVariant.G)) {
          value = histogramData.g[i];
          ctxHistogram.fillStyle = 'green';
          ctxHistogram.fillRect(i * barWidth * scaleFactorW + offset, canvasHistogram.height - value * scaleFactorH - offset, barWidth * scaleFactorW, value * scaleFactorH);
        }
        if (selectedChannel.includes(SelectedChannelVariant.B)) {
          value = histogramData.b[i];
          ctxHistogram.fillStyle = 'blue';
          ctxHistogram.fillRect(i * barWidth * scaleFactorW + offset, canvasHistogram.height - value * scaleFactorH - offset, barWidth * scaleFactorW, value * scaleFactorH);
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
    <Card title="Гистограмма">
      <Select
        value={selectedChannel}
        onChange={setSelectedChannel}
        options={CHANNEL_OPTIONS}
        caption="Канал"
      />

      <ST.Canvas
        ref={(ref) => {
          setCanvasHistogram(ref);
          setCtxHistogram(ref?.getContext('2d'));
        }}
      />
    </Card>
  )
}
