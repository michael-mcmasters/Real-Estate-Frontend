import React from 'react';
import actualWebsiteImg from "./images/actual-website.jpg";
import styled from "styled-components";
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from "react-router-dom";
import SignInHandler from './components/SignInHandler';

function App() {

  return (
    <ThemeProvider theme={ColorTheme}>
      <BrowserRouter>
        <Image src={actualWebsiteImg} />
        <SignInHandler />
      </BrowserRouter>
    </ThemeProvider>
  );
}

const ColorTheme = {
  gray: "#E5E5E5"
};

const Image = styled.img`
  width: 100%;
`;

export default App;
