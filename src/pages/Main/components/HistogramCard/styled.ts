import styled from 'styled-components';
import { COLORS } from '@src/constants';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-height: 200px;
  background: ${COLORS.darkGray120};
  padding: 10px;
  justify-content: center;
  position: absolute;
  bottom: 0px;
`;

export const Canvas = styled.canvas``;
