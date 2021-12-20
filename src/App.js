import React, { useEffect, useState } from 'react';
import abc from "./images/actual-website.jpg";
import styled from "styled-components";
import ContactFormPopup from "./components/ContactFormPopup";
import { Logger } from 'aws-amplify';

const logger = new Logger('logBuddy');
Amplify.register(logger);
logger.addPluggable(new AWSCloudWatchProvider());

function App() {
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    console.log("console log - USE EFFECT IN EFFECT")
    
    logger.info('INFO info bar');
    logger.debug('DEBUG debug bar');
    logger.warn('WARN warn bar');
    logger.error('ERROR error bar');
    
    setTimeout(() => {
      console.log("console log - TIMEOUT COMPLETE")
      setShowPopup(true);
    }, 750)
  }, [showPopup]);
  
  return (
    <>
      <Image src={abc} />
      
      {showPopup && <ContactFormPopup />}
    </>
  );
}

const Image = styled.img`
  width: 100%;
`;

export default App;
