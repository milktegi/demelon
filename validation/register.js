const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = '이름은 2글자 이상이어야 합니다';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
