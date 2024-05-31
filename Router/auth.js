const express = require("express");
const { addData, getData, updateData, deleteData } = require("../controller/doctorController");
const { addAddress, getAddress, updateAddress, deleteAddress } = require("../controller/addressController");
const router = express.Router();


// Define Doctors Data
router.post("/doctor", addData);
router.get("/doctor", getData);
router.put("/doctor/:_id", updateData);
router.delete('/doctor/:_id', deleteData);


// Define Addresss Data
router.post("/address", addAddress);
router.get("/address", getAddress);
router.put("/address/:_id", updateAddress);
router.delete('/address/:_id', deleteAddress);


module.exports = router;
