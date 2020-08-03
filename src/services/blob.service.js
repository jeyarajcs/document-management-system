const httpStatus = require('http-status');
const { Blob } = require('../models');

/**
 * Get blobs list
 * @param {Object} blobFilter
 * @returns {Promise<Blobs>}
 */
const listBlobs = async (createdBy, parent) => {
    const blobs = await Blob.find({createdBy, parent});
    return blobs;
};

/**
 * Create a blob, it could be a file or folder
 * @param {Object} blobBody
 * @returns {Promise<Blob>}
 */
const createBlob = async (blobBody) => {
    if (await Blob.isBlobExists(blobBody)) {
        throw new Error("Blob already created.")
    }
    if(!await Blob.isParentFolderExists(blobBody)){
        throw new Error("Invalid Folder")
    }
    const blob = await Blob.create(blobBody);
    return blob;
};

module.exports = {
    listBlobs,
    createBlob
};