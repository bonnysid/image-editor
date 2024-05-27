import { FC } from 'react';
import * as ST from './styled';
import { Header, Image, Info } from '@pages/Main/components';
import { VideoPlayer } from '@components/VideoPlayer';

const Main: FC = () => {
  return (
    <ST.Wrapper>
      <Header />
      <ST.Content>
        <Info />
        <ST.ImageContent>
          {/*<Image />*/}
          <VideoPlayer url="http://localhost:5000/uploads/processed_video.mp4" />
        </ST.ImageContent>
      </ST.Content>
    </ST.Wrapper>
  )
}



export default Main;
