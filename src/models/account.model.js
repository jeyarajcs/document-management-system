const mongoose = require('mongoose');
const validator = require('validator');

const accountSchema = mongoose.Schema(
  {
    accountID: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true
    },
    accountName: {
      type: String,
      required: true,
      trim: true
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Account
 */
const Account = mongoose.model('Account', accountSchema);

module.exports = Account;