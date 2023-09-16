import React from 'react';

const Transplant = () => {
    return (
        <div className='h-screen w-full flex'>
            <div className='w-1/2 border overflow-y-scroll'>
                Donors
            </div>
            <div className='w-1/2 border overflow-y-scroll'>
                Recipients
            </div>
        </div>
    );
};

export default Transplant;