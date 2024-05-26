import { FC } from 'react';
import * as ST from './styled';
import { Header, Image, Info } from '@pages/Main/components';
import { ImageProvider } from '@pages/Main/provider';
import { Histogram } from '@pages/Main/components/Histogram';

const Main: FC = () => {
  return (
    <ST.Wrapper>
      <Header />
      <ST.Content>
        <Info />
        <ST.ImageContent>
          <Image />
          <Histogram />
        </ST.ImageContent>
      </ST.Content>
    </ST.Wrapper>
  )
}

const WrapperMain: FC = () => {
  return (
    <ImageProvider>
      <Main />
    </ImageProvider>
  )
}



export default WrapperMain;
