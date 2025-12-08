import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';

const NotFound = () => {

    useEffect(() => {
        document.title = "404 Erorr | PawMart";
    }, []);

    return (
        <div>
            <div className='text-center my-25'>
                <img className='mx-auto md:h-[500px]' src="https://i.pinimg.com/736x/ee/29/a1/ee29a11e8733afb76f516832e88a5838.jpg" alt="" />
                <p className='font-extrabold text-4xl md:text-6xl mb-10 text-pink-600'>Page Not Found</p>
                <Link to={'/'} className='my-btn px-4 py-3'>Go Back</Link>
            </div>
        </div>
    );
};

export default NotFound;