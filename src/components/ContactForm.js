import React from 'react';

const email = process.env.REACT_APP_EMAIL_TO_SEND_TO;

const ContactForm = () => {
  
  // ToDo: Hold reference to inputs, when button pressed, manually set their values.
  // Then set boolean to true to load rest of page.
  return (
    <form action={`https://formsubmit.co/${email}`} method="POST">
      <input placeholder='First Name' type="text" name="first-name" required />
      <input placeholder='Last Name' type="text" name="last-name" required />
      <input placeholder='Phone Number' type="tel" name="tel" required />
      <input placeholder='Email Address' type="email" name="email" required />
      <input type="hidden" name="_next" value="http://localhost:3000/"></input>
      <button type="submit">Accept</button>
    </form>
  );
};

export default ContactForm;