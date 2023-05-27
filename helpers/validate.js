// Node js validating data: https://blog.logrocket.com/handle-data-validation-node-js-validatorjs/

const Validator = require('validatorjs');

const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

// Custom validation for registration numbers: uppercase letters, numbers, and hyphens only
// const registrationNumberRegex = /b[A-Z0-9]+(?:-[A-Z0-9]+)+/;
const registrationNumberRegex = /b([0-9]+-[A-Z]+)+(?:-([0-9]+-[A-Z]+))+/;

// Tighten registration number policy
Validator.register('strict', value => registrationNumberRegex.test(value),
    'Registration number must contain uppercase letters, numbers, and hyphens only');


module.exports = validator;