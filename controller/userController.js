const {user} = require('../database/user');
const bcrypt = require("bcrypt")
jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports.signUp = async(req,res)=>{
    console.log("hi")
    const saltRounds = 10;
    const User = await user.findOne({
        email:req.body.email
    });
    if(User) return res.status(400).send("User already registered")
    
    console.log("hiaa")
    email =req.body.password
    hashed =await bcrypt.hash(email,saltRounds)
    // .then(hash=>{
    //     console.log("hash = ",hash)
    // })
    // .catch(err=>console.log(error.message))
    console.log("asdas = ",hashed)
    const signin = new user({name:req.body.name,
        phone_number : req.body.phone_number,
        email : req.body.email,
        password : hashed
        });
    const result = await signin.save();
    return res.status(200).send("User registered successfully")
}

module.exports.login = async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const User = await user.findOne({
        email:email,
    });
    if(!User){return res.status(400).send("No users found")}
    
    const isPasswordValid = await bcrypt.compare(password, User.password);
    if (!isPasswordValid) {
        return res.status(400).send("Invalid password")
      }
      
      //return res.status(200).send("logged in")
      const token =  jwt.sign({ email: User.email,  _id: User._id }, process.env.JWT_SECERET_KEY, { expiresIn: '1h' });
      return res.status(200).send({data:token})
}

module.exports.getusers = async(req,res)=>{
    const User = await user.find({})
    console.log(User)
    if(User) return res.status(200).send({
        data:User
    })
    return res.status(400).send("No users")
}

module.exports.updateusers = async(req,res)=>{
    up = {email:req.body.email}
    const update = {name:req.body.name,
    phone_number:req.body.phone_number}
    const User = await user.findOneAndUpdate(up,update,{
        new:true
    });
    if(User)return res.status(200).send({
        data:User
    })
    return res.status(400).send("No users found")
}

module.exports.searchusers =async(req,res)=>{
    const User = await user.findOne({
        email:req.params.email
    })
    if(User)return res.status(200).send({
        data:User
    })
    return res.status(400).send("No user found")
}

module.exports.deleteusers = async(req,res)=>{
    const User = await user.findOneAndRemove({
        email:req.params.email
    })
    if(User)return res.status(200).send({
        data:User
    })
    return res.status(400).send("No user found")
}

module.exports.loginRequired = function(req, res, next) {
    if (req.user) {
      next();
    } else {
  
      return res.status(401).json({ message: 'Unauthorized user!!' });
    }
  };
module.exports.profile = function(req, res, next) {
    if (req.user) {
      res.send(req.user);
      next();
    } 
    else {
     return res.status(401).json({ message: 'Invalid token' });
    }
}
