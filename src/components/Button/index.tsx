import { ButtonHTMLAttributes, FC } from 'react';
import * as ST from './styled';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  isActive?: boolean;
  isGroupItem?: boolean;
  isFirst?: boolean;
}
export const Button: FC<Props> = ({ text, isActive = true, ...props }) => {
  return (
    <ST.Wrapper {...props} isActive={isActive}>
      {text}
    </ST.Wrapper>
  )
}
