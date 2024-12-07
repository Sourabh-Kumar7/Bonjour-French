const User = require('../models/userModel');

// Service to get user by email
const getUserByEmailService = async (email) => {
    try {
      const user = await User.findOne({ email }, '-password');
      return user;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw new Error('Database error');
    }
  };
  
  module.exports = {
    getUserByEmailService,
  };