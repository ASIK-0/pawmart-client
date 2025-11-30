import React from 'react';
import HashLoader from "react-spinners/HashLoader";

const LoadingSpinner = () => {
    return (
        <div className="flex min-h-screen justify-center items-center my-6">
            <HashLoader color="#ec4899" />
        </div>
    );
};

export default LoadingSpinner;