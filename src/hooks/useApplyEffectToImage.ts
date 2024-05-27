import { DependencyList, useEffect } from 'react';

type Props = {
  ctx?: CanvasRenderingContext2D | null;
  fn: () => ImageData | undefined;
  deps?: DependencyList;
}

export const useApplyEffectToImage = ({ ctx, fn, deps }: Props) => {
  useEffect(() => {
    if (ctx) {
      const imageData = fn();
      if (imageData) {
        ctx.putImageData(imageData, 0, 0);
      }
    }
  }, deps);
}
