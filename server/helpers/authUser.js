const jwt = require('jsonwebtoken');

const authUser = token => {
  const splitToken = token.split(' ')[1];
  if (!splitToken) {
    return false;
  }
  var user = jwt.verify(splitToken, 'secretkey', (err, decoded) => {
    if (err) {
      return false;
    }
    return decoded;
  });
  if (!user) {
    return false;
  }
  return user;
};

module.exports = {
  authUser
};
