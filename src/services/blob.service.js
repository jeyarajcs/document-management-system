const mongoose = require('mongoose');
const { Blob } = require('../models');
const uuid = require('uuid');

/**
 * 
 * @param {Object} blobFilter
 * @returns {Promise<Blobs>}
 * @description Get blob(files and folders) list.
 */
const listBlobs = async (createdBy, parent) => {
    const blobs = await Blob.find({createdBy, parent});
    return blobs;
};

/**
 * 
 * @param {Object} blobBody
 * @returns {Promise<Blob>}
 * @description Create a blob, it could be a file or folder
 */
const createBlob = async (blobBody) => {
    if (await Blob.isBlobExists(blobBody)) {
        throw new Error("Blob already created.")
    }
    if(!await Blob.isParentFolderExists(blobBody)){
        throw new Error("Invalid Folder")
    }
    if(blobBody.blobType == "file" && !blobBody.content) blobBody.content = "";
    const blob = await Blob.create(blobBody);
    return blob;
};

/**
 * Move blob(file) from one folder to another folder
 * @param {Object} blobBody
 * @returns {Promise<Blob>}
 * @description Move file from one folder to another. 
 * The function uses the MongoDB transactions to ensure the Data consistency.
 * MongoDB transactions will be working only on replica set. 
 * For testing purpose I have used my personal MongoDB Atlas account.
 */
const moveBlob = async (blobBody) => {
    let session = await mongoose.startSession();
    session.startTransaction();
    try{
        const ses = {session}
        const {blobId, createdBy, newParent} = blobBody;
        
        if (!blobId || !newParent){
            throw new Error("Invalid input parameters");
        }
        const blob = await Blob.findOne({blobId: blobId, createdBy: createdBy, blobType: "file"});
        const folder = await Blob.findOne({blobId: newParent, createdBy: createdBy, blobType: "folder"});

        if(!blob){
            throw new Error("Invalid file");
        }

        if(!folder && newParent != "root"){
            throw new Error("Invalid Folder");
        }
    
        const newBlob = Object.assign({}, blob._doc);
        delete newBlob["_id"];
        newBlob.blobId = uuid.v1();
        newBlob.createdBy = createdBy;
        newBlob.parent = folder ? folder.blobId : "root";

        const movedBlob = await Blob.create([newBlob], ses);
        await Blob.remove({_id: blob._id},ses);
        await session.commitTransaction();
        session.endSession();
        return movedBlob;
    
    }catch(err){
        await session.abortTransaction();
        session.endSession();
        throw new Error(err.message);
    }
}

module.exports = {
    listBlobs,
    createBlob,
    moveBlob
};