const { blobService} = require('../services');
const uuid = require('uuid');

const createBlob = async (req, res) => {
  try{
    req.body.blobId = uuid.v1();
    const blob = await blobService.createBlob(req.body);
    if(blob){
      res.status(200).send({
        status:"success",
        message:"Blob created successfully"
      });
    }
  }catch(e){
    res.status(400).send({
      status:"error",
      message : e.message
    })
  }
  
};

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

module.exports = {
    createBlob,
    listBlobs
};