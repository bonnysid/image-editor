import styled from 'styled-components';
import { COLORS } from '@src/constants';

export const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  width: 100%;
  background: ${COLORS.darkGray120};
  color: ${COLORS.white};
  overflow: hidden;
`;

export const ColorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ColorSquare = styled.div<{ color: string }>`
  display: flex;
  width: 100%;
  height: 32px;
  background: ${({ color }) => color};
  border: 1px solid ${COLORS.lightGray50};
`;
