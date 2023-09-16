import mongoose from "mongoose";
import Donor from "../models/DonorSchema.js";

class DonorController {
    constructor() { }

    getAllDonors = async (req, res) => {
        try {
            const donors = await Donor.find();
            res.status(200).json(donors);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    

}

export default DonorController;