import React, { useEffect, useState } from 'react';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify'
import { createLead } from '../graphql/mutations'
import ContactFormPopup3 from './ContactFormPopup3';
import PhoneNumberForm from "./PhoneNumberForm";

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
  if (!authorizedSSO) {
      element = <ContactFormPopup3
      name={name}
      setName={setName}
      setEmail={setEmail}
      setPhone={setPhone}
      handleSubmit={handleSubmitButton}
    />;
  } else if (authorizedSSO) {
    if (!fetchCognitoComplete) {
      console.log("2")
      element = <PhoneNumberForm loading={true} setPhone={setPhone} />
      // Show popup but have loading symbol.
    } else if (fetchCognitoComplete && !authenticatedUsingCognito) {
      console.log("3")
      element = <PhoneNumberForm loading={false} setPhone={setPhone} errorMessage={""} errorMessage={"There was an error authenticating. Please try again"} />
      // Have popup say "There was an error authenticating, please try again"
      // set localStorage.setItem("authorizedSSO", "false")
      // Set authorizedSSO to false, fetchCognitoComplete to false, authenticatedUsingCognito to false.
    } else if (fetchCognitoComplete && authenticatedUsingCognito) {
      console.log("4")
      element = <PhoneNumberForm loading={false} setPhone={setPhone} errorMessage={""}/>
      // Show popup, ask for phone number, save to DB, redirect to actual website
    }
  }

  return (
    <>
      <button
        onClick={() => {
          Auth.signOut();
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

export default ContactFormContainer2;