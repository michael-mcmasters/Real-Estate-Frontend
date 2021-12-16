import React, { useEffect, useState } from 'react';
import abc from "./images/actual-website.jpg";
import styled from "styled-components";
import HomePage from "./components/HomePage";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setShowPopup(true);
    }, 1000)
  }, [showPopup]);
  
  return (
    <div>
      <Image src={abc} />
      
      {showPopup && <HomePage />}
    </div>
  );
}

const Image = styled.img`
  width: 100%;
`;

export default App;
