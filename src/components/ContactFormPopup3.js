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

        <SSOContainer fontColor={"white"} backgroundColor={"#237CF3"}>
          <FImage src={FLogo} />
          <Text>Continue with Facebook</Text>
        </SSOContainer>
        <br />
        <SSOContainer fontColor={"white"} backgroundColor={"#DF513F"}>
          <GImage src={GLogo} />
          <Text>Continue with Google</Text>
        </SSOContainer>
        

        {/* <button onClick={() => handleSSOSignIn("Google")} >Continue with Google</button> */}
        {/* <button onClick={() => handleSSOSignIn("Facebook")} >Continue with Facebook</button> */}

        <Title>Please fill to continue</Title>
        {/* Sends email using FormSubmit. See documentation: https://formsubmit.co/documentation */}
        <Form onSubmit={handleSubmit} action={`https://formsubmit.co/${email}`} method="POST">
          <Input onChange={(e) => setName(e.target.value)} placeholder='First Name' type="text" name="first-name" required />
          <Input onChange={(e) => setPhone(e.target.value)} placeholder='Phone Number' type="tel" name="tel" required />
          <Input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email Address" required />

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

const SSOContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #E5E5E5;
  border-radius: 7px;
  padding: 0.5rem 1rem;
  width: 15rem;
  margin: 0 auto;
  
  font-weight: 600;
  color: ${props => props.fontColor};
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



const Title = styled.h3`
`;

const Form = styled.form`
`;

const Input = styled.input`
`;

const Button = styled.button`
`;

export default ContactFormPopup3;