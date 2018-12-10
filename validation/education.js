const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.school)) {
    errors.school = '교육기관은 필수 입력 사항입니다.';
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = '교육과정은 필수 입력 사항입니다.';
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = '시작 일자는 필수 입력 사항입니다.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
