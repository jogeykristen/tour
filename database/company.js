const mongoose = require('mongoose');

const Comp = new mongoose.Schema({
    company_name: {
        type: String,
        require: true
    },
    company_number: {
        type: String,
        require: true
    },
    company_email: {
        type: String,
        require: true
    },
    company_password: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    pdf: {
        data: Buffer,
        contentType: String,
        fileName: {
            type: String,
            default: function () {
                return "pdf_" + Date.now();
            }
        }
    },
    json: {
        data: Object,
        contentType: String,
        fileName: {
            type: String,
            default: function () {
                return "json_" + Date.now();
            }
        }
    }
});
module.exports.Company = mongoose.model('company', Comp);