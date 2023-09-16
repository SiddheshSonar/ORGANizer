import React from 'react';
import DonorCard from '../components/donorcard/DonorCard';

const Donor = () => {
    return (
        <div className='h-screen w-full flex flex-col items-center justify-start gap-4 mt-24'>
            <div>
                This is your donor card
            </div>
            <DonorCard />
            <div>
                Download Donor Card
            </div>
            <div>
                Download this card and keep it with you at all times. Please inform your relatives/family about your wish 
            </div>
        </div>
    );
};

export default Donor;