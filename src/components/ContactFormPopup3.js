import React, { useState, useEffect } from 'react';
import styled, { css } from "styled-components";
import GLogo from "../images/GLogo.png"

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

        <>
          <GoogleContainer>
            <GoogleImage src={GLogo} />
            <span>Continue with Google</span>
          </GoogleContainer>
          <div>
            <span>ToDo: Continue with Facebook</span>
          </div>
        </>

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