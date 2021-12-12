import React from 'react';

// const TEST_EMAIL = "RealKatieRealEstate@gmail.com";
// const PROD_EMAIL = "Kate.mcmasters@foxroach.com"

const email = process.env.REACT_APP_EMAIL_TO_SEND_TO || "no email assigned";
console.log(email);

const HomePage = () => {
  return (
    <form action={`https://formsubmit.co/${email}`} method="POST">
      <input placeholder='First Name' type="text" name="first-name" required />
      <input placeholder='Last Name' type="text" name="last-name" required />
      <input placeholder='Phone Number' type="tel" name="tel" required />
      <input placeholder='Email Address' type="email" name="email" required />
      <button type="submit">Accept</button>
    </form>
  );
};

export default HomePage;