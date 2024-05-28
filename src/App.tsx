import React from 'react';
import * as ST from './styled';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@src/router';
import { MorphologicOperationsProvider } from '@src/providers/MorphologicOperationsProvider';
import { ColorSettingsProvider } from '@src/providers/ColorSettingsProvider';
import { ImageProvider } from '@src/providers/ImageContextProvider';
import { ImageSettingsProvider } from '@src/providers/ImageSettingsProvider';
import {EditorTypeProvider} from "@src/providers/EditorTypeProvider";
import {VideoProvider} from "@src/providers/VideoProvider";

const App = () => {
  return (
    <BrowserRouter>
      <EditorTypeProvider>
        <VideoProvider>
          <ImageProvider>
            <ImageSettingsProvider>
              <MorphologicOperationsProvider>
                <ColorSettingsProvider>
                  <ST.GlobalStyles />
                  <ST.AppWrapper>
                    <AppRouter />
                  </ST.AppWrapper>
                </ColorSettingsProvider>
              </MorphologicOperationsProvider>
            </ImageSettingsProvider>
          </ImageProvider>
        </VideoProvider>
      </EditorTypeProvider>
    </BrowserRouter>
  );
}

export default App;
