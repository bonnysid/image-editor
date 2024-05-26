import styled, { css } from 'styled-components';
import { COLORS } from '@src/constants';
import { Icon } from '@src/components';

export const Wrapper = styled.div<{ isUpload?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  
  ${({ isUpload }) => isUpload && css`
    cursor: pointer;
    transition: opacity .2s;

    &:hover {
      opacity: 0.5;
    }
  `}
`;

export const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const StyledIcon = styled(Icon)`
  color: ${COLORS.white};
`;

export const UploadText = styled.div`
  font-size: 16px;
  line-height: 16px;
  color: ${COLORS.lightGray30};
`;

export const Input = styled.input`
  display: none;
`;

export const Img = styled.img<{ hidden: boolean }>`
  ${({ hidden }) => hidden && css`
    display: none;
  `}
`;

export const StyledCanvas = styled.canvas<{ hidden: boolean }>`
  ${({ hidden }) => hidden && css`
    display: none;
  `}
`;
