import mongoose from "mongoose";
import Hospital from "../models/HospitalSchema.js";

class HospitalController {
    constructor() { }

    // Get all hospitals
    getAllHospitals = async (req, res) => {
        try {
            const hospitals = await Hospital.find();
            res.status(200).json(hospitals);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

}

export default HospitalController;