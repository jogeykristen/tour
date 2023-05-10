const {Company} =require('../database/company');
const bcrypt = require("bcrypt")

const {myLogger} = require('../middleware/date')
const express = require('express');
const app = express();
const path = require('path');


app.use(myLogger);
const fs = require('fs');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports.signup = async(req,res)=>{
    
    // const currentsDate = req.currentDate;
    console.log('date =',req.currentDate);

    upload.fields([
        { name: 'pdf', maxCount: 1 },
        { name: 'json', maxCount: 1 }
    ])(req, res, async (err) => {
        if (err) {
            return res.status(400).send('Invalid form-data');
        }

    // for uploading a single file either pdf or json or only json file

    // upload.single('file')(req, res, async (err) => {
    //     if (err) {
    //         return res.status(400).send(err.message);
    //     }


        saltRounds = 10;
        const email = req.body.company_email;
        const number = req.body.company_number;
        var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        regex = /^\d{10}$/;

        if (!req.files || !req.files['pdf'] || !req.files['json']) {
            return res.status(400).send({message: "Please upload both PDF and JSON files"});
        }
        
        if (req.files['pdf'][0].mimetype === 'application/pdf') {
            const pdfFilePath = path.join(process.cwd(), 'uploads', req.files['pdf'][0].filename);
            console.log("PDF file path =", pdfFilePath);
            const pdfFileContents = fs.readFileSync(pdfFilePath, 'utf-8');
            const pdfData = pdfFileContents.toString();
            //console.log("PDF contents =", pdfData);
        }else
        {
            return res.status(400).send("It has to be an pdf file") 
        }
        if (req.files['json'][0].mimetype === 'application/json') {
            // Get the path of the uploaded files
        const jsonFilePath = path.join(process.cwd(), 'uploads', req.files['json'][0].filename);
        console.log("JSON file path =", jsonFilePath);
        const jsonFileContents = fs.readFileSync(jsonFilePath, 'utf-8');
        const jsonData = JSON.parse(jsonFileContents);
        //console.log("JSON contents =", jsonData);

        }else
        {
            return res.status(400).send("It has to be an json file") 
        }

        
        // This code is for uploading either pdf or json file

        // if (!req.file) {
        //     return res.status(400).send({message: "No file uploaded"});
        // }

        // // Get the path of the uploaded file
        // const filePath = path.join(process.cwd(), 'uploads', req.file.filename);
        
        // console.log("main path =",filePath);
        
        // const fileContents = fs.readFileSync(filePath, 'utf-8');

        // if (req.file.mimetype === 'application/pdf') {
        //     // Handle PDF file
        //     console.log("PDF file contents:", fileContents);
        // } else if (req.file.mimetype === 'application/json') {
        //     // Handle JSON file
        //     const jsonData = JSON.parse(fileContents);
        //     console.log("JSON file contents:", jsonData);
        // } else {
        //     return res.status(400).send({message: "Invalid file type"});
        // }

    //the above code is for either pdf or json  
    
    //below code is for json upload

        // if (!req.file) {
        //     return res.status(400).send({message: "No file uploaded"});
        // }


        // Get the path of the uploaded file
        // const filePath = path.join(process.cwd(), 'uploads', req.file.filename); //****imp study for interview difference __dirname and process.cwd
        // //const filePath = path.join(__dirname, '../uploads/', req.file.filename);
        
        // console.log("main path =",filePath);
        

        // const fileContents = fs.readFileSync(filePath, 'utf-8');
        // const jsonData = JSON.parse(fileContents);
        // console.log("contents =", jsonData);
        
        if(emailFormat.test(email)){
            if(regex.test(number)){
                const company = await Company.findOne({company_email:req.body.company_email})
                if(company)return res.status(400).send({message:"Company already registered"})

                const pass = req.body.company_password;
                
                const hashedPassword =await bcrypt.hash(pass,saltRounds)

                


                const comp = new Company({
                    company_name:req.body.company_name,
                    company_number:req.body.company_number,
                    company_email:req.body.company_email,
                    company_password:hashedPassword,
                    date:req.currentDate
                
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