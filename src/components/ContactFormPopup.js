import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createPerson } from '../graphql/mutations'

const email = process.env.REACT_APP_EMAIL_TO_SEND_TO;


const ContactFormPopup = () => {

  const [backgroundBlur, setBackgroundBlur] = useState("0px");
  const [topHeight, setTopHeight] = useState('100%');

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumer] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    setBackgroundBlur("6px");
    setTopHeight("15%");
  }, []);

  function capitalizeFirstLetter(name) {
    if (name == null && name == undefined) return;

    if (name.length > 1) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    } else {
      return name.charAt(0).toUpperCase();
    }
  }

  async function addLeadToGraphQL() {
    try {
      const person = {
        firstName,
        lastName,
        phone: phoneNumber,
        email: userEmail
      }
      await API.graphql(graphqlOperation(createPerson, { input: person }))
      console.log("New lead added to GraphQL");
    } catch (err) {
      console.log("Adding lead to GraphQL did not work. Error: " + err);
    }
  }

  // Sends email using FormSubmit. See documentation: https://formsubmit.co/documentation
  return (
    <>
      <Background backgroundBlur={backgroundBlur} />
      
      <Container topHeight={topHeight}>
        <Title>Please fill to continue</Title>
        <Form onSubmit={addLeadToGraphQL} action={`https://formsubmit.co/${email}`} method="POST">
          <Input onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' type="text" name="first-name" required />
          <Input onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' type="text" name="last-name" required />
          <Input onChange={(e) => setPhoneNumer(e.target.value)} placeholder='Phone Number' type="tel" name="tel" required />
          <Input onChange={(e) => setUserEmail(e.target.value)} type="email" name="email" placeholder="Email Address" required />

          {/* Goes to this link on submit */}
          <Input type="hidden" name="_next" value="https://130bernicedr.go2frr.com/index.html" />
          {/* Tricks bots to avoid spam */}
          <Input type="text" name="_honey" style={{ display: "none" }} />
          {/* Subject of email */}
          <Input type="hidden" name="_subject" value={`New Lead! - ${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(lastName)}`} />
          {/* Sends email */}
          <Button type="submit" onSubmitCapture={addLeadToGraphQL} onSubmit={addLeadToGraphQL}>Continue</Button>
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

const Title = styled.h3`
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
  margin: 0.75rem;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid black;
`;

const Button = styled.button`
  margin: 0.75rem;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid black;
`;

export default ContactFormPopup;