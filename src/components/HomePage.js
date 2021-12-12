import React from 'react';

const TEST_EMAIL = "RealKatieRealEstate@gmail.com";
const PROD_EMAIL = "Kate.mcmasters@foxroach.com"


const HomePage = () => {
  return (
    <form action={`https://formsubmit.co/${TEST_EMAIL}`} method="POST">
      <input placeholder='First Name' type="text" name="first-name" required />
      <input placeholder='Last Name' type="text" name="last-name" required />
      <input placeholder='Phone Number' type="tel" name="tel" required />
      <button type="submit">Accept</button>
    </form>
  );
};

export default HomePage;