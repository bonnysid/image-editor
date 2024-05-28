import styled, {css} from 'styled-components';
import { COLORS } from '@src/constants';

export const Wrapper = styled.button<{
    isActive?: boolean;
    isGroupItem?: boolean;
    isFirst?: boolean;
}>`
  display: flex;
  padding: 10px;
  border-radius: 4px;
  background: ${COLORS.blue60};
  color: ${COLORS.white};
  transition: opacity .2s;
    
  ${({ isActive, isGroupItem, isFirst }) => {
      if (isGroupItem) {
          if (isFirst) {
              return css`
                border-radius: 4px 0 0 4px;
              `;
          } else {
              return css`
                border-radius: 0 4px 4px 0;
              `;
          }
      }
  }}

  ${({ isActive }) => {
      if (!isActive) {
          return css`
            background: ${COLORS.gray60};
          `;
      } else {
          return css`
              background: ${COLORS.blue60};

          `;
      }
  }}
  
  &:hover {
    opacity: .5;
  }
`;
