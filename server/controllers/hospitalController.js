import mongoose from "mongoose";
import Hospital from "../models/HospitalSchema.js";
import Donor from "../models/DonorSchema.js";
import Receiver from "../models/ReceiverSchema.js";
import axios from "axios";

class HospitalController {
    constructor() { }

    matchHospital = async (req, res) => {
        try {
            const apiUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json';
            const apiKey = process.env.MAP_APIKEY;

            const { hospital_id, organ, expiry_hours } = req.body;
            const expiry_time = expiry_hours * 60 * 60;
            console.log(expiry_time);
            const hospital = await Hospital.findById(hospital_id);
            if (!hospital) {
                return res.status(404).json({ error: "Hospital not found" });
            }
            const { location } = hospital;
            const { latitude, longitude } = location;

            const receiver = await Receiver.find();
            let receiverArr = receiver.filter((receiver) => {
                return receiver.organ.includes(organ);
            });

            const filteredReceiverArr = await Promise.all(receiverArr.map(async (receiver) => {
                let dur = await axios.get(apiUrl, {
                    params: {
                        origins: `${latitude},${longitude}`,
                        destinations: `${receiver.location.latitude},${receiver.location.longitude}`,
                        key: apiKey
                    }
                });
                if (!dur.data.rows[0].elements[0].duration) {
                    return null; // Remove invalid entries.
                }
                console.log(`Name: ${receiver.name}`);
                const durationValue = dur.data.rows[0].elements[0].duration.value;
                console.log(`Duration Value: ${durationValue}`);
                console.log(`Expiry Time: ${expiry_time}`);

                const isWithinExpiry = durationValue < expiry_time;
                console.log(`Is Within Expiry: ${isWithinExpiry}`);

                if (isWithinExpiry) {
                    return {
                        ...receiver,
                        duration: durationValue // Include duration in the receiver object.
                    };
                }
                return null;
            }));

            // Remove null entries and sort by duration in ascending order.
            const finalReceiverArr = filteredReceiverArr.filter((receiver) => receiver !== null);
            finalReceiverArr.sort((a, b) => a.duration - b.duration);
            //send only ._doc
            const rr = finalReceiverArr.map((receiver) => receiver._doc);
            res.status(200).json(rr);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }

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