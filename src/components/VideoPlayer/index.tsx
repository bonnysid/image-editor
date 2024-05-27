import { FC, useState } from 'react';
import * as ST from './styled'
import {
  ControlBar,
  LoadingSpinner,
  PlayToggle, VolumeMenuButton,
} from 'video-react';
import 'video-react/dist/video-react.css';

interface IProps {
  url: string;
}

export const VideoPlayer: FC<IProps> = ({ url }) => {
  return (
    <ST.Container>
      <ST.Wrapper
        src={url}
        width={596}
      >
        <LoadingSpinner />
      </ST.Wrapper>
    </ST.Container>
  );
}
