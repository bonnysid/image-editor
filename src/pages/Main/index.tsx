import { FC } from 'react';
import * as ST from './styled';
import { Header, Image, Info } from '@pages/Main/components';

const Main: FC = () => {
  return (
    <ST.Wrapper>
      <Header />
      <ST.Content>
        <Info />
        <ST.ImageContent>
          <Image />
        </ST.ImageContent>
      </ST.Content>
    </ST.Wrapper>
  )
}



export default Main;
