import React, { useEffect, useState } from 'react';
import ContactFormPopup3 from './ContactFormPopup3';

const ContactFormContainer = () => {
  const [authenticatedUsingCognito, setAuthenticatedUsingCognito] = useState(false);
  const [authenticatedUsingSubmit, setAuthenticatedUsingSubmit] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  let element = null;
  if (!authenticatedUsingCognito && !authenticatedUsingCognito) {
    element = <ContactFormPopup3 />;
  } else if (authenticatedUsingCognito) {
    // get name & email from cognito.
    // If they are verifiable, element = get phone number
    // else, set authenticatedUsingCognito and authenticatedUsingSubmit to false (maybe with some type of error)
  } else if (authenticatedUsingSubmit) {
    // verify name, email & phone are correct.
    // If so, save to database
    // redirect to actual website.
  }
  
  return (
    <>{element}</>
  );
};

export default ContactFormContainer;