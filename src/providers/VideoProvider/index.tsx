import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';
import axios from "axios";

export type VideoContextState = {
  videoUrl?: string;
  processedVideoUrl?: string;
  processVideo: (processType: ProcessTypeVariants) => void;
  onLoadVideo: (file: File) => void;
}

export enum ProcessTypeVariants {
  BACKGROUND_SUBTRACTION = 'background_subtraction',
  BLUR_MOVING_OBJECTS = 'blur_moving_objects',
}

const VideoContext = createContext<VideoContextState>({} as VideoContextState);

export const useVideoContext = () => useContext(VideoContext);

export const VideoProvider: FC<PropsWithChildren> = ({ children }) => {
  const [file, setFile] = useState<File>()
  const [videoUrl, setVideoUrl] = useState<string>();
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string>();

  const onLoadVideo = async (file: File) => {
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setVideoUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  const processVideo = async (processType: ProcessTypeVariants) => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append('video', file);
        formData.append('processType', processType);

        const response = await axios.post('http://localhost:5000/process', formData);

        const videoUrl = response.data.video_url;
        setProcessedVideoUrl(videoUrl);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <VideoContext.Provider value={{
      onLoadVideo,
      videoUrl,
      processedVideoUrl,
      processVideo,
    }}>
      {children}
    </VideoContext.Provider>
  )
}
