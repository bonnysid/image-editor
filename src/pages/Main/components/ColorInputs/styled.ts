import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: flex-end;
  width: 100%;
  justify-content: space-between;
`;

export const InputsWrapper = styled.div`
  display: flex;
  gap: 4px;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Input = styled.input`
  min-width: 50px;
  padding: 4px 8px;
  border-radius: 4px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }
`;

export const Caption = styled.div`

`;
