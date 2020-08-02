const { accountService} = require('../services');
const uuid = require('uuid');

const createAccount = async (req, res) => {
  try{
    req.body.accountID = uuid.v1();
    const account = await accountService.createAccount(req.body);
    if(account){
      res.status(200).send({
        status:"success",
        message:"Account created successfully"
      });
    }
  }catch(e){
    res.status(400).send({
      status:"error",
      message : e.message
    })
  }
  
};

module.exports = {
    createAccount
};