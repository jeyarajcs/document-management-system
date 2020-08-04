const { blobService} = require('../services');
const uuid = require('uuid');

/**
 * 
 * @param {Object} req.body Blob name, Blob type, Blob content(if file), createdBy, Parent folder
 * @param {Object} res 
 * @description Create Blob - The blob could be either file or folder.
 * @requires req.body
 * @version 1.0.0
 * @author Jeyaraj
 */
const createBlob = async (req, res) => {
  try{
    req.body.blobId = uuid.v1();
    const blob = await blobService.createBlob(req.body);
    if(blob){
      res.status(200).send({
        status:"success",
        message:blob
      });
    }
  }catch(e){
    res.status(400).send({
      status:"error",
      message : e.message
    })
  }
  
};

/**
 * 
 * @param {Object} req.body parent folder, createdBy 
 * @param {Object} res 
 * @description get list of files and folders based on parent directory. 
 * If no parent provided, the default would be root folder. 
 * @version 1.0.0
 * @author Jeyaraj
 */
const listBlobs = async (req, res) => {
  try{
    if(!req.body.parent) req.body.parent = "root";
    const {createdBy, parent} = req.body;
    const blobs = await blobService.listBlobs(createdBy, parent);
    res.status(200).send({
      status:"success",
      message: blobs
    });
  }catch(e){
    res.status(400).send({
      status:"error",
      message: e.message
    })
  }
};

/**
 * 
 * @param {Object} req.body blobId, newParent
 * @param {Object} res 
 * @description Move a file from one folder to another folder. 
 * @version 1.0.0
 * @author Jeyaraj
 */
const moveBlob = async (req, res) => {
    try{
      if(!req.body.newParent) req.body.newParent = "root";
      const blob = await blobService.moveBlob(req.body);
      res.status(200).send({
        status:"success",
        message: blob
      });
    }catch(e){
      res.status(400).send({
        status:"error",
        message: e.message
      })
    }
  };

module.exports = {
    createBlob,
    listBlobs,
    moveBlob
};