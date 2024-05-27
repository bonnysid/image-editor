import styled from 'styled-components';
import { Player } from 'video-react';

export const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 2px;
  width: 100%;
  height: calc(100% - 4px);
  transition: background-color .3s;
  cursor: pointer;

  &:hover {
    background-color: rgb(51 51 51 / 60%);
  }
`;

export const Wrapper = styled(Player)`
  
`

export const Container = styled.div`
  display: flex;
  width: 100%;
  border-radius: 10px;
`;


