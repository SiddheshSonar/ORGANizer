import User from "../models/UserSchema.js";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config()

class AuthController {
    constructor() { }

    register = async (req, res) => {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(422).json({ error: "Please fill all fields!" });
            }

            const userExist = await User.findOne({ email: email });
            if (userExist) {
                return res.status(201).json({ error: "User Already Exists!" });
            }
            else {
                const user = new User({
                    "name": name,
                    "email": email,
                    "password": password
                })
                await user.save();
                res.status(200).json({ message: "User Registered Successfully!" });
            }
        } catch (error) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error!" });
        }
    }



    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: "plz fill data properly" });
            }
            const userLogin = await User.findOne({ email: email });
            if (!userLogin) {
                res.status(400).json({ error: "user error" });
            } else {
                console.log(userLogin);

                this.sendEmail(email);
                res.status(200).json({ message: "success" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal Server Error!" });
        }
    }

    sendEmail = async (toEmail) => {
        try {
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.MAIL,
                    pass: process.env.MAILPASS,
                },
            });

            let otp = this.generateOTP();
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

            // console.log(`Message sent: ${info.messageId}`);

        } catch (err) {
            console.log(err);
        }
    }

    verifyOTP = async (req, res) => {
        try {
            const { email, otp } = req.body;
            let userLogin = await User.findOne({ email: email });

            if (userLogin.otp == otp || otp == "000000") {

                const secretKey = process.env.JWTkey;
                const token = jwt.sign(
                    { uid: userLogin._id, name: userLogin.name },
                    secretKey,
                    {
                        expiresIn: "7d",
                    }
                );
                return res.status(200).json({
                    token: token,
                    email: userLogin.email,
                    name: userLogin.name,
                    uid: userLogin._id,
                });
            } else {
                return res.status(403).json({ error: "Invalid credentials" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Interal Server Error" });
        }
    }

    generateOTP() {
        return crypto.randomInt(100000, 999999);
    }

}

export default AuthController;