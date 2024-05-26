import styled, { css } from 'styled-components';
import { IconSize } from '@components/Icon/Icon';

const calcSize = (size: IconSize) => {
  switch (size) {
    case IconSize.XS:
      return 12;
    case IconSize.SM:
      return 14;
    case IconSize.MD:
      return 16;
    case IconSize.LG:
      return 18;
    case IconSize.XL:
      return 24;
    case IconSize.XXL:
      return 36;
    case IconSize.XXXL:
      return 60;
  }
}

export const Wrapper = styled.div<{ size: IconSize }>`
  display: flex;
  ${({ size }) => {
    const px = calcSize(size);
    
    return css`
      width: ${px}px;
      height: ${px}px;
    `
  }}
`;
