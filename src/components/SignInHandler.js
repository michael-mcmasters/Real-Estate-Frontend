import React, { useState, useEffect } from 'react';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify'
import { createLead } from '../graphql/mutations'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled, { css } from "styled-components";
import ContactFormPopup3 from './ContactFormPopup3';
import PhoneNumberForm from './PhoneNumberForm';

const FetchState = {
  NOT_INITIATED: "NOT_INITIATED",
  FETCHING: "FETCHING",
  SUCCESSFUL: "SUCCESSFUL",
  FAILED: "FAILED"
}

const SignInHandler = () => {
  
  const [showInitialPopup, setShowInitialPopup] = useState(false);
  const [cognitoFetchState, setCognitoFetchState] = useState(FetchState.NOT_INITIATED);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  useEffect(() => {
    setTimeout(() => {
      setShowInitialPopup(true);
    }, 750)
  }, [showInitialPopup]);
  
  useEffect(() => {
    if (window.location.href.includes("authorizedSSO")) {
      console.log("On /authorizedSSO page");
      fetchAuthorizedUser();
    } else {
      console.log("Not on /authorizedSSO page");
    }
  }, [])
  
  function fetchAuthorizedUser() {
    setCognitoFetchState(FetchState.FETCHING);
    Auth.currentAuthenticatedUser()
      .then(cognitoUser => {
        console.log("Found user in Cognito");
        
        let name = "";
        if (cognitoUser.username.includes("Google")) {
          name = cognitoUser.attributes.name;
        } else if (cognitoUser.username.includes("Facebook")) {
          name = cognitoUser.attributes.name + " ";
          name += cognitoUser.attributes[`family_name`];
        } else {
          console.warn("Cognito username does not contain Google nor Facebook")
          name = cognitoUser.username;
        }
        
        setName(name);
        setEmail(cognitoUser.attributes.email);
        setCognitoFetchState(FetchState.SUCCESSFUL);
      })
      .catch(() => {
        console.log("User not signed in to Cognito or could not be found");
        setCognitoFetchState(FetchState.FAILED);
      })
  }
  
  function handleSSOSignIn(provider) {
    Auth.federatedSignIn({ provider: provider });
  }

  function HandleContactFormSubmit() {
    addLeadToDatabase();
    redirectToActualWebsite();
  }
  
  function handlePhoneNumberFormSubmit() {
    addLeadToDatabase();
    redirectToActualWebsite();
    // ToDo: Manually send email.
  }

  async function addLeadToDatabase() {
    // try {
    //   const lead = {
    //     firstName: name,
    //     lastName: "",
    //     phone: phone,
    //     email: email
    //   }
    //   await API.graphql(graphqlOperation(createLead, { input: lead }))
    //   console.log("New lead added to database");
    // } catch (err) {
    //   console.log("Adding lead to database did not work. Error: " + err);
    // }
  }
  
  function redirectToActualWebsite() {
    window.location.assign('https://katlynmcmasters.foxroach.com/');
  }
  
  function getInitialPopup() {
    return (
      <ContactFormPopup3
        Background={Background}
        Container={Container}
        showSSOOptions={true}
        name={name}
        setName={setName}
        setEmail={setEmail}
        setPhone={setPhone}
        handleSSOSignIn={handleSSOSignIn}
        handleSubmit={HandleContactFormSubmit}
      />
    )
  }
  
  function getSecondPopup(cognitoFetchState) {
    if (cognitoFetchState === FetchState.FAILED || cognitoFetchState === null) {    // Should never be null but just in case
      return (
        <ContactFormPopup3
          Background={Background}
          Container={Container}
          showSSOOptions={false}
          name={name}
          setName={setName}
          setEmail={setEmail}
          setPhone={setPhone}
          handleSSOSignIn={handleSSOSignIn}
          handleSubmit={HandleContactFormSubmit}
        />
      );
    } else {
      return (
        <PhoneNumberForm
          Background={Background}
          Container={Container}
          loading={cognitoFetchState === FetchState.FETCHING ? true : false}
          setPhone={setPhone}
          handleSubmitButton={handlePhoneNumberFormSubmit}
        />
      )
    }
  }
  
  return (
    <>
      <SignOutButton onClick={async () => await Auth.signOut()}>Sign Out</SignOutButton>
      
      <Routes>
        <Route path="/" element={
          <>
            {showInitialPopup && getInitialPopup()}
          </>
        } />
        <Route path="/authorizedSSO" element={
          <>
            {getSecondPopup(cognitoFetchState)}
          </>
        } />
      </Routes>
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