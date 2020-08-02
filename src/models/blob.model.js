const mongoose = require('mongoose');
const validator = require('validator');

/**
 * Blob Schema
 * The blob could be either folder or file.
 */
const blobSchema = mongoose.Schema(
  {
    blobId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    blobType: {
        type: String,
        required: true,
        trim : true,
        lowercase: true
    },
    blobName: {
        type: String,
        required: true,
        trim: true
    },
    blobPath:{
        type: String,
        required: false
    },
    content:{
        type: String,
        required: false
    },
    parent:{
        type: String,
        required: true,
        default: "root"
    },
    createdBy: {
        type: String,
        required: true,
        ref: 'users'
    },
    accessLevel : {
        type: String,
        required: true,
        default: "private"
    },
    sharedWith: {
        type: Array,
        required: false
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
 * @typedef Blob
 */
const Blob = mongoose.model('Blob', blobSchema);

module.exports = Blob;