const { messagePassword } = require('../messages/message');

const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) errors.push(messagePassword.validation.passwordLength);
  if (!/[A-Z]/.test(password)) errors.push(messagePassword.validation.passwordUppercase);
  if (!/[0-9]/.test(password)) errors.push(messagePassword.validation.passwordNumber);
  if (!/[@$!%*?&]/.test(password)) errors.push(messagePassword.validation.passwordSpecial);
  if (!/^[A-Z]/.test(password)) errors.push(messagePassword.validation.passwordStartUppercase);
  return errors;
};

module.exports = validatePassword;
