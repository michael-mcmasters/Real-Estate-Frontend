/*
  ([0-9]{4}[0-9]{3}[0-9]{4}                       13023456789
  |[0-9]{3}[0-9]{3}[0-9]{4}                       3023456789
  |[0-9]{3}-[0-9]{3}-[0-9]{4}                     302-345-6789
  |[0-9]{4}-[0-9]{3}-[0-9]{4}                     1302-345-6789 
  |[0-9]{1}-[0-9]{3}-[0-9]{3}-[0-9]{4}            1-302-345-6789
  |\([0-9]{3}\)-[0-9]{3}-[0-9]{4}                 (302)-345-6789
  |[0-9]{1}-\([0-9]{3}\)-[0-9]{3}-[0-9]{4})       1-(302)-345-6789    
*/
const regexValidation = "([0-9]{4}[0-9]{3}[0-9]{4}|[0-9]{3}[0-9]{3}[0-9]{4}|[0-9]{3}-[0-9]{3}-[0-9]{4}|[0-9]{4}-[0-9]{3}-[0-9]{4}|[0-9]{1}-[0-9]{3}-[0-9]{3}-[0-9]{4}|\([0-9]{3}\)-[0-9]{3}-[0-9]{4}|[0-9]{1}-\([0-9]{3}\)-[0-9]{3}-[0-9]{4})";
export default regexValidation;