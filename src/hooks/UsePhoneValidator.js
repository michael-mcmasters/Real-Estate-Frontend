import React, { useState, useEffect } from 'react';

// const UsePhoneValidator = () => {
    
//     const validateNumber = (number) => {
//       const containsLetters = (value) => /[a-zA-Z]/.test(value);
      
//       if (number === "") {
//         return [false, "Field can not be empty"];
//       } else if (containsLetters(number)) {
//         return [false, "Field should only contain numbers"];
//       } else if (number.toString().length < 10) {
//         return [false, "Number must be 10 digits long"];
//       } else {
//         return [true, ""];
//       }
//     }
    
//     return [validateNumber];
// }

// export default UsePhoneValidator;


// isValid is a functino that returns true false, errorMessage
const UsePhoneValidator = () => {

  const [phoneErrorMessage, setErrorMessage] = useState("");
  
  const phoneIsValid = (number) => {
    const containsLetters = (value) => /[a-zA-Z]/.test(value);

    if (number === "") {
      setErrorMessage("Field can not be empty");
      return false;
    } else if (containsLetters(number)) {
      setErrorMessage("Field should only contain numbers");
      return false;
    } else if (number.toString().length < 10) {
      setErrorMessage("Number must be 10 digits long");
      return false;
    } else {
      return true;
    }
  }

  return {phoneIsValid, phoneErrorMessage};
}

export default UsePhoneValidator;