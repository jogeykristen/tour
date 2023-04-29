const mongoose = require('mongoose');

const tour = new mongoose.Schema({
    place: {
        type: String,
        require: true
    },
    number_of_people: {
        type: String,
        require: true
    },
    contact_number: {
        type: String,
        require: true
    },
    
});
module.exports.Tour = mongoose.model('tour', tour);