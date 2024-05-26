import styled from 'styled-components';
import { COLORS } from '@src/constants';

export const Wrapper = styled.button`
  display: flex;
  padding: 4px 8px;
  border-radius: 4px;
  background: #6174ad;
  color: ${COLORS.white};
  transition: opacity .2s;
  
  &:hover {
    opacity: .5;
  }
`;
