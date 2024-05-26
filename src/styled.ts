import styled, { createGlobalStyle } from 'styled-components';

import RubikLight from '@src/assets/fonts/Rubik-Light.ttf';
import RubikRegular from '@src/assets/fonts/Rubik-Regular.ttf';
import RubikMedium from '@src/assets/fonts/Rubik-Medium.ttf';
import RubikSemiBold from '@src/assets/fonts/Rubik-SemiBold.ttf';
import RubikBold from '@src/assets/fonts/Rubik-Bold.ttf';
import RubikExtraBold from '@src/assets/fonts/Rubik-ExtraBold.ttf';
import RubikBlack from '@src/assets/fonts/Rubik-Black.ttf';
import { COLORS } from '@src/constants';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Rubik';
    font-weight: 300;
    font-style: normal;
    src: url(${RubikLight}) format('truetype');
  }
  @font-face {
    font-family: 'Rubik';
    font-weight: 400;
    font-style: normal;
    src: url(${RubikRegular}) format('truetype');
  }
  @font-face {
    font-family: 'Rubik';
    font-weight: 500;
    font-style: normal;
    src: url(${RubikMedium}) format('truetype');
  }
  @font-face {
    font-family: 'Rubik';
    font-weight: 600;
    font-style: normal;
    src: url(${RubikSemiBold}) format('truetype');
  }
  @font-face {
    font-family: 'Rubik';
    font-weight: 700;
    font-style: normal;
    src: url(${RubikBold}) format('truetype');
  }
  @font-face {
    font-family: 'Rubik';
    font-weight: 800;
    font-style: normal;
    src: url(${RubikExtraBold}) format('truetype');
  }
  @font-face {
    font-family: 'Rubik';
    font-weight: 900;
    font-style: normal;
    src: url(${RubikBlack}) format('truetype');
  }
  
  * {
    padding: 0;
    margin: 0;
    border: 0;
  }

  *, *:before, *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  :focus, :active {
    outline: none;
  }
  a:focus, a:active {
    outline: none;
  }
  nav, footer, header, aside {
    display: block;
  }
  html, body, #root {
    height: 100%;
    width: 100%;
    font-size: 100%;
    font-size: 14px;
    background: #f6f8f9;
    -ms-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    font-family: Rubik, sans-serif;
    color: ${COLORS.darkGray140};
    background: ${COLORS.lightGray10};
  }
  
  .modal_footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 4rem;
  }
  
  #root {
    position: relative;
    z-index: 1;
  }
  #toast-root {
    position: relative;
    z-index: 2;
  }
  input::-ms-clear {
    display: none;
  }
  input, button, textarea {
    font-family: inherit;
  }
  button {
    cursor: pointer;
  }
  button::-moz-focus-inner {
    padding: 0;
    border: 0;
  }
  a, a:visited {
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
  
  .app-toast {
    position: fixed;
    z-index: 999999 !important;
  }
`;

export const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
