const User = require('../models/userModel');

/**
 * Service to find a user's ID by email.
 * @param {string} email - The email of the user.
 * @returns {Promise<string|null>} - The user's ID if found, or null if not found.
 */
const findUserIdByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user ? user._id : null;
    } catch (error) {
        throw new Error("Error fetching user by email: " + error.message);
    }
};

module.exports = {
    findUserIdByEmail,
};
