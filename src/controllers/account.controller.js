const { accountService} = require('../services');
const uuid = require('uuid');

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @description Create Account - As of now Its not being used, 
 * But we can use in future when real multi-tenant based app.
 * @requires req.body
 * @version 1.0.0
 * @author Jeyaraj
 */
const createAccount = async (req, res) => {
  try{
    req.body.accountId = uuid.v1();
    const account = await accountService.createAccount(req.body);
    if(account){
      res.status(200).send({
        status:"success",
        message:account
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