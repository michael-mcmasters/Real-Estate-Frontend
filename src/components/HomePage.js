import React, { useState } from 'react';

const email = process.env.REACT_APP_EMAIL_TO_SEND_TO;


const HomePage = () => {
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]= useState("");
  
  function capitalizeFirstLetter(name) {
    if (name == null && name == undefined) return;
    
    if (name.length > 1) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    } else {
      return name.charAt(0).toUpperCase();
    }
  }
  
  // Sends email using FormSubmit. See documentation: https://formsubmit.co/documentation
  return (
    <form action={`https://formsubmit.co/${email}`} method="POST">
      <input onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' type="text" name="first-name" required />
      <input onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' type="text" name="last-name" required />
      <input placeholder='Phone Number' type="tel" name="tel" required />
      <input type="email" name="email" placeholder="Email Address" required />
      
      {/* Goes to this link on submit */}
      <input type="hidden" name="_next" value="https://katlynmcmasters.foxroach.com/#" />
      {/* Tricks bots to avoid spam */}
      <input type="text" name="_honey" style={{ display: "none" }} />
      {/* Subject of email */}
      <input type="hidden" name="_subject" value={`New Lead! - ${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(lastName)}`} />
      
      <button type="submit">Accept</button>
    </form>
  );
};

export default HomePage;