import React from 'react';
import styled from "styled-components";

const PhoneNumberForm = ({Background, Container, loading, setPhone}) => {
  return (
    <div>
      
      <Background transition={true} />
      
      <Container transition={true}>
        One more thing!
        Please enter your phone number.        
      </Container>
    </div>
  );
};

export default PhoneNumberForm;