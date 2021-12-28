import React, { useState, useEffect } from 'react';
import Dummy from "./Dummy";
import ContactFormPopup3 from './ContactFormPopup3';
import PhoneNumberForm from './PhoneNumberForm';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import styled, { css } from "styled-components";

const SignInHandler = () => {
  
  const [showPopup, setShowPopup] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  useEffect(() => {
    setTimeout(() => {
      setShowPopup(true);
    }, 750)
  }, [showPopup]);
  
  // Handles links / and /authorizedSSO
  
  // On /
    // Wait a few seconds, have popup appear
    // If use authorizes with SSO, go to /authorizedSSO
    // If user submits normal form, redirect to actual website
  // On /authorizedSSO
    // Ask for phone number
    // Redirect to actual website
  
  function handleSSOSignIn(provider) {
    // localStorage.setItem("authorizedSSO", "true");
    // Auth.federatedSignIn({ provider: provider });
  }

  function handleSubmitButton() {
    //addLeadToGraphQL();
    //redirectToActualWebsite();
  }

  function redirectToActualWebsite() {
    //window.location.assign('https://katlynmcmasters.foxroach.com/');
  }
    
  return (
    <BrowserRouter>
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
                handleSubmit={handleSubmitButton}
              />              
            }
          </>
        } />
        {/* <Route path="/authorizedSSO" element={<Dummy />} /> */}
        <Route path="/authorizedSSO" element={
          <>
            <PhoneNumberForm Background={Background} Container={Container} loading={true} setPhone={setPhone} handleSubmitButton={handleSubmitButton} />
          </>
        } />
      </Routes>
    </BrowserRouter>
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