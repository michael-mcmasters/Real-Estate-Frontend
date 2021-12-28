import React, { useEffect, useState } from 'react';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify'
import { createLead } from '../graphql/mutations'
import ContactFormPopup3 from './ContactFormPopup3';
import PhoneNumberForm from "./PhoneNumberForm";
import styled, { css } from "styled-components";

const ContactFormContainer2 = () => {
  const [authorizedSSO, setauthorizedSSO] = useState(false);
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
      setauthorizedSSO(true);
      console.log("User authorized SSO. Fetching Cognito");
      Auth.currentAuthenticatedUser()
        .then(user => {
          console.log("User signed in to Cognito");
          setName(user.attributes.name);
          setEmail(user.attributes.email);
          setAuthenticatedUsingCognito(true);
        })
        .catch(() => console.log("User not signed in to Cognito or could not be found"))
        .finally(() => {
          console.log("Fetching Cognito complete");
          setFetchCognitoComplete(true)
        });
    } else {
      console.log(`authorizedSSO is false. Value from localStorage: ${authorizedSSO}`);
    }
  }, [])
  
  function handleSSOSignIn(provider) {
    localStorage.setItem("authorizedSSO", "true");
    Auth.federatedSignIn({ provider: provider });
  }

  // FormSubmit will automatically re-route to actual website after this function is called.
  function handleSubmitButton() {
    addLeadToGraphQL();
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
  if (true) {
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
  } else if (true) {
    if (false) {
      element = <PhoneNumberForm Background={Background} loading={true} setPhone={setPhone} Container={Container} />
      // Show popup but have loading symbol.
    } else if (false) {
      element = <PhoneNumberForm Background={Background} loading={false} setPhone={setPhone} errorMessage={""} errorMessage={"There was an error authenticating. Please try again"} />
      // Have popup say "There was an error authenticating, please try again"
      // set localStorage.setItem("authorizedSSO", "false")
      // Set authorizedSSO to false, fetchCognitoComplete to false, authenticatedUsingCognito to false.
    } else if (false) {
      element = <PhoneNumberForm Background={Background} loading={false} setPhone={setPhone} errorMessage={""}/>
      // Show popup, ask for phone number, save to DB, redirect to actual website
    }
  }
  
  // let element = null;
  // if (!authorizedSSO) {
  //     element = <ContactFormPopup3
  //     name={name}
  //     setName={setName}
  //     setEmail={setEmail}
  //     setPhone={setPhone}
  //     handleSubmit={handleSubmitButton}
  //   />;
  // } else if (authorizedSSO) {
  //   if (!fetchCognitoComplete) {
  //     console.log("2")
  //     element = <PhoneNumberForm loading={true} setPhone={setPhone} />
  //     // Show popup but have loading symbol.
  //   } else if (fetchCognitoComplete && !authenticatedUsingCognito) {
  //     console.log("3")
  //     element = <PhoneNumberForm loading={false} setPhone={setPhone} errorMessage={""} errorMessage={"There was an error authenticating. Please try again"} />
  //     // Have popup say "There was an error authenticating, please try again"
  //     // set localStorage.setItem("authorizedSSO", "false")
  //     // Set authorizedSSO to false, fetchCognitoComplete to false, authenticatedUsingCognito to false.
  //   } else if (fetchCognitoComplete && authenticatedUsingCognito) {
  //     console.log("4")
  //     element = <PhoneNumberForm loading={false} setPhone={setPhone} errorMessage={""}/>
  //     // Show popup, ask for phone number, save to DB, redirect to actual website
  //   }
  // }

  return (
    <>
      <button
        onClick={async () => {
          await Auth.signOut()
          localStorage.setItem("authorizedSSO", "false")
          setauthorizedSSO(false);
          fetchCognitoComplete(false);
          setAuthenticatedUsingCognito(false);
        }}
      >
        Sign out
      </button>
      <button
        onClick={() => localStorage.setItem("authorizedSSO", "false")}
      >
        Clear local storage
      </button>

      {element}
    </>
  );
};

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
  position: fixed;
  left: 50%;
  top: 25%;
  transition: ${props => props.transition ? "top 0.2s cubic-bezier(0.075, 0.82, 0.165, 1)" : ""};
  
  top: ${props => props.transition ? "15%" : ""};
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

export default ContactFormContainer2;