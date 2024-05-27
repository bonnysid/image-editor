import styled, { css } from 'styled-components';
import { COLORS } from '@src/constants';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${COLORS.gray90};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: ${COLORS.darkGray110};
  cursor: pointer;
`;

export const Title = styled.div`
  user-select: none;
`;

export const Content = styled.div<{ isHidden?: boolean; }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  transition: height .2s;
  padding: 10px 20px;
`;
