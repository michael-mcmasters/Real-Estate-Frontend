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
          <SingleSignOn fontColor={"white"} backgroundColor={"#237CF3"}>
            <FImage src={FLogo} />
            <Text>Continue with Facebook</Text>
          </SingleSignOn>
          
          <SingleSignOn fontColor={"white"} backgroundColor={"#DF513F"}>
            <GImage src={GLogo} />
            <Text>Continue with Google</Text>
          </SingleSignOn>
        </SingleSignOnContainer>
        

        {/* <button onClick={() => handleSSOSignIn("Google")} >Continue with Google</button> */}
        {/* <button onClick={() => handleSSOSignIn("Facebook")} >Continue with Facebook</button> */}

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



const Form = styled.form`
  margin-top: 1rem;
`;

const Input = styled.input`
`;

const Button = styled.button`
`;

export default ContactFormPopup3;