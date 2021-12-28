import React, { useEffect, useState } from 'react';
import abc from "./images/actual-website.jpg";
import styled from "styled-components";
import { ThemeProvider } from 'styled-components';
import ContactFormPopup from "./components/ContactFormPopup";
import ContactFormPopup2 from "./components/ContactFormPopup2";
import ContactFormContainer from "./components/ContactFormContainer";
import ContactFormContainer2 from "./components/ContactFormContainer2";
import Dummy from "./components/Dummy";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import SignInHandler from './components/SignInHandler';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setShowPopup(true);
    }, 750)
  }, [showPopup]);
  
  return (
      <ThemeProvider theme={ColorTheme}>
      <BrowserRouter>
        <Image src={abc} />
      
        <SignInHandler />
      </BrowserRouter>
      </ThemeProvider>
  );
  
  // return (
  //   <ThemeProvider theme={ColorTheme}>
  //     <Image src={abc} />
      
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/" element={<Dummy />}>
  //           <Route index element={<Dummy />} />
  //           <Route path="teams" element={<Dummy />}>
  //             <Route path=":teamId" element={<Dummy />} />
  //             <Route path="new" element={<Dummy />} />
  //             <Route index element={<Dummy />} />
  //           </Route>
  //         </Route>
  //       </Routes>
  //     </BrowserRouter>
  //   </ThemeProvider>
  // );
  
  // return (
  //   <>
  //     <ThemeProvider theme={ColorTheme}>
        // <Image src={abc} />
      
  //       {showPopup && <ContactFormContainer2 />}
  //     </ThemeProvider>
  //   </>
  // );
}

const ColorTheme = {
  gray: "#E5E5E5"
};

const Image = styled.img`
  width: 100%;
`;

export default App;
