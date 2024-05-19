const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: String,
    desigination: String,
    img: String
});

const Doctor = mongoose.model('Doctor',doctorSchema);

module.exports = { Doctor };