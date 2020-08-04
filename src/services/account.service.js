const httpStatus = require('http-status');
const { Account } = require('../models');

/**
 * Create an Account
 * @param {Object} accountBody
 * @returns {Promise<Account>}
 */
const createAccount = async (accountBody) => {
        const account = await Account.create(accountBody);
        return account;
  };

module.exports = {
  createAccount
};