import { FC } from 'react';
import * as ST from './styled';
import { Header, Image, Info } from '@pages/Main/components';
import { ImageProvider } from '@pages/Main/provider';

const Main: FC = () => {
  return (
    <ST.Wrapper>
      <Header />
      <ST.Content>
        <Info />
        <Image />
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
