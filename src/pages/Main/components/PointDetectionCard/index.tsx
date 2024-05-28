import {FC} from "react";
import {ProcessImageVariants, useImageContext} from "@src/providers/ImageContextProvider";
import {Button, Card} from "@src/components";

export const PointDetectionCard: FC = () => {
  const { file, processImage } = useImageContext()

  return (
    <Card title="Выделение ключевых точек" disabled={!file}>
      <Button text="FAST" onClick={() => processImage(ProcessImageVariants.FAST)} />
      <Button text="SIFT" onClick={() => processImage(ProcessImageVariants.SIFT)} />
      <Button text="SURF" onClick={() => processImage(ProcessImageVariants.SURF)} />
      <Button text="HARRIS" onClick={() => processImage(ProcessImageVariants.HARRIS)} />
    </Card>
  )
}