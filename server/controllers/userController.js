import mongoose from "mongoose";
import admin from "firebase-admin";

import serviceAccount from "../secrets/firebase-admin.json" assert { type: "json" };
import Receiver from "../models/ReceiverSchema.js";

class UserController {
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            // databaseURL: ""
        });
    }

    sendNotification = async (req, res) => {
        try {
            const { uid, title, body } = req.body;
            const user = await Receiver.findById(uid);
            console.log(user.fcm_token)
            if (user) {
                let message = {
                    notification: { title: title, body: body }, token: user.fcm_token,
                };

                // const response = await admin.messaging().sendToDevice(user.fcm_token, payload, options);
                const response = await admin.messaging().send(message)
                console.log(response);
                res.status(200).send({ message: "Notification sent" });
            } else {
                res.status(404).send({ message: "User not found" });
            }
        } catch (error) {

        }
    }


}

export default UserController;