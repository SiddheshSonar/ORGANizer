import express from 'express';
import dotenv from 'dotenv';
import auth from '../middlewares/auth.js';
import HospitalController from '../controllers/hospitalController.js';
dotenv.config()

const hR = express.Router();

const hC = new HospitalController();

hR.get('/', auth, hC.getAllHospitals);

export default hR;
