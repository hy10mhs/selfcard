const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCardDetailInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';

  if(!Validator.isLowercase(data.handle)) {
    errors.handle = 'Card address must be lowercase';
  }

  if(!Validator.isAlphanumeric(data.handle)) {
    errors.handle = 'Card address must be Alphabet or Number';
  }

  if(!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Card address needs to between 2 and 40 characters';
  }

  if(Validator.isEmpty(data.handle)) {
    errors.handle = 'Card address field is required';
  }

  // TODO nav (numofbtn = btn lenght)
  // if(Validator.isNumeric(data.nav-numofbtn)){
  //   if(!isEmpty(data.nav-btn)) {
  //     if(Number(data.nav-numofbtn) !== data.nav-btn)
  //   }
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
