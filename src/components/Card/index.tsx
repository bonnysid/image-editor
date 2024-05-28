import { FC, PropsWithChildren } from 'react';
import { IconTypes } from '@src/components';
import * as ST from './styled';
import { useModalControls } from '@src/hooks/useModalControls';

type Props = PropsWithChildren<{
  icon?: IconTypes;
  title: string;
  disabled?: boolean;
}>;

export const Card: FC<Props> = ({ title, icon, children, disabled }) => {
  const { isOpen, toggle } = useModalControls();

  return (
    <ST.Wrapper>
      <ST.Header onClick={!disabled ? toggle : undefined}>
        <ST.Title>{title}</ST.Title>
      </ST.Header>
      {isOpen && <ST.Content>{children}</ST.Content>}
    </ST.Wrapper>
  );
}
