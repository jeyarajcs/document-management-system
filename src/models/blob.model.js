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
        default: "root",
        index: true
    },
    createdBy: {
        type: String,
        required: true,
        ref: 'users',
        index: true
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
 * Check if blob is created already
 * @param {Object} blobBody
 * @returns {Promise<boolean>}
 */
blobSchema.statics.isBlobExists = async function (blobBody) {
    const filter = {
        blobName : blobBody.blobName,
        createdBy : blobBody.createdBy,
        parent : blobBody.parent,
        blobType : blobBody.blobType
    }
    const blob = await this.findOne(filter);
    return !!blob;
  };

  /**
 * Check if the parent folder exists or not
 * @param {Object} blobBody
 * @returns {Promise<boolean>}
 */
blobSchema.statics.isParentFolderExists = async function (blobBody) {
    if(blobBody.parent && blobBody.parent == "root"){
        return true;
    }else{
        const filter = {
            blobId:blobBody.parent, 
            blobType:"folder", 
            createdBy: blobBody.createdBy
        }
        const folder = await this.findOne(filter);
        return !!folder;
    }
  };

/**
 * @typedef Blob
 */
const Blob = mongoose.model('Blob', blobSchema);

module.exports = Blob;