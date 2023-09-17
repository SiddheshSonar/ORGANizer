import mongoose from "mongoose";
import Receiver from "../models/ReceiverSchema.js";
import jwt from "jsonwebtoken";
class ReceiverController {
    constructor() { }

    login = async (req, res) => {
        const { email, password, fcm_token } = req.body;
        try {
            const receiverExists = await Receiver.findOne({ email: email });
            if (receiverExists) {
                if (password == receiverExists.password) {
                    receiverExists.fcm_token = fcm_token;
                    await receiverExists.save();
                    const secretKey = process.env.JWTkey;
                    const token = jwt.sign(
                        { uid: receiverExists._id, name: receiverExists.name },
                        secretKey,
                        {
                            expiresIn: "7d",
                        }
                    );
                    return res.status(200).json({
                        token: token,
                        email: receiverExists.email,
                        name: receiverExists.name,
                        uid: receiverExists._id,
                    });
                } else{
                    res.status(401).send({ message: "Incorrect password" })
                }
            } else {
                res.status(404).send({ message: "Receiver not found" })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "Internal server error" })
        }
    }

    getFCMToken = async (req, res) => {
        try {
            const uid = req.userID;
            const receiver = await Receiver.findById(uid);
            if (receiver) {
                return res.status(200).json({ fcm_token: receiver.fcm_token })
            }
            return res.status(404).json({ message: "Receiver not found" })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "Internal server error" })
            
        }
    }
    updateFCMToken = async (req, res) => {
        try {
            const uid = req.userID;
            const { fcm_token } = req.body;
            const receiver = await Receiver.findById(uid);
            if (receiver) {
                receiver.fcm_token = fcm_token;
                await receiver.save();
                return res.status(200).json({ message: "FCM Token updated" })
            }
            return res.status(404).json({ message: "Receiver not found" })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "Internal server error" })
        }
    }

    getAllRecipients = async (req, res) => {
        try {
            const receiverWithEHR = await Receiver.aggregate([
                {
                    $lookup: {
                        from: "ehrs",
                        localField: "phone",
                        foreignField: "phone",
                        as: "ehrData"
                    }
                }
            ]);
    
            res.status(200).json(receiverWithEHR);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    addOrgan = async (req, res) => {
        console.log(req.body)
        const {email, organ, dateTime} = req.body;
        try {
            
            const rec = await Receiver.findOne({email: email});
            if(rec){
                let find = false;
                console.log("recv org map")
                rec.organ.map((item) => {
                    console.log(item)
                    if(item.name == organ){
                        find=true;
                    }
                })
                if(find){
                    console.log("Organ already exists")
                    return res.status(202).json({message: "Organ already exists"})
                } else{
                    rec.organ.push({name: organ, expiry_date: dateTime})
                    await rec.save();

                    console.log("Organ added successfully")
                    return res.status(200).json({message: "Organ added successfully"})
                }
            } else{
                console.log("Receiver not found")
                return res.status(404).json({message: "Receiver not found"})
            }
        } catch (error) {
            console.log(error)
        }
    }

    getOrgans = async (req, res) => {
        try {
            const uid = req.userID;
            const receiver = await Receiver.findById(uid);
            if (receiver) {
                return res.status(200).json({ organs: receiver.organ })
            }
            return res.status(404).json({ message: "Receiver not found" })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "Internal server error" })
            
        }
    }
    
}

export default ReceiverController;