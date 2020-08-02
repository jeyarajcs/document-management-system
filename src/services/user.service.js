const httpStatus = require('http-status');
const { User } = require('../models');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new Error('Incorrect email or password');
      }
    return user;
};

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
      throw new Error("Email Already Taken")
    }else{
        const user = await User.create(userBody);
        return user;
    }
  };

module.exports = {
  loginUserWithEmailAndPassword,
  createUser
};