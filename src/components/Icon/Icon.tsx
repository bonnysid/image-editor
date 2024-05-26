import React from 'react';

import * as ST from './styled';
import { IconTypes, dictionary } from './IconDictionary';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  type: IconTypes;
  size?: IconSize;
};

export enum IconSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = 'xxl',
  XXXL = 'xxxl',
}

const Icon: React.FC<Props> = ({ type, size = IconSize.XL, className, ref, ...rest }) => {
  const Icon = dictionary[type];

  if (!Icon) {
    return null;
  }

  return (
    <ST.Wrapper
      className={className}
      size={size}
      {...rest}
    >
      <Icon />
    </ST.Wrapper>
  );
};

export { Icon };
export type { IconTypes };
