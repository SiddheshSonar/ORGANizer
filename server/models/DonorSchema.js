import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: false,
  },
  otp: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
  },
  organ: [String],
  tissue: [String],
  blood_group: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  health_history: [String],
  witnesses: [
    {
      name: String,
      phone: Number,
      email: String,
    },
  ],
  aadhar_card: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
});

const Donor = mongoose.model("donor", donorSchema);

export default Donor;
