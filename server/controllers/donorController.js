import mongoose from "mongoose";
import Donor from "../models/DonorSchema.js";

class DonorController {
  constructor() { }
  addDateTo = async (req, res) => {
    try {
      // Find donors without a date field
      const donorsToUpdate = await Donor.find({ date: { $exists: false } });

      // Update each donor with the current date
      const currentDate = new Date();
      const updatePromises = donorsToUpdate.map((donor) =>
        Donor.updateOne({ _id: donor._id }, { $set: { date: currentDate } })
      );   

      // Execute all update operations
      await Promise.all(updatePromises);

      console.log('Donors updated successfully.');
    } catch (error) {
      console.error('Error updating donors:', error);
    }
  }

  // getAllDonors = async (req, res) => {
  //   try {
  //     const donors = await Donor.find();
  //     res.status(200).json(donors);
  //   } catch (error) {
  //     res.status(404).json({ message: error.message });
  //   }
  // }

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