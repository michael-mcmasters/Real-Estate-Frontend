import React, { useState, useEffect } from 'react';
import styled, { css } from "styled-components";
import GLogo from "../images/GLogo.png"
import FLogo from "../images/FLogo.png"

const email = process.env.REACT_APP_EMAIL_TO_SEND_TO;


const ContactFormPopup3 = ({ Background, Container, name, setName, setEmail, setPhone, handleSSOSignIn, handleSubmit }) => {

  const [transition, setTransition] = useState(false);

  useEffect(() => {
    setTransition(true);
  }, []);
  
  return (
    <>
      <Background transition={transition} />

      <Container transition={transition}>
        
        <TitleContainer>
          <Title>Get instant access to these great properties</Title>
        </TitleContainer>

        <SingleSignOnContainer>
          <SingleSignOn backgroundColor={"#237CF3"}>
            <FImage src={FLogo} />
            <Text>Continue with Facebook</Text>
          </SingleSignOn>
          
          <SingleSignOn backgroundColor={"#DF513F"}>
            <GImage src={GLogo} />
            <Text>Continue with Google</Text>
          </SingleSignOn>
        </SingleSignOnContainer>
        


        {/* <FormTitle>Or enter your info</FormTitle> */}
        {/* Sends email using FormSubmit. See documentation: https://formsubmit.co/documentation */}
        <Form onSubmit={handleSubmit} action={`https://formsubmit.co/${email}`} method="POST">
          <Label for="name">Name:</Label>
          <Input onChange={(e) => setName(e.target.value)} id="name" placeholder='First and last name' type="text" name="name" required />
          <Label for="email">Email:</Label>
          <Input onChange={(e) => setEmail(e.target.value)} id="email" placeholder="email@domain.com" type="email" name="email" required />
          <Label for="phone">Phone:</Label>
          <Input onChange={(e) => setPhone(e.target.value)} id="phone" placeholder='xxx-xxx-xxxx' type="tel" name="tel" required />

          {/* Removes reCaptcha */}
          <Input type="hidden" name="_captcha" value="false" />
          {/* Goes to this link on submit */}
          <Input type="hidden" name="_next" value="https://130bernicedr.go2frr.com/index.html" />
          {/* Tricks bots to avoid spam */}
          <Input type="text" name="_honey" style={{ display: "none" }} />
          {/* Subject of email */}
          <Input type="hidden" name="_subject" value={`New Lead! - ${name}`} />
          {/* Sends email */}
          <Button type="submit">Continue</Button>
        </Form>
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
  /* width: fit-content; */
  /* padding-bottom: 1rem; */
`;

const SingleSignOnContainer = styled.div`
  margin-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.gray};
`;

const SingleSignOn = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.theme.gray};
  border-radius: 7px;
  padding: 0.5rem 1rem;
  width: 15rem;
  margin: 0 auto;
  
  font-weight: 600;
  color: white;
  background-color: ${props => props.backgroundColor};
  
  &:hover {
    opacity: 0.8;
    transition: 0.2s;
  }
`;

const FImage = styled.img`
  width: 2.1rem;
  height: 2.1rem;
  background-color: white;
  border-radius: 9999px;
`;

const GImage = styled.img`
  width: 1.5rem;
  background-color: white;
  padding: 0.3rem;
  border-radius: 9999px;
`;

const Text = styled.span`
  display: inline-block;
  margin: 0 auto;
`;



const FormTitle = styled.h5`
  /* margin: 1rem auto; */
  margin-left: 1rem;
  width: fit-content;
`;

const Form = styled.form`
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* border: 1px solid red; */
  width: 15rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.3rem;;
`;

const Input = styled.input`
  padding: 0.5rem;
  /* border-radius: 8px; */
  border-radius: 4px;
  border: 1px solid black;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  margin: 0.5rem auto;
  padding: 0.75rem;
  width: fit-content;
  font-weight: 600;
  color: white;
  /* border: none; */
  border: 1px solid ${props => props.theme.gray};
  border-radius: 10px;
  background-color: orange;
`;

export default ContactFormPopup3;