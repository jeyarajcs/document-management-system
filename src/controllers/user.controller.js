const { userService} = require('../services');
const uuid = require('uuid');

const register = async (req, res) => {
  try{
    req.body.userId = uuid.v1();
    const user = await userService.createUser(req.body);
    if(user){
      res.status(200).send({
        status:"success",
        message:"User created successfully"
      });
    }
  }catch(e){
    res.status(400).send({
      status:"error",
      message : e.message
    })
  }
  
};

const login = async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = await userService.loginUserWithEmailAndPassword(email, password);
    res.status(200).send({
      status:"success",
      message: "Successfully Logged In",
      token : user
    });
  }catch(e){
    res.status(400).send({
      status:"error",
      message: e.message
    })
  }
};

module.exports = {
  register,
  login
};