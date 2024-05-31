const Address = require("../models/addressSchema.js");

const addAddress = async (req, res) => {
    try {
        const { hno, area, landmark, city, state, status } = req.body;
        if (!hno || !city || !state) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }
        const ishno = await Address.findOne({ hno });
        if (ishno) {
            return res.status(400).json({ error: "Same Address already exists" });
        }

        const newAddress = new Address({
            hno,
            area,
            landmark,
            city,
            state,
            status
        });

        await newAddress.save();

        res.status(201).json({
            message: 'New Address added Successfully',
            Address: newAddress
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error', error });
    }
};

const getAddress = async (req, res) => {
    try {
        const data = await Address.find();
        res.status(200).json({ data });
        console.log("Address Data : ", data)
    }
    catch (error) {
        console.error("Fetching Data Error", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const updateAddress = async (req, res) => {
    try {
        const { _id } = req.params;
        const { hno, area, landmark, city, state, status } = req.body;
        const updatingAddress = await Address.findByIdAndUpdate(
            _id,
            { hno, area, landmark, city, state, status },
            { new: true }
        );
        if (!updatingAddress) {
            return res.status(404).json({ error: "Address not found" });
        }

        res.status(200).json({ message: "Address updated successfully", Address: updatingAddress });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteAddress = async (req, res) => {
    try {
        const { _id } = req.params;
        console.log("hno. id =", _id);
        const deletedAddress = await Address.findByIdAndDelete(_id);
        if (!deletedAddress) {
            return res.status(404).json({ error: "Address not found" });
        }
        res.status(200).json({ message: "Address deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { addAddress, getAddress, updateAddress, deleteAddress };
