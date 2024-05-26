import React from 'react';
import * as ST from './styled';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@src/router';

const App = () => {
  return (
    <BrowserRouter>
      <ST.GlobalStyles />
      <ST.AppWrapper>
        <AppRouter />
      </ST.AppWrapper>
    </BrowserRouter>
  );
}

export default App;
