import React from 'react';
import styled from "styled-components";

const PhoneNumberForm = ({loading, setPhone}) => {
  return (
    <div>
      
      <Background />
      
      <Container topHeight={"15%"}>
        
        
      </Container>
      
      One more thing!
      Please enter your phone number.
    </div>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur("6px");
  transition: backdrop-filter 0.2s;
  
  z-index: 1;
`;

const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 25%;
  transition: top 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  
  top: ${props => props.topHeight};
  transform: translateX(-50%);
  -webkit-transform:translateX(-50%);
  padding: 1.3rem 1.7rem;
  border: 2px solid #401c2c;
  border-radius: 17px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.8);
  background-color: #996178;
  z-index: 1;
  cursor: pointer;
  width: fit-content;
`;

export default PhoneNumberForm;