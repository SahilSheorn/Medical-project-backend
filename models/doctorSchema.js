const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    image: String,
    drId: String,
    name: String,
    desigination: String,
    status: String
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
