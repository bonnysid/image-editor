import styled from 'styled-components';
import { COLORS } from '@src/constants';

export const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  padding: 16px;
  max-width: 400px;
  width: 100%;
  background: ${COLORS.darkGray120};
  color: ${COLORS.white};
  overflow: hidden;
`;

export const InfoItem = styled.div`
  display: flex;
  gap: 4px;
  color: ${COLORS.white};
`;

export const InfoItemValue = styled.div`
  display: flex;
  color: ${COLORS.lightGray50};
  white-space: nowrap;
`;
