import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import phoneRegexValidation from "../Constants/PhoneValidation";
import LoadingFormPopup from './LoadingFormPopup';

const PhoneFormPopup = ({ Background, Container, loading, setPhone, handleSubmitButton}) => {

  const phoneInputEle = useRef(null);
  const continueButtonEle = useRef(null);
  
  useEffect(() => {
    const inputFieldKeyListener = (event) => {
      if (event.keyCode === 13) {                   // Enter key
        continueButtonEle.current.click();
      }
    }
    document.addEventListener("keydown", inputFieldKeyListener);

    return () => document.removeEventListener("keydown", inputFieldKeyListener);
  }, []);
  
  let element = null;
  if (loading) {
    element = (
      <LoadingFormPopup />
    )
  } else {
    element = (
      <>
        <TitleContainer>
          <Title>
            One more thing
          </Title>
        </TitleContainer>
        <MainText>
          Please enter your phone number
        </MainText>
        
      <FlexContainer>
        <FormContainer onSubmit={(e) => {e.preventDefault(); handleSubmitButton()}}>
          <Label for="phone">Phone:</Label>
            <Input ref={phoneInputEle} onChange={(e) => setPhone(e.target.value)} id="phone" placeholder='xxx-xxx-xxxx' type="tel" name="tel" pattern={phoneRegexValidation} required />
            <Button ref={continueButtonEle}>Continue</Button>
        </FormContainer>
      </FlexContainer>
      </>
    )
  }
  
  return (
    <>
      <Background transition={true} />
      <Container transition={true}>
        {element}
      </Container>
    </>
  );
};

const TitleContainer = styled.div`
  margin: 0 auto;
  padding: 0;
  border-bottom: 1px solid ${props => props.theme.gray};
  text-align: center;
`;

const Title = styled.h3`
  margin: 1rem auto;
  width: fit-content;
`;

const MainText = styled.p`
  margin: 1rem auto;
  width: fit-content;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 9.5rem;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 15rem;
  margin: 0 auto;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.45rem;;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid black;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  margin: 0.5rem auto;
  padding: 0.6rem 0.8rem;
  width: fit-content;
  font-weight: 600;
  color: white;
  font-size: 1rem;
  border: 1px solid ${props => props.theme.gray};
  border-radius: 7px;
  background-color: orange;
  
  &:hover {
    opacity: 0.9;
    transition: 0.2s;
  }
`;

export default PhoneFormPopup;