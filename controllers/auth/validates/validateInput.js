const { messageInput } = require('../messages/message');

const validateInput = (username, password, roleId) => {
  const errors = [];
  if (!username) errors.push(messageInput.validation.inputUsernameRequired);
  if (!password) errors.push(messageInput.validation.inputPasswordRequired);
  if (!roleId) errors.push(messageInput.validation.inputRoleIdRequired);
  return errors;
};

module.exports = validateInput;
