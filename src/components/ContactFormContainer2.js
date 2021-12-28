import React, { useEffect, useState } from 'react';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify'
import { createLead } from '../graphql/mutations'
import ContactFormPopup3 from './ContactFormPopup3';
import PhoneNumberForm from "./PhoneNumberForm";
import styled, { css } from "styled-components";

const ContactFormContainer2 = () => {
  const [authorizedSSO, setAuthorizedSSO] = useState(false);
  const [fetchCognitoComplete, setFetchCognitoComplete] = useState(false);
  const [authenticatedUsingCognito, setAuthenticatedUsingCognito] = useState(false);
  
  // Signing in with Google / Facebook will redirect here.
  // Signing in with button will call handleSubmitButton and redirect to other page automatically.

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    //localStorage.clear()
    const authorizedSSO = localStorage.getItem("authorizedSSO");
    if (authorizedSSO === "true") {
      setAuthorizedSSO(true);
      console.log("User authorized SSO. Fetching Cognito");
      Auth.currentAuthenticatedUser()
        .then(user => {
          console.log("User signed in to Cognito");
          setName(user.attributes.name);
          setEmail(user.attributes.email);
          console.log(user.attributes.name);
          console.log(user.attributes.email);
          setAuthenticatedUsingCognito(true);
        })
        .catch(() => console.log("User not signed in to Cognito or could not be found"))
        .finally(() => {
          console.log("Fetching Cognito complete");
          setFetchCognitoComplete(true)
        });
    } else {
      console.log(`authorizedSSO is false.`);
    }
  }, [])
  
  function handleSSOSignIn(provider) {
    localStorage.setItem("authorizedSSO", "true");
    Auth.federatedSignIn({ provider: provider });
  }

  function handleSubmitButton() {
    //addLeadToGraphQL();
    redirectToActualWebsite();
  }
  
  function redirectToActualWebsite() {
    
  }

  async function addLeadToGraphQL() {
    try {
      const lead = {
        firstName: name,
        lastName: "",
        phone: phone,
        email: email
      }
      await API.graphql(graphqlOperation(createLead, { input: lead }))
      console.log("New lead added to GraphQL");
    } catch (err) {
      console.log("Adding lead to GraphQL did not work. Error: " + err);
    }
  }
  
  let element = null;
  if (!authorizedSSO) {
      element = <ContactFormPopup3
      Background={Background}
      Container={Container}
      name={name}
      setName={setName}
      setEmail={setEmail}
      setPhone={setPhone}
      handleSSOSignIn={handleSSOSignIn}
      handleSubmit={handleSubmitButton}
    />;
  } else if (authorizedSSO) {
      if (!fetchCognitoComplete) {
        element = <PhoneNumberForm Background={Background} Container={Container} loading={true} setPhone={setPhone} handleSubmitButton={handleSubmitButton} />
        // Show popup but have loading symbol.
      } else if (fetchCognitoComplete && !authenticatedUsingCognito) {
        element = <PhoneNumberForm Background={Background} Container={Container} loading={false} setPhone={setPhone} handleSubmitButton={handleSubmitButton} errorMessage={""} errorMessage={"There was an error authenticating. Please try again"} />
        // Have popup say "There was an error authenticating, please try again"
        // set localStorage.setItem("authorizedSSO", "false")
        // Set authorizedSSO to false, fetchCognitoComplete to false, authenticatedUsingCognito to false.
      } else if (fetchCognitoComplete && authenticatedUsingCognito) {
        element = <PhoneNumberForm Background={Background} Container={Container} loading={false} setPhone={setPhone} handleSubmitButton={handleSubmitButton} errorMessage={""} />
        // Show popup, ask for phone number, save to DB, redirect to actual website
      } else if (fetchCognitoComplete && authenticatedUsingCognito && phone !== "") {
        console.log("authorizedSSO is true and phone number isn't blank. Customer should have been redirected to actual website before making it to this condition. Redirecting...")
        redirectToActualWebsite();
      }
  }
  
  // element = <PhoneNumberForm Background={Background} Container={Container} loading={true} setPhone={setPhone} handleSubmitButton={handleSubmitButton} />
  // element = <PhoneNumberForm Background={Background} Container={Container} loading={false} setPhone={setPhone} handleSubmitButton={handleSubmitButton} errorMessage={""} errorMessage={"There was an error authenticating. Please try again"} />
  // element = <PhoneNumberForm Background={Background} Container={Container} loading={false} setPhone={setPhone} handleSubmitButton={handleSubmitButton} errorMessage={""} />
  // element = null;
  return (
    <>
      <SignOutButton
        onClick={async () => {
          localStorage.setItem("authorizedSSO", "false")
          await Auth.signOut()
          setAuthorizedSSO(false);
          setFetchCognitoComplete(false);
          setAuthenticatedUsingCognito(false);
        }}
      >Sign out</SignOutButton>
      
      <button
        onClick={() => localStorage.setItem("authorizedSSO", "false")}
      >Clear local storage</button>

      {element}
    </>
  );
};

const SignOutButton = styled.button`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  transition: backdrop-filter 0.2s;
  z-index: 1;
  
  backdrop-filter: blur(0px);
  ${props => props.transition && css`
    backdrop-filter: blur(6px);
  `}
`;

const Container = styled.div`
  transform: translateX(-50%);
  -webkit-transform:translateX(-50%);
  position: fixed;
  left: 50%;
  top: 100%;
  ${props => props.transition && css`
    top: 15%;
    transition: top 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  `}
  
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  padding: 0 1rem;
  min-width: 17rem;
  
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.8);
  
  cursor: pointer;
  z-index: 1;
`;

// const Container = styled.div`
//   transform: translateX(-50%);
//   -webkit-transform:translateX(-50%);
//   position: fixed;
//   left: 50%;
//   top: 100%;
//   ${props => props.transition && css`
//     top: 15%;
//     transition: top 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
//   `}
  
//   padding: 1.3rem 1.7rem;
//   border: 2px solid #401c2c;
//   border-radius: 17px;
//   box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.8);
//   background-color: #996178;
//   cursor: pointer;
//   width: fit-content;
//   z-index: 1;
// `;

export default ContactFormContainer2;