import { FC, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as ST from './styled';
import { IconSize } from '@src/components';
import {useVideoContext} from "@src/providers/VideoProvider";
import {VideoPlayer} from "@components/VideoPlayer";

export const Video: FC = () => {
  const { videoUrl, onLoadVideo, processedVideoUrl } = useVideoContext();

  const {getInputProps, getRootProps} = useDropzone({
    onDrop: async (acceptedFiles, fileRejections, event) => {
      const file = acceptedFiles[0];
      if (file) {
        onLoadVideo(file);
      }
    },
  });

  return (
    <ST.Wrapper isUpload={!videoUrl} {...(!videoUrl ? getRootProps() : {})}>
      {!videoUrl && (
        <>
          <ST.UploadContainer>
            <ST.StyledIcon type="cloud-upload" size={IconSize.XXXL} />
            <ST.UploadText>Загрузите видео</ST.UploadText>
          </ST.UploadContainer>
        </>
      )}
      {videoUrl && (
        <VideoPlayer url={videoUrl} />
      )}
      {processedVideoUrl && (
        <VideoPlayer url={processedVideoUrl} />
      )}
      <ST.Input {...(!videoUrl ? getInputProps() : {})} />
    </ST.Wrapper>
  )
}
