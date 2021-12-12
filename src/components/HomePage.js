import React from 'react';

const HomePage = () => {
  return (
    <form action="https://formsubmit.co/realkatierealestate@gmail.com" method="POST">
      <input placeholder='First Name' type="text" name="name" required />
      <input placeholder='Last Name' type="text" name="name" required />
      <input placeholder='Phone Number' type="tel" name="tel" required />
      <button type="submit">Accept</button>
    </form>
  );
};

export default HomePage;