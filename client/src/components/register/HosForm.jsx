import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import LocationSearchInput from "../map/LocationSearch";
import MyMap from "../map/Map";
import { toast } from "react-toastify";
import APIRequests from "../../api";


const HosForm = () => {
    const [nodalOfficerDetails, setNodalOfficerDetails] = useState([
        { name: "", phone: "", email: "" },
      ]);
  const [location, setLocation] = useState(null);

  const [registrationDetails, setRegistrationDetails] = useState({
    type: "hospital",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    nodal_officer_details: nodalOfficerDetails,
    location: location,
  });

  useEffect(() => {
    console.log(location);
    setRegistrationDetails({ ...registrationDetails, location: location });
  }, [location]);

  const handleNodalOfficerDetailsChange = (index, field, value) => {
    const updatedNodalOfficerDetails = [...nodalOfficerDetails];
    updatedNodalOfficerDetails[index][field] = value;
    setNodalOfficerDetails(updatedNodalOfficerDetails);
    
    // Update registrationDetails with the new nodal officer details
    setRegistrationDetails({
      ...registrationDetails,
      nodal_officer_details: updatedNodalOfficerDetails,
    });
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
        window.location.href = "/login";
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
       <div className="gap-4">
       {nodalOfficerDetails.map((nodalOfficer, index) => (
          <div key={index} className="flex gap-4">
            <TextField
              label={`Nodal Officer Name`}
              variant="outlined"
              value={nodalOfficer.name}
              onChange={(e) =>
                handleNodalOfficerDetailsChange(index, "name", e.target.value)
              }
            />
            <TextField
              label={`Nodal Officer Phone`}
              variant="outlined"
              value={nodalOfficer.phone}
              onChange={(e) =>
                handleNodalOfficerDetailsChange(index, "phone", e.target.value)
              }
            />
            <TextField
              label={`Nodal Officer Email`}
              variant="outlined"
              value={nodalOfficer.email}
              onChange={(e) =>
                handleNodalOfficerDetailsChange(index, "email", e.target.value)
              }
            />
          </div>
        ))}
       </div>
       
            

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

export default HosForm;
