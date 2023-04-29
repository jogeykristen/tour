const {verify} = require("jsonwebtoken")

module.exports.checkToken= async(req,res, next)=>{
        const token = req.get("authorization");
        if(token){
             let token1 = token.slice(7);
            verify(token1,process.env.JWT_SECERET_KEY,(err, decoded)=>{
                if(err){
                    res.json({message:"Invalid token"})
                }else{
                    next();
                }
            })
        }else{
            res.json({message:"Unauthorized user"})
        }
    }