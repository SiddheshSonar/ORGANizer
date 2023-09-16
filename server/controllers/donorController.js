import mongoose from "mongoose";
import Donor from "../models/DonorSchema.js";

class DonorController {
    constructor() { }

    getAllDonors = async (req, res) => {
        try {
            const donorsWithEHR = await Donor.aggregate([
                {
                    $lookup: {
                        from: "ehrs",
                        localField: "phone",
                        foreignField: "phone",
                        as: "ehrData"
                    }
                }
            ]);
    
            res.status(200).json(donorsWithEHR);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    

}

export default DonorController;