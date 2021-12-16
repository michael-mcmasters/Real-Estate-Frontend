import React, { useState } from 'react';
import abc from "../images/simplescreenshot.png";
import styled from "styled-components";

const email = process.env.REACT_APP_EMAIL_TO_SEND_TO;


const HomePage = () => {
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]= useState("");
  
  function capitalizeFirstLetter(name) {
    if (name == null && name == undefined) return;
    
    if (name.length > 1) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    } else {
      return name.charAt(0).toUpperCase();
    }
  }
  
  // Sends email using FormSubmit. See documentation: https://formsubmit.co/documentation
  return (
    <>
    <img src={abc} />
      <Container>
        <Title>Please fill to continue</Title>
        <Form action={`https://formsubmit.co/${email}`} method="POST">
          <Input onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' type="text" name="first-name" required />
          <Input onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' type="text" name="last-name" required />
          <Input placeholder='Phone Number' type="tel" name="tel" required />
          <Input type="email" name="email" placeholder="Email Address" required />
          
          {/* Goes to this link on submit */}
          <Input type="hidden" name="_next" value="https://130bernicedr.go2frr.com/index.html" />
          {/* Tricks bots to avoid spam */}
          <Input type="text" name="_honey" style={{ display: "none" }} />
          {/* Subject of email */}
          <Input type="hidden" name="_subject" value={`New Lead! - ${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(lastName)}`} />
          
          <Button type="submit">Continue</Button>
        </Form>
      </Container>
    </>
  );
};

const Container = styled.h3`
  margin-top: 5rem;
`;

const Title = styled.div`
  margin: 0 auto;
  width: fit-content;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 10rem;
  margin-top: 0.7rem;
  margin-left: auto;
  margin-right: auto;
`;

const Input = styled.input`
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid black;
`;

const Button = styled.button`
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid black;
`;

export default HomePage;