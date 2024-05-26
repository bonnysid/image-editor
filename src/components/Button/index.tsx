import { ButtonHTMLAttributes, FC } from 'react';
import * as ST from './styled';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
}
export const Button: FC<Props> = ({ text, ...props }) => {
  return (
    <ST.Wrapper {...props}>
      {text}
    </ST.Wrapper>
  )
}
