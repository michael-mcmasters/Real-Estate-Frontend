import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify'
import { createLead } from '../graphql/mutations'
import GLogo from "../images/GLogo.png"

const email = process.env.REACT_APP_EMAIL_TO_SEND_TO;


const ContactFormPopup3 = ({ name, setName, setEmail, setPhone, handleSubmit }) => {

  const [backgroundBlur, setBackgroundBlur] = useState("0px");
  const [topHeight, setTopHeight] = useState('100%');

  useEffect(() => {
    setBackgroundBlur("6px");
    setTopHeight("15%");
  }, []);
  
  function handleSSOSignOn(provider) {
    localStorage.setItem("authorizedSSO", "true");
    Auth.federatedSignIn({ provider: provider });
  }

  return (
    <>
      <Background backgroundBlur={backgroundBlur} />

      <Container topHeight={topHeight}>

        <>
          <GoogleContainer>
            <GoogleImage src={GLogo} />
            <span>Continue with Google</span>
          </GoogleContainer>
          <div>
            <span>ToDo: Continue with Facebook</span>
          </div>
        </>

        <button onClick={() => handleSSOSignOn("Google")} >Continue with Google</button>
        <button onClick={() => handleSSOSignOn("Facebook")} >Continue with Facebook</button>
        <button onClick={() => Auth.federatedSignIn()}>Normal Log In</button>
        <button onClick={async () => await Auth.signOut()}>Sign Out</button>

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

const Background = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(${props => props.backgroundBlur});
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

const GoogleContainer = styled.div`
  background-color: white;
`;

const GoogleImage = styled.img`
  width: 2rem;
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