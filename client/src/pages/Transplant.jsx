import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import APIRequests from '../api';
import CircularProgress from '@mui/material/CircularProgress';
import EHRTest from './EHR';

const Transplant = () => {
    const [donors, setDonors] = useState([]);
    const [recipients, setRecipients] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [EHR, setEHR] = useState([]);
    const [donorLoading, setDonorLoading] = useState(true);
    const [recipientLoading, setRecipientLoading] = useState(true);
    const [test, setTest] = useState();

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const BMI = (weight, height) => {
        const bmi = ((weight / (height * height)) * 10000).toFixed(2);
        if (bmi < 18.5) {
            return `${bmi} (Underweight)`
        }
        else if (bmi >= 18.5 && bmi <= 24.9) {
            return `${bmi} (Normal)`
        }
        else if (bmi >= 25 && bmi <= 29.9) {
            return `${bmi} (Overweight)`
        }
        else if (bmi >= 30) {
            return `${bmi} (Obese)`
        }
    };

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    useEffect(() => {
        const getData = async () => {
            const dnr = await APIRequests.getDonors();
            setDonors(dnr.data);
            setEHR(dnr.data.ehr);
            setDonorLoading(false);
            console.log(dnr.data)
            const rcpnts = await APIRequests.getRecipients();
            setRecipients(rcpnts.data);
            setRecipientLoading(false);
        };
        getData();
    }, []);

    // Filter donors based on search query
    // Filter donors based on search query
    const filteredDonors = donors.filter((donor, index) => {
        // Convert donor.id to a string and then check for inclusion
        const isIdMatch = donor.phone && donor.phone.toString().includes(searchQuery);
        const isNameMatch = donor.name && donor.name.toLowerCase().includes(searchQuery.toLowerCase());

        return isIdMatch || isNameMatch;
    });


    return (
        <div className='h-screen w-full flex overflow-y-scroll'>
            <div className='w-1/2 h-screen border overflow-y-scroll flex flex-col gap-4'>
                <div className='w-full mt-4 text-center text-2xl font-bold'>
                    List of all Registered Donors
                </div>
                <div className='flex flex-col h-screen overflow-y-scroll'>
                    <input
                        type="text"

                        placeholder="Search by ID or Name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 w-3/4 mb-4 border rounded self-center"
                    />
                    {donorLoading ?
                        <div className='w-full h-full grid place-items-center'>
                            <CircularProgress color="secondary" />
                        </div>
                        :
                        (<div className='w-full h-screen overflow-y-scroll mb-24'>
                            {filteredDonors.map((donor, index) => (
                                <Accordion
                                    key={index}
                                    expanded={expanded === `panel${index}`}
                                    onChange={handleChange(`panel${index}`)}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`panel${index}bh-content`}
                                        id={`panel${index}bh-header`}
                                    >
                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                            {donor.phone}
                                        </Typography>
                                        <Typography sx={{ color: 'text.secondary' }}>{donor.name}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <div className='w-full h-full flex flex-col items-start justify-start gap-2'>
                                                <div className='w-full'>
                                                    Donor Details
                                                </div>
                                                <div className='flex items-center justify-around gap-4'>
                                                    <div>
                                                        Name: {donor.name}
                                                    </div>
                                                    <div>
                                                        Age: {donor.age}
                                                    </div>
                                                    <div>
                                                        Blood Group: {donor.blood_group}
                                                    </div>
                                                    <div>
                                                        Gender: {donor.gender}
                                                    </div>
                                                </div>
                                                <div className='flex items-center justify-around gap-4'>
                                                    <div>
                                                        BMI: {BMI(donor.weight, donor.height)}
                                                    </div>
                                                    <div>
                                                        Gov ID No: {donor.aadhar_card}
                                                    </div>
                                                    <div>
                                                        Tel: {donor.phone}
                                                    </div>
                                                    <div>
                                                        Status: {donor.availability ? 'Alive' : 'Decesased'}
                                                    </div>
                                                </div>
                                                <div className='flex items-center justify-around gap-4'>          
                                                    <div className='flex items-center flex-wrap'>
                                                        Health Issues: {donor.health_history.map((item, index) => (
                                                            <span className='bg-maroon mx-1 text-white p-1 rounded-xl' key={index}>
                                                                {item}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </div>)}
                </div>
            </div>
            <div className='w-1/2 border overflow-y-scroll'>
                Recipients
            </div>
        </div>
    );
};

export default Transplant;
