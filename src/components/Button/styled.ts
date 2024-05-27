import styled from 'styled-components';
import { COLORS } from '@src/constants';

export const Wrapper = styled.button`
  display: flex;
  padding: 10px;
  border-radius: 4px;
  background: ${COLORS.blue60};
  color: ${COLORS.white};
  transition: opacity .2s;
  
  &:hover {
    opacity: .5;
  }
`;
