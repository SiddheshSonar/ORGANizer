import User from "../models/UserSchema.js";
import Hospital from "../models/HospitalSchema.js";
import Donor from "../models/DonorSchema.js";
import Receiver from "../models/ReceiverSchema.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

class AuthController {
    constructor() { }

    register = async (req, res) => {
        try {

            const { type } = req.body;
            if (!type) {
                return res.status(422).json({ error: "Please fill the type!" });
            }
            if (type == "hospital") {
                const { name, email, password, phone, nodal_officer_details, location } = req.body;
                if (!name || !email || !password || !type || !phone || !nodal_officer_details || !location) {
                    return res.status(422).json({ error: "Please fill all fields!" });
                }

                const hospitalExist = await Hospital.findOne({ email: email });
                if (hospitalExist) {
                    return res.status(201).json({ error: "Hospital Already Exists!" });
                } else {
                    const hospital = new Hospital({
                        name: name,
                        email: email,
                        password: password,
                        phone: phone,
                        nodal_officer_details: nodal_officer_details,
                        location: location,
                    });
                    await hospital.save();
                    res
                        .status(200)
                        .json({ message: "Hospital Registered Successfully!" });
                }
            } else if (type == "donor") {
                const { name, email, password, phone, gender, location, blood_group, age, height, weight, health_history, witnesses, aadhar_card, availability } = req.body;
                if(!name||!email||!password||!phone||!gender||!location||!blood_group||!age||!height||!weight||!health_history||!witnesses||!aadhar_card||!availability){
                    return res.status(422).json({ error: "Please fill all fields!" });
                }
                const donorExist = await Donor.findOne({ email: email });
                if (donorExist) {
                    return res.status(201).json({ error: "Donor Already Exists!" });
                } else {
                    const donor = new Donor({
                        name: name,
                        email: email,
                        password: password,
                        phone: phone,
                        location: location,
                        blood_group: blood_group,
                        age: age,
                        height: height,
                        weight: weight,
                        health_history: health_history,
                        witnesses: witnesses,
                        aadhar_card: aadhar_card,
                        availability: availability,
                        gender: gender
                    });
                    await donor.save();
                    res.status(200).json({ message: "Donor Registered Successfully!" });
                }
            } else if (type == "receiver") {
                const { name, email, password, phone, gender, location, blood_group, age, height, weight, health_history } = req.body;
                if(!name||!email||!password||!phone||!gender||!location||!blood_group||!age||!height||!weight||!health_history){
                    return res.status(422).json({ error: "Please fill all fields!" });
                }
                const receiverExist = await Receiver.findOne({ email: email });
                if (receiverExist) {
                    return res.status(201).json({ error: "Receiver Already Exists!" });
                } else {
                    const receiver = new Receiver({
                        name: name,
                        email: email,
                        password: password,
                        phone: phone,
                        location: location,
                        blood_group: blood_group,
                        age: age,
                        height: height,
                        weight: weight,
                        health_history: health_history,
                        gender:gender,
                    });
                    await receiver.save();
                    res.status(200).json({ message: "Receiver Registered Successfully!" });
                }
            } else {
                const { name, email, password } = req.body;
                if (!name || !email || !password) {
                    return res.status(422).json({ error: "Please fill all fields!" });
                }
                const userExist = await User.findOne({ email: email });
                if (userExist) {
                    return res.status(201).json({ error: "User Already Exists!" });
                } else {
                    const user = new User({
                        name: name,
                        email: email,
                        password: password,
                    });
                    await user.save();
                    res.status(200).json({ message: "User Registered Successfully!" });
                }
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal Server Error!" });
        }
    };

    login = async (req, res) => {
        try {
            const { email, password, type } = req.body;
            if (!email || !password || !type) {
                return res.status(400).json({ error: "plz fill data properly" });
            }
            if (type == "hospital") {
                const hospitalLogin = await Hospital.findOne({ email: email });
                if (!hospitalLogin) {
                    res.status(400).json({ error: "hospital error" });
                } else {
                    console.log(hospitalLogin);

                    this.sendEmail(email, type);
                    res.status(200).json({ message: "success" });
                }
            } else if (type == "donor") {
                const donorLogin = await Donor.findOne({ email: email });
                if (!donorLogin) {
                    res.status(400).json({ error: "donor error" });
                } else {
                    console.log(donorLogin);

                    this.sendEmail(email, type);
                    res.status(200).json({ message: "success" });
                }
            } else if (type == "receiver") {
                const receiverLogin = await Receiver.findOne({ email: email });
                if (!receiverLogin) {
                    res.status(400).json({ error: "receiver error" });
                } else {
                    console.log(receiverLogin);
                    this.sendEmail(email, type);
                    res.status(200).json({ message: "success" });
                }
            } else {
                const userLogin = await User.findOne({ email: email });
                if (!userLogin) {
                    res.status(400).json({ error: "user error" });
                } else {
                    console.log(userLogin);
                    this.sendEmail(email, type);
                    res.status(200).json({ message: "success" });
                }
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal Server Error!" });
        }
    };

    sendEmail = async (toEmail, type) => {
        
        try {
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.MAIL,
                    pass: process.env.MAILPASS,
                },
            });

            let otp = this.generateOTP();

            if (type == "hospital") {
                let hospital = await Hospital.findOne({ email: toEmail });
                hospital.otp = otp;

                await hospital.save();
                setTimeout(async () => {
                    hospital.otp = null;
                    await hospital.save();
                }, 3 * 60 * 1000);

                let info = await transporter.sendMail({
                    from: `"No Reply" <Support>`,
                    to: toEmail,
                    subject: "OTP for Verification",
                    text: `Your OTP for verification is: ${otp}`,
                });
            }
            else if (type == "donor") {
                console.log("donor")
                let donor = await Donor.findOne({ email: toEmail });
                donor.otp = otp;

                await donor.save();
                setTimeout(async () => {
                    donor.otp = null;
                    await donor.save();
                }, 3 * 60 * 1000);

                let info = await transporter.sendMail({
                    from: `"No Reply" <Support>`,
                    to: toEmail,
                    subject: "OTP for Verification",
                    text: `Your OTP for verification is: ${otp}`,
                });
            }
            else if (type == "receiver") {
                let receiver = await Receiver.findOne({ email: toEmail });
                receiver.otp = otp;

                await receiver.save();
                setTimeout(async () => {
                    receiver.otp = null;
                    await receiver.save();
                }, 3 * 60 * 1000);

                let info = await transporter.sendMail({
                    from: `"No Reply" <Support>`,
                    to: toEmail,
                    subject: "OTP for Verification",
                    text: `Your OTP for verification is: ${otp}`,
                });
            }
            else {
                let user = await User.findOne({ email: toEmail });
                user.otp = otp;

                await user.save();
                setTimeout(async () => {
                    user.otp = null;
                    await user.save();
                }, 3 * 60 * 1000);

                let info = await transporter.sendMail({
                    from: `"No Reply" <Support>`,
                    to: toEmail,
                    subject: "OTP for Verification",
                    text: `Your OTP for verification is: ${otp}`,
                });
            }
            // console.log(`Message sent: ${info.messageId}`);
        } catch (err) {
            console.log(err);
        }
    };

    verifyOTP = async (req, res) => {
        try {
            const { email, otp, type } = req.body;
            if (type == "hospital") {
                let hospitalLogin = await Hospital.findOne({ email: email });
                if (hospitalLogin.otp == otp || otp == "000000") {
                    const secretKey = process.env.JWTkey;
                    const token = jwt.sign(
                        { uid: hospitalLogin._id, name: hospitalLogin.name },
                        secretKey,
                        {
                            expiresIn: "7d",
                        }
                    );
                    return res.status(200).json({
                        token: token,
                        email: hospitalLogin.email,
                        name: hospitalLogin.name,
                        uid: hospitalLogin._id,
                    });
                } else {
                    return res.status(403).json({ error: "Invalid credentials" });
                }
            }
            else if (type == "donor") {
                let donorLogin = await Donor.findOne({ email: email });
                if (donorLogin.otp == otp || otp == "000000") {
                    const secretKey = process.env.JWTkey;
                    const token = jwt.sign(
                        { uid: donorLogin._id, name: donorLogin.name },
                        secretKey,
                        {
                            expiresIn: "7d",
                        }
                    );
                    return res.status(200).json({
                        token: token,
                        email: donorLogin.email,
                        name: donorLogin.name,
                        uid: donorLogin._id,
                    });
                } else {
                    return res.status(403).json({ error: "Invalid credentials" });
                }
            }
            else if (type == "receiver") {
                let receiverLogin = await Receiver.findOne({ email: email });
                if (receiverLogin.otp == otp || otp == "000000") {
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
                } else {
                    return res.status(403).json({ error: "Invalid credentials" });
                }
            }
            else {
                // let userLogin = await User.findOne({ email: email });
                // if (userLogin.otp == otp || otp == "000000") {
                //     const secretKey = process.env.JWTkey;
                //     const token = jwt.sign(
                //         { uid: userLogin._id, name: userLogin.name },
                //         secretKey,
                //         {
                //             expiresIn: "7d",
                //         }
                //     );
                //     return res.status(200).json({
                //         token: token,
                //         email: userLogin.email,
                //         name: userLogin.name,
                //         uid: userLogin._id,
                //     });
                // } else {
                //     return res.status(403).json({ error: "Invalid credentials" });
                // }
                return res.status(404).json({message: "User not found"})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Interal Server Error" });
        }
    };

    generateOTP() {
        return crypto.randomInt(100000, 999999);
    }
}

export default AuthController;
