import React, { useEffect, useState } from 'react';
import abc from "./images/actual-website.jpg";
import styled from "styled-components";
import ContactFormPopup from "./components/ContactFormPopup";
import ContactFormPopup2 from "./components/ContactFormPopup2";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setShowPopup(true);
    }, 750)
  }, [showPopup]);
  
  return (
    <>
      <Image src={abc} />
      
      {showPopup && <ContactFormPopup2 />}
    </>
  );
}

const Image = styled.img`
  width: 100%;
`;

export default App;
