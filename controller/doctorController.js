const { Doctor } = require("../models/doctorSchema");

const addData = async (req,res) => {
    try{
        const { name,desigination, img} = req.body;

        const existingName = await Doctor.findOne({ name });
        const existingDesigination = await Doctor.findOne({ desigination });

        if (existingName) {
            return res.status(400).json({ error: "Doctor name already exists"});
        }
        if (existingDesigination) {
            return res.status(400).json({ error: "Email already exists"});
        }

        const newDr = new Doctor({
            name,
            desigination,
            img
        });

        await newDr.save();

        res.status(201).json(
            { message: 'New Doctor data added Successfully', Doctor: newDr }
        );
    }
    catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error',error});
    }
}

const getData = async (req,res) => {
    try{
        const Data = await Doctor.find();
        res.status(200).json({ Data })
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
    catch (error) {
        console.error("Fetching Data Error",error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
module.exports= {addData, getData}