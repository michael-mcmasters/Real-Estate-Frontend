import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify'
import { createLead } from '../graphql/mutations'
import GLogo from "../images/GLogo.png"

const email = process.env.REACT_APP_EMAIL_TO_SEND_TO;


const ContactFormPopup = () => {

  const [backgroundBlur, setBackgroundBlur] = useState("0px");
  const [topHeight, setTopHeight] = useState('100%');

  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumer] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    setBackgroundBlur("6px");
    setTopHeight("15%");
  }, []);
  
  useEffect(() => {
    checkUserAuthenticated();
  }, []);

  function checkUserAuthenticated() {
    try {
      Auth.currentAuthenticatedUser().then(cognitoUser => {
        console.log(cognitoUser);
        console.log(cognitoUser.attributes.email);
        console.log(cognitoUser.attributes.name);
        setAuthenticatedUser(cognitoUser);
      })
    } catch(exc) {
      
    }
  }

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
      await API.graphql(graphqlOperation(createLead, { input: person }))
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
        
        {authenticatedUser == null && (
          <GoogleContainer>
            <GoogleImage src={GLogo} /> 
            <span>Continue with Google</span> 
          </GoogleContainer>
        )}
        
        <button onClick={() => Auth.federatedSignIn({ provider: "Google" })} >Continue with Google</button>
        <button onClick={() => Auth.federatedSignIn()}>Normal Log In</button>
        <button onClick={async () => await Auth.signOut()}>Sign Out</button>
        <button onClick={checkUserAuthenticated}>Check User</button>

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

export default ContactFormPopup;