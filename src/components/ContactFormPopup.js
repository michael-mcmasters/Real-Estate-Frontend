import React, { useState, useEffect } from 'react';
import styled, { css } from "styled-components";
import GLogo from "../images/GLogo.png"
import FLogo from "../images/FLogo.png"
import phoneRegexValidation from '../Constants/PhoneValidation';

const email = process.env.REACT_APP_EMAIL_TO_SEND_TO;


const ContactFormPopup = ({ Background, Container, showSSOOptions, firstName, lastName, setFirstName, setLastName, setEmail, setPhone, handleSSOSignIn, handleSubmit }) => {

  const [transition, setTransition] = useState(false);

  useEffect(() => {
    setTransition(true);
  }, []);
  
  let ssoOptions;
  if (showSSOOptions) {
    ssoOptions = (
      <SingleSignOnContainer>
        <SingleSignOn onClick={() => handleSSOSignIn("Facebook")} backgroundColor={"#237CF3"}>
          <FImage src={FLogo} />
          <Text>Continue with Facebook</Text>
        </SingleSignOn>
        <br />
        <SingleSignOn onClick={() => handleSSOSignIn("Google")} backgroundColor={"#DF513F"}>
          <GImage src={GLogo} />
          <Text>Continue with Google</Text>
        </SingleSignOn>
      </SingleSignOnContainer>
    );
  } else {
    ssoOptions = (
      <SingleSignOnErrorContainer>
        There was an error logging in.
        <br />
        Please fill the form to continue.
      </SingleSignOnErrorContainer>
    )
  }
  
  return (
    <>
      <Background transition={transition} />

      <Container transition={transition}>
        
        <TitleContainer>
          <Title>Get instant access to these great properties</Title>
        </TitleContainer>

        {ssoOptions}
        
        
        {/* Sends email using FormSubmit. See documentation: https://formsubmit.co/documentation */}
        <Form onSubmit={handleSubmit} action={`https://formsubmit.co/${email}`} method="POST">
          <Label for="first-name">First name:</Label>
          <Input onChange={(e) => setFirstName(e.target.value)} id="first-name" placeholder='First name' type="text" name="name" required />
          <Label for="last-name">Last name:</Label>
          <Input onChange={(e) => setLastName(e.target.value)} id="last-name" placeholder='Last name' type="text" name="name" required />
          <Label for="email">Email:</Label>
          <Input onChange={(e) => setEmail(e.target.value)} id="email" placeholder="email@domain.com" type="email" name="email" required />
          <Label for="phone">Phone:</Label>
          <Input onChange={(e) => setPhone(e.target.value)} id="phone" placeholder='xxx-xxx-xxxx' type="tel" name="tel" pattern={phoneRegexValidation} required />

          {/* Removes reCaptcha */}
          <Input type="hidden" name="_captcha" value="false" />
          {/* Goes to this link on submit */}
          <Input type="hidden" name="_next" value="https://130bernicedr.go2frr.com/index.html" />
          {/* Tricks bots to avoid spam */}
          <Input type="text" name="_honey" style={{ display: "none" }} />
          {/* Subject of email */}
          <Input type="hidden" name="_subject" value={`New Lead! - ${firstName} ${lastName}`} />
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

`;

const SingleSignOnContainer = styled.div`
  margin-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.gray};
`;

const SingleSignOnErrorContainer = styled.div`
  margin-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.gray};
  /* width: fit-content; */
  text-align: center;
`;

const SingleSignOn = styled.button`
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.theme.gray};
  border-radius: 7px;
  padding: 0.5rem 1rem;
  width: 17rem;
  margin: 0 auto;
  
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background-color: ${props => props.backgroundColor};
  
  &:hover {
    opacity: 0.9;
    transition: 0.2s;
  }
`;

const FImage = styled.img`
  width: 1.9rem;
  background-color: white;
  border-radius: 9999px;
`;

const GImage = styled.img`
  width: 1.2rem;
  background-color: white;
  padding: 0.3rem;
  border-radius: 9999px;
`;

const Text = styled.span`
  display: inline-block;
  margin: 0 auto;
`;

const Form = styled.form`
  margin: 1rem auto;
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

export default ContactFormPopup;