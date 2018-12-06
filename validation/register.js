const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = '이름은 2글자 이상이어야 합니다';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = '이름을 바르게 입력해주세요';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = '이메일을 바르게 입력해주세요';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = '패스워드를 바르게 입력해주세요';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = '패스워드는 최소 6자리 이상입니다';
  }
   if (Validator.isEmpty(data.password2)) {
    errors.password = '패스워드를 바르게 입력해주세요';
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = '패스워드 불일치';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
