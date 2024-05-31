const Doctor = require("../models/doctorSchema.js");

const addData = async (req, res) => {
    try {
        const { image, drId, name, desigination, status } = req.body;
        if (!name || !desigination) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }
        const isname = await Doctor.findOne({ name });
        if (isname) {
            return res.status(400).json({ error: "Doctor with this name already exists" });
        }

        const newDr = new Doctor({
            image,
            drId,
            name,
            desigination, 
            status
        });

        await newDr.save();

        res.status(201).json({
            message: 'New Doctor data added Successfully',
            Doctor: newDr
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error', error });
    }
};

const getData = async (req, res) => {
    try {
        const data = await Doctor.find();
        res.status(200).json({ data });
        // console.log("Doctor Data : ", data )

    } catch (error) {
        console.error("Fetching Data Error", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const updateData = async (req, res) => {
    try {
        const { _id } = req.params;
        const { image, drId, name, desigination, status } = req.body;
        const updatingData = await Doctor.findByIdAndUpdate(
            _id,
            { image, drId, name, desigination, status },
            { new: true }
        );
        if (!updatingData) {
            return res.status(404).json({ error: "Doctor not found" });
        }

        res.status(200).json({ message: "Doctor data updated successfully", Doctor: updatingData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteData = async (req, res) => {
    try {
        const { _id} = req.params;
        console.log("doctor id =",_id);
        const deletedDoctor = await Doctor.findByIdAndDelete(_id);
        if (!deletedDoctor) {
            return res.status(404).json({ error: "Doctor not found" });
        }
        res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { addData, getData, updateData, deleteData };
