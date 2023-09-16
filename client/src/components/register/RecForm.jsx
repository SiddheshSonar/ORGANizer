import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import LocationSearchInput from "../map/LocationSearch";
import MyMap from "../map/Map";
import { toast } from "react-toastify";
import APIRequests from '../../api';

const RecForm = () => {
  const [location, setLocation] = useState(null);
  const [registrationDetails, setRegistrationDetails] = useState({
    type: "receiver",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    phone: "",
    location: location,
    blood_group: "",
    age: "",
    weight: "",
    height: "",
    health_history: "",
  });

  useEffect(() => {
    console.log(location);
    setRegistrationDetails({ ...registrationDetails, location: location });
  }, [location]);

  const bGroup = [
    {
      value: "A+",
      label: "A+",
    },
    {
      value: "A-",
      label: "A-",
    },
    {
      value: "B+",
      label: "B+",
    },
    {
      value: "B-",
      label: "B-",
    },
    {
      value: "AB+",
      label: "AB+",
    },
    {
      value: "AB-",
      label: "AB-",
    },
    {
      value: "O+",
      label: "O+",
    },
    {
      value: "O-",
      label: "O-",
    },
  ];

  const handleGenderChange = (e) => {
    setRegistrationDetails({ ...registrationDetails, gender: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registrationDetails.password !== registrationDetails.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // Prepare the data to send to the API

    try {
     console.log(registrationDetails);
      const response = await APIRequests.signUp(registrationDetails);

      if (response.status === 200) {
        toast.success("Registration successful");
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="w-full h-screen">
      <form
        className="flex items-center justify-center flex-wrap gap-4 content-start w-full h-full"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Name"
          variant="outlined"
          value={registrationDetails.name}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              name: e.target.value,
            })
          }
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          value={registrationDetails.email}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              email: e.target.value,
            })
          }
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={registrationDetails.password}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              password: e.target.value,
            })
          }
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={registrationDetails.confirmPassword}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              confirmPassword: e.target.value,
            })
          }
        />
        <TextField
          label="Phone"
          type="number"
          variant="outlined"
          value={registrationDetails.phone}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              phone: e.target.value,
            })
          }
        />
        <TextField
          label="Blood Group"
          select
          sx={{ width: "150px" }}
          value={registrationDetails.blood_group}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              blood_group: e.target.value,
            })
          }
          variant="outlined"
        >
          {bGroup.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Age"
          type="number"
          sx={{ width: "100px" }}
          variant="outlined"
          value={registrationDetails.age}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              age: e.target.value,
            })
          }
        />
        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={registrationDetails.gender}
          onChange={handleGenderChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
        <TextField
          label="Weight (kg)"
          type="number"
          variant="outlined"
          value={registrationDetails.weight}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              weight: e.target.value,
            })
          }
        />
        <TextField
          label="Height (cm)"
          type="number"
          variant="outlined"
          value={registrationDetails.height}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              height: e.target.value,
            })
          }
        />
        <TextField
          id="outlined-multiline-static"
          label="Any Past Medical Records"
          multiline
          minRows={1}
          maxRows={4}
          sx={{ width: "100%" }}
          value={registrationDetails.health_history}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              health_history: e.target.value,
            })
          }
        />
        <label className="w-full">
          Location:
          <LocationSearchInput setLatLng={setLocation} />
          <MyMap
            lat={location ? location.latitude : null}
            long={location ? location.longitude : null}
            forReg={true}
            setLatLng={setLocation}
          />
        </label>

        <input
          className="p-2.5 w-24 bg-red text-white rounded-xl cursor-pointer hover:bg-sub-dark "
          type="submit"
          value="Register"
        />
      </form>
    </div>
  );
};

export default RecForm;
