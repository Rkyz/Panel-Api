const fs = require('fs');
const path = require('path');

const tokenDirectory = path.join(__dirname, 'owner');
const tokenFilePath = path.join(tokenDirectory, 'token.txt');

const getToken = () => {
    console.log('Token file path:', tokenFilePath);
  if (fs.existsSync(tokenFilePath)) {
    return fs.readFileSync(tokenFilePath, 'utf8');
  } else {
    throw new Error('Token file does not exist');
  }
};

module.exports = { getToken };
