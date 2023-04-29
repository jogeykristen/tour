const {Tour} = require('../database/tour');

module.exports.createTour = async(req,res)=>{
    number =req.body.contact_number
    regex = /^\d{10}$/;
    if (regex.test(number)) {
        const tour = new Tour({
            place: req.body.place,
            number_of_people: req.body.number_of_people,
            contact_number: req.body.contact_number
        })

        const result = await tour.save();
        return res.status(200).send("applied succesfully")
    }
    else {
        res.status(400).send("Invalid input. Please enter a 10 digit number.");
    }
}
module.exports.updateTour = async(req,res)=>{
    const User = await Tour.findOne({
        place: req.params.place
    })
    if(!User) return res.status(400).send("no tour found")

    const tour = await Tour.findOneAndUpdate({
        place: req.body.place,
        number_of_people: req.body.number_of_people,
        contact_number: req.body.contact_number
    })
    const result = await tour.save();
    return res.status(200).send("updated successfully")
}