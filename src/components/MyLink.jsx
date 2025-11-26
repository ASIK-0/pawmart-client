import React from 'react';
import { NavLink } from 'react-router';

const MyLink = ({to, className, children}) => {
    return (
        <NavLink to={to} className={({isActive})=> isActive ? "text-pink-500 font-semibold border border-pink-400 rounded-sm" : `${className}`}>
            {children}
        </NavLink>
    );
};

export default MyLink;