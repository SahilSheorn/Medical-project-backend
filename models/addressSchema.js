const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    hno: String,
    area: String,
    landmark: String,
    city: String,
    state: String,
    status: String

});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
