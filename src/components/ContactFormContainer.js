import React, { useEffect, useState } from 'react';
import ContactFormPopup3 from './ContactFormPopup3';

const ContactFormContainer = () => {
  const [authenticatedUsingCognito, setAuthenticatedUsingCognito] = useState(false);
  
  // Signing in with Google / Facebook will redirect here.
  // Signing in with button will call handleSubmitButton and redirect to other page automatically.
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
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
  
  function handleSubmitButton() {
    // verify name, email & phone are correct.
    // If so, save to database
    // FormSubmit will automatically link to actual website after this function is called.
  }
  
  let element = null;
  if (!authenticatedUsingCognito && !authenticatedUsingCognito) {
    element = <ContactFormPopup3
      name={name}
      setName={setName}
      setEmail={setEmail}
      setPhone={setPhone}
      handleSubmit={handleSubmitButton}
    />;
  } else if (authenticatedUsingCognito) {
    // get name & email from cognito.
    // If they are verifiable, element = get phone number
    // else, set authenticatedUsingCognito and authenticatedUsingSubmit to false (maybe with some type of error)
  }
  
  return (
    <>{element}</>
  );
};

export default ContactFormContainer;