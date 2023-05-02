const {Company} =require('../database/company');
const bcrypt = require("bcrypt")

const {myLogger} = require('../middleware/date')
const express = require('express');
const app = express();

app.use(myLogger);

app.use((req, res, next) => {
    req.currentDate = new Date().toISOString();
    console.log('datesss =', req.currentDate);
    next();
  })

const multer = require('multer');
const upload = multer();

module.exports.signup = async(req,res)=>{
    
    // const currentsDate = req.currentDate;
    // console.log('date =',req.currentDate);

    upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(400).send('Invalid form-data');
    }

        saltRounds = 10;
        const email = req.body.company_email;
        const number = req.body.company_number;
        var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        regex = /^\d{10}$/;
        
        if(emailFormat.test(email)){
            if(regex.test(number)){
                const company = await Company.findOne({company_email:req.body.company_email})
                if(company)return res.status(400).send("Company already registered")

                const pass = req.body.company_password;
                
                const hashedPassword =await bcrypt.hash(pass,saltRounds)

                


                const comp = new Company({
                    company_name:req.body.company_name,
                    company_number:req.body.company_number,
                    company_email:req.body.company_email,
                    company_password:hashedPassword
                
                });

                const result = await comp.save();
                
                return res.status(200).send("Company created successfully" )
            
            }
            else{
                return res.status(400).send("Enter a 10 digit phone number")
            }
        }
        else{
            return res.status(400).send("Enter a valid email address")
        }
    })
        
}

module.exports.login = async(req,res)=>{
    const email = req.body.company_email;
    const password = req.body.company_password;
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if(emailFormat.test(email)){
        const User =await Company.findOne({
            company_email:email
        })
        if(!User){return res.status(400).send("No Company found")}
        const check =await bcrypt.compare(password,User.company_password)
    
        if(!check) return res.status(400).send("Invalid password")
        const token =  jwt.sign({ company_email: User.company_email,  _id: User._id }, process.env.JWT_SECERET_KEY, { expiresIn: '1h' });
        return res.status(200).send({data:token})
    }
    else{
        return res.status(400).send("Enter a valid email address")
    }
    
}