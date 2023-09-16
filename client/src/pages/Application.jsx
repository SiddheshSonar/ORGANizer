import React, { useState } from "react";
import dayjs from 'dayjs';
import { TextField } from "@mui/material";
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from '@mui/material/Button';

const Application = () => {
  const [registrationDetails, setRegistrationDetails] = useState({
    organ: '', // Set default values for the properties you want to manage
    dateTime: dayjs('2022-04-17T15:30'), // Set a default date and time
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(registrationDetails);
  };

  return (  
    <div className="flex w-full h-full overflow-y-scroll">
      <div className="w-1/2 h-full">
        <div className="w-full h-full flex flex-col items-center justify-center mt-4 mx-2">
      <TextField
            sx={{ width: "450px" }}
            label="Enter Organ name"
            color= "primary"
            variant="outlined"
            value={registrationDetails.organ} // Access the 'organ' property from state
            onChange={(e) =>
              setRegistrationDetails({
                ...registrationDetails,
                organ: e.target.value,
              })
            }
          />
          </div>
          <div className="w-full h-full flex flex-col items-center justify-center mt-4 mx-2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDateTimePicker
              value={registrationDetails.dateTime} // Access the 'dateTime' property from state
              onChange={(newDateTime) =>
                setRegistrationDetails({
                  ...registrationDetails,
                  dateTime: newDateTime,
                })
              }
            />
          </LocalizationProvider>
          <Button className= "p-2 my-4" variant="contained" onClick={handleSubmit}>Submit</Button>
        </div>
        
      </div>
      <div className="w-1/2 p-4">Second Half</div>
    </div>
  );
};

export default Application;
