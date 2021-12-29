import React, { useState, useEffect } from 'react';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify'
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import Dummy from "./Dummy";
import ContactFormPopup3 from './ContactFormPopup3';
import PhoneNumberForm from './PhoneNumberForm';

const FetchState = {
  NOT_INITIATED: "NOT_INITIATED",
  FETCHING: "FETCHING",
  SUCCESSFUL: "SUCCESSFUL",
  FAILED: "FAILED"
}

const SignInHandler = () => {
  
  const [showPopup, setShowPopup] = useState(false);
  const [cognitoFetchState, setCognitoFetchState] = useState(FetchState.NOT_INITIATED);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  useEffect(() => {
    setTimeout(() => {
      setShowPopup(true);
    }, 750)
  }, [showPopup]);
  
  useEffect(() => {
    const href = window.location.href
    if (!href.includes("authorizedSSO")) {
      console.log(`User has not authorized SSO - URL: ${href}`) 
      return;
    }
    console.log(`User authorized SSO`);
    getAuthorizedUser();
  }, [])
  
  function getAuthorizedUser() {
    setCognitoFetchState(FetchState.FETCHING);
    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log("Found user in Cognito");
        console.log("Name " + user.attributes.name);
        console.log("Email " + user.attributes.email);
        
        setName(user.attributes.name);
        setEmail(user.attributes.email);
        setCognitoFetchState(FetchState.SUCCESSFUL);
        
      })
      .catch(() => {
        setCognitoFetchState(FetchState.FAILED);
        console.log("User not signed in to Cognito or could not be found");
        // ToDo: This means not getting name, email or phone.
        // Can either redirect to real website, or sign user out and foce them to do it all again.
        // Possibly hide SSO buttons. Maybe route to a "/hideSSO"
      })
      .finally(() => {
        console.log("Fetching Cognito complete");
        //setFetchCognitoComplete(true)
      });
  }
  
  function handleSSOSignIn(provider) {
    // localStorage.setItem("authorizedSSO", "true");
    console.log("SIGNED IN")
    Auth.federatedSignIn({ provider: provider });
  }

  function HandleContactFormSubmit() {
    //addLeadToGraphQL();
    redirectToActualWebsite();
  }
  
  function handlePhoneNumberFormSubmit() {
    //addLeadToGraphQL();
    redirectToActualWebsite();
  }

  function redirectToActualWebsite() {
    console.log("called")
    window.location.assign('https://katlynmcmasters.foxroach.com/');
  }
  
  return (
    <>
      <SignOutButton onClick={async () => {
          await Auth.signOut()
        }}
      >SignOut</SignOutButton>
      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={
            <>
              {
                showPopup &&
                <ContactFormPopup3
                  Background={Background}
                  Container={Container}
                  name={name}
                  setName={setName}
                  setEmail={setEmail}
                  setPhone={setPhone}
                  handleSSOSignIn={handleSSOSignIn}
                  handleSubmit={HandleContactFormSubmit}
                />
              }
            </>
          } />
          <Route path="/authorizedSSO" element={
            <>
              <PhoneNumberForm
                Background={Background}
                Container={Container}
                loading={cognitoFetchState === FetchState.FETCHING ? true : false}
                setPhone={setPhone}
                handleSubmitButton={handlePhoneNumberFormSubmit}
              />
            </>
          } />
        </Routes>
      {/* </BrowserRouter> */}
    </>
  );
};

const SignOutButton = styled.button`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
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
  min-height: 16.5rem;
  
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.8);
  
  cursor: pointer;
  z-index: 1;
`;

export default SignInHandler;