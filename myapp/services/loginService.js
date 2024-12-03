const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.authenticateUser = async (username, password) => {
  console.log(`Authenticating user with username: ${username}`);

  const user = await User.findOne({ email: username });
  if (!user) {
    console.log(`No user found with username: ${username}`);
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    console.log(`Password for user ${username} is valid.`);
    return user;
  } else {
    console.log(`Invalid password for user: ${username}`);
    return null;
  }
};
