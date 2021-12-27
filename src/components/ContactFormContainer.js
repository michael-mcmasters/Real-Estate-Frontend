import { Auth, Hub } from "aws-amplify";
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ContactFormPopup3 from './ContactFormPopup3';

const ContactFormContainer = () => {
  const [fetchCognitoComplete, setFetchCognitoComplete] = useState(false);
  const [authenticatedUsingCognito, setAuthenticatedUsingCognito] = useState(false);
  
  // Signing in with Google / Facebook will redirect here.
  // Signing in with button will call handleSubmitButton and redirect to other page automatically.
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  useEffect(() => {
    console.log("Fetching Cognito");
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
  }, [])
  
  // useEffect(() => {
  //   if (authenticatedUsingCognito) {
  //     Auth.currentAuthenticatedUser()
  //       .then(user => {
  //         setName(user.attributes.name);
  //         setEmail(user.attributes.email);
  //       })
  //       .catch(() => console.log("authenticatedUsingCognito is true but there was an error finding user in Cognito"));
  //   }
  // }, [])
  
  function handleSubmitButton() {
    // verify name, email & phone are correct.
    // If so, save to database
    // FormSubmit will automatically link to actual website after this function is called.
  }
  
  async function addLeadToGraphQL() {
    // try {
    //   const person = {
    //     firstName,
    //     phone: phoneNumber,
    //     email: userEmail
    //   }
    //   await API.graphql(graphqlOperation(createLead, { input: person }))
    //   console.log("New lead added to GraphQL");
    // } catch (err) {
    //   console.log("Adding lead to GraphQL did not work. Error: " + err);
    // }
  }
  
  let element = null;
  if (fetchCognitoComplete && !authenticatedUsingCognito) {
    element = <ContactFormPopup3
      name={name}
      setName={setName}
      setEmail={setEmail}
      setPhone={setPhone}
      setAuthenticatedUsingCognito={setAuthenticatedUsingCognito}
      handleSubmit={handleSubmitButton}
    />;
  } else if (authenticatedUsingCognito) {
    if (phone === "") {
      // element = get phone
    } else {
      // Save data to database and redirect to actual site.
    }
  }
  
  return (
    <>
    <button
      onClick={() => Auth.signOut()}
    >
      Sign out
    </button>
    
    {element}
    </>
  );
};

export default ContactFormContainer;