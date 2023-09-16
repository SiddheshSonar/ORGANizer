import React, { useState } from "react";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Button from "@mui/material/Button";
import img from "../assets/camp.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Application = () => {
  const [registrationDetails, setRegistrationDetails] = useState({
    organ: "", // Set default values for the properties you want to manage
    dateTime: dayjs("2022-04-17T15:30"), // Set a default date and time
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(registrationDetails);
  };

  return (
    <div className="flex w-full h-full overflow-y-scroll">
      <div className="w-1/2 h-full mt-10">
        <div className="w-full h-full flex flex-col items-center justify-center mt-4 mx-2">
          <Select
            label="Enter Organ name"
            sx={{ width: "350px" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={registrationDetails.organ} // Access the 'organ' property from state
            onChange={(e) =>
              setRegistrationDetails({
                ...registrationDetails,
                organ: e.target.value,
              })
            }
          >
            <MenuItem value="Heart">Heart</MenuItem>
            <MenuItem value="Lungs">Lungs</MenuItem>
            <MenuItem value="Liver">Liver</MenuItem>
            <MenuItem value="Kidney">Kidney</MenuItem>
            <MenuItem value="Eyes">Eyes</MenuItem>
          </Select>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center mt-6 mx-2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDateTimePicker
              sx={{ width: "350px" }}
              value={registrationDetails.dateTime} // Access the 'dateTime' property from state
              onChange={(newDateTime) =>
                setRegistrationDetails({
                  ...registrationDetails,
                  dateTime: newDateTime,
                })
              }
            />
          </LocalizationProvider>
          <Button
            sx={{ width: "150px" }}
            className="p-2 my-4"
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center mt-8 mx-2">
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
      <div className="w-1/2 h-full">
        <div className="w-full h-full flex flex-col items-end justify-center bg-cover">
          <img style={{ height: "93vh" }} src={img} alt="Campaign" />
        </div>
      </div>
    </div>
  );
};

export default Application;
