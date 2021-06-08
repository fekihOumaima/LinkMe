const mongoose = require ('mongoose');

const CompanySchema= new mongoose.Schema({
    name: {
        type: String,
        requires: true
    },
    email:{
        type: String,
        requires: true,
        unique: true
    },
    password:{
        type: String,
        requires: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Company = mongoose.model('company',CompanySchema);