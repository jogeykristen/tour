const {Company} =require('../database/company');
const bcrypt = require("bcrypt")

module.exports.signup = async(req,res)=>{
    saltRounds = 10;
    console.log("Asdas")
    const company = await Company.findOne({company_email:req.body.company_email})
    if(company)return res.status(400).send("Company already registered")

    const pass = req.body.company_password
    const hashedPassword =await bcrypt.hash(pass,saltRounds)

    const comp = new Company({
        company_name:req.body.company_name,
        company_number:req.body.company_number,
        company_email:req.body.company_email,
        company_password:hashedPassword
    });

    const result = await comp.save();
    return res.status(200).send("Company registeration successfull")
}

module.exports.login = async(req,res)=>{
    const email = req.body.company_email;
    const password = req.body.company_password;

    const User =await Company.findOne({
        company_email:email
    })
    if(!User){return res.status(400).send("No Company found")}
    const check =await bcrypt.compare(password,User.company_password)

    if(!check) return res.status(400).send("Invalid password")
    const token =  jwt.sign({ company_email: User.company_email,  _id: User._id }, process.env.JWT_SECERET_KEY, { expiresIn: '1h' });
    return res.status(200).send({data:token})
}