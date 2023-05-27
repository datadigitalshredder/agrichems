// Node js validating data: https://blog.logrocket.com/handle-data-validation-node-js-validatorjs/

const Validator = require('validatorjs');

const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

// Custom validation for registration numbers: uppercase letters, numbers, and hyphens only

// TEST 1
// const registrationNumberRegex = /b[A-Z0-9]+(?:-[A-Z0-9]+)+/;
    //    \b - a word boundary (before the next letter or digit there must be a non-word character or start of string
    //    [A-Z0-9]+ - one or more letters or digits
    //    (?:-[A-Z0-9]+)+ - 1 or more sequences of:
    //    - - a hyphen
    //    [A-Z0-9]+ - one or more letters or digits

// TEST 2
// const registrationNumberRegex = /b([0-9]+-[A-Z]+)+(?:-([0-9]+-[A-Z]+))+/;

// TEST 3 - Working

const registrationNumberRegex = /^\d{1,3}-[A-Z]{1,4}(-[0-9A-Z]{1,3})+$/;
// Explanation:
// Paste the above RegEx in https://regexr.com/

// Tighten registration number policy
Validator.register('strict', value => registrationNumberRegex.test(value),
    'Registration number must contain uppercase letters, numbers, and hyphens only. For example, 125-D-2-18 or 18-B-165-D-1-46');


module.exports = validator;