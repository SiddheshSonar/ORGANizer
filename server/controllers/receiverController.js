import mongoose from "mongoose";
import Receiver from "../models/ReceiverSchema.js";

class ReceiverController {
    constructor() { }
    login = async (req, res) => {
        const { email, password, fcm_token } = req.body;
        try {
            const receiverExists = await Receiver.findOne({ email: email });
            if (receiverExists) {
                if(password==receiverExists.password){
                    receiverExists.fcm_token = fcm_token;
                    await receiverExists.save();
                    const secretKey = process.env.JWTkey;
                    const token = jwt.sign(
                        { uid: receiverLogin._id, name: receiverLogin.name },
                        secretKey,
                        {
                            expiresIn: "7d",
                        }
                    );
                    return res.status(200).json({
                        token: token,
                        email: receiverLogin.email,
                        name: receiverLogin.name,
                        uid: receiverLogin._id,
                    });
                } else{
                    res.status(401).send({ message: "Incorrect password" })
                }
            } else{
                res.status(404).send({ message: "Receiver not found" })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "Internal server error" })
        }
    }
}

export default ReceiverController;