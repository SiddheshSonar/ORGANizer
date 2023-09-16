import React, { useState, useEffect } from 'react';
import EastIcon from '@mui/icons-material/East';
import Typewriter from 'typewriter-effect';
import APIRequests from '../../api';
import CircularProgress from '@mui/material/CircularProgress';

const DonorCard = () => {
    const [data, setData] = useState();
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(true)
    const user = JSON.parse(localStorage.getItem('profile'))
    const userType = user.type

    useEffect(() => {
        const fetchData = async () => {
            const res = await APIRequests.getUser({ email: user.email, type: userType })
            console.log(res.data)
            setData(res.data)
            setParts(res.data.organ.map((part) => {
                return (
                    <div className='bg-maroon text-cream px-2.5 py-1 rounded-2xl'>
                        {part}
                    </div>
                )
            }))

            setLoading(false)
        }
        fetchData()
    }, [])

    const DateConvert = (dateString) => {
        const inputDate = new Date(dateString);
        const day = String(inputDate.getDate()).padStart(2, '0');
        const month = String(inputDate.getMonth() + 1).padStart(2, '0');
        const year = String(inputDate.getFullYear()).slice(2, 4);

        return `${day}/${month}/${year}`;
    }


    return (
        <>
            {loading ?
                <CircularProgress color="secondary"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }} />
                :
                (<div className='border rounded-xl bg-cream text-maroon p-2.5 w-card h-card flex flex-col items-center justify-start gap-2'>
                    <div className='text-2xl font-extrabold'>
                        Donor Card
                    </div>
                    <div className='font-semibold flex flex-col gap-2 w-full'>
                        <div className='flex items-center justify-between gap-4 text-xl'>
                            <div>
                                Name: <span className='font-bold'>{data.name}</span>
                            </div>
                            <div>
                                Blood Group: <span className='font-bold'>{data.blood_group}</span>
                            </div>
                            <div>
                                DonorID: <span className='font-bold'>{data.phone}</span>
                            </div>
                        </div>
                        <div className='flex items-center justify-evenly gap-4 text-xl'>
                            <div>
                                Age: <span className='font-bold'>{data.age}</span>
                            </div>
                            <div>
                                Date of Issue: <span className='font-bold'>{DateConvert(data.date)}</span>
                            </div>
                        </div>
                        <div className='flex flex-col items-start gap-2'>
                            <div className='font-bold text-center'>
                                After my death, I wish to donate the following organs of my body for medical treatment of others in need:
                            </div>
                            <div className='flex items-center justify-center flex-wrap w-full'>
                                {parts}
                            </div>
                        </div>
                        <div className='flex flex-col items-start justify-start'>
                            <div>
                                In Emergency, Contact:
                            </div>
                            <div className='flex'>
                                <div>
                                    Name:
                                </div>
                                <div>
                                    Tel:
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </>
    );
};

export default DonorCard;