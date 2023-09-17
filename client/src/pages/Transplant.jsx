import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import APIRequests from '../api';
import CircularProgress from '@mui/material/CircularProgress';
import EHRTest from './EHR';
import HosDoner from './HosDoner';

const Transplant = () => {
    const [donors, setDonors] = useState([]);
    const [recipients, setRecipients] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [EHR, setEHR] = useState([]);
    const [donorLoading, setDonorLoading] = useState(true);
    const [recipientLoading, setRecipientLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [updatedRec, setUpdatedRec] = useState([]);
    const [updatedRecLoading, setUpdatedRecLoading] = useState(true);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const getData = async () => {
        const dnr = await APIRequests.getDonors();
        setDonors(dnr.data);
        setEHR(dnr.data.ehr);
        setDonorLoading(false);
        console.log(dnr.data);

        const rcpnts = await APIRequests.getRecipients();
        setRecipients(rcpnts.data);
        setRecipientLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    // Filter donors or recipients based on search query
    const filteredData = (data) => {
        return data.filter((item) => {
            const isIdMatch = item.phone && item.phone.toString().includes(searchQuery);
            const isNameMatch = item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase());

            return isIdMatch || isNameMatch;
        });
    };

    const renderUserList = (data) => (
        <div className='w-full h-screen overflow-y-scroll mb-24'>
            {filteredData(data).map((user, index) => (
                <div className='w-full flex items-center justify-between border my-2 rounded-xl p-2' key={index}>
                    <div className='text-xl font-bold text-maroon'>{user && user.phone}</div>
                    <div className='text-xl font-bold text-maroon'>{user && user.name}</div>
                    <div
                        onClick={() => {
                            setSelectedUser(user);
                        }}
                        className='border p-1 px-2 rounded-2xl text-sm font-bold text-white bg-maroon cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105'
                    >
                        View Details
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className='h-screen w-full flex overflow-y-scroll'>
            <div className='w-1/2 h-screen border overflow-y-scroll flex flex-col gap-4'>
                {selectedUser ? (
                    <HosDoner setUpdatedRecLoading={setUpdatedRecLoading} setUpdatedRec={setUpdatedRec} donor={selectedUser} setSelectedUser={setSelectedUser} />
                ) : (
                    <>
                        <div className='w-full mt-4 text-center text-2xl font-bold'>
                            List of all Registered Donors
                        </div>
                        <div className='flex flex-col h-screen overflow-y-scroll'>
                            <input
                                type='text'
                                placeholder='Search by ID or Name'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='p-2 w-3/4 mb-4 border rounded self-center'
                            />
                            {donorLoading ? (
                                <div className='w-full h-full grid place-items-center'>
                                    <CircularProgress color='secondary' />
                                </div>
                            ) : (
                                renderUserList(donors)
                            )}
                        </div>
                    </>
                )}
            </div>
            <div className='w-1/2 border overflow-y-scroll flex flex-col gap-4'>
                {updatedRec.length > 0 ?
                    (<>
                        <div className='w-full mt-4 text-center text-2xl font-bold'>
                            List of Matched Recipients
                        </div>
                        <div className='flex flex-col h-screen overflow-y-scroll'>
                        {updatedRecLoading ? (
                            <div className='w-full h-full grid place-items-center'>
                                <CircularProgress color='secondary' />
                            </div>
                        ) : (
                            renderUserList(updatedRec)
                        )}
                        </div>
                    </>)
                :
                (<>
                    <div className='w-full mt-4 text-center text-2xl font-bold'>
                        List of all Registered Recipients
                    </div>
                    <div className='flex flex-col h-screen overflow-y-scroll'>
                        <input
                            type='text'
                            placeholder='Search by ID or Name'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='p-2 w-3/4 mb-4 border rounded self-center'
                        />
                        {recipientLoading ? (
                            <div className='w-full h-full grid place-items-center'>
                                <CircularProgress color='secondary' />
                            </div>
                        ) : (
                            renderUserList(recipients)
                        )}
                    </div>
                </>)}
            </div>
        </div>
    );
};

export default Transplant;
