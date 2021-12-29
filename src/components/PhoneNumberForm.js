import React from 'react';
import styled from "styled-components";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const PhoneNumberForm = ({ Background, Container, loading, setPhone, handleSubmitButton, errorMessage}) => {

  let element = null;
  if (loading) {
    element = (
      <>
        <Title>Authenticating...</Title>
        <LoaderContainer>
          <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
        </LoaderContainer>
      </>
    )
  } else {
    element = (
      <>
        <Title>
          One more thing
        </Title>
        <ContentText>
          Please enter your phone number.          
        </ContentText>
        
        <FormContainer>
          <Label for="phone">Phone:</Label>
          <Input onChange={(e) => setPhone(e.target.value)} id="phone" placeholder='xxx-xxx-xxxx' type="tel" name="tel" required />
          <Button onClick={handleSubmitButton}>Continue</Button>
        </FormContainer>
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

const Title = styled.h3`
  margin: 1rem auto;
  width: fit-content;
`;

const LoaderContainer = styled.div`
  margin: 0 auto;
  width: fit-content;
  /* border: 1px solid red; */
`;

const ContentText = styled.p`
  margin: 1rem auto;
  width: fit-content;
`;

const FormContainer = styled.div`
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  width: 15rem;
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

export default PhoneNumberForm;