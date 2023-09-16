import express from 'express';
import dotenv from 'dotenv';
import auth from '../middlewares/auth.js';
import ReceiverController from '../controllers/receiverController.js';
dotenv.config()

const rR = express.Router();

const rC = new ReceiverController();

// uR.post("/home", auth,  uC.updateLocation);
// uR.get("/home", auth, uC.getHome);
// uR.get("/location", auth, uC.getAll);
// uR.post("/friend/:id", auth, uC.sendFriendRequest);
// uR.post("/friend/accept/:id", auth, uC.acceptFriendRequest);
rR.post("/mlogin", rC.login);
rR.get("/fcmtoken", auth, rC.getFCMToken);
rR.post("/fcmtoken", auth, rC.updateFCMToken);
rR.get("/", auth, rC.getAllRecipients)

export default rR;
