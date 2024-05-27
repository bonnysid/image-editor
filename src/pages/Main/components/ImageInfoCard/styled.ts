import styled from 'styled-components';
import { COLORS } from '@src/constants';

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
