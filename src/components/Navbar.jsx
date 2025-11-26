import React from 'react';
import { NavLink } from 'react-router';
import logo from '../assets/logo/pngegg.png'
import MyLink from './MyLink';

const Navbar = () => {

    const links = <> 
        <li><MyLink className='font-medium' to="/">Home</MyLink></li>
        <li><MyLink className='font-medium' to="/pets-supplies">Pets & Supplies</MyLink></li>
    </>

    return (
        <div className=''>
            <div className="navbar bg-pink-50 shadow-sm px-[10px]  md:px-[80px] mx-auto">
                <div className="navbar-start">
                    <div className='flex items-center'>
                        <img className='w-[45px]' src={logo} alt="" />
                        <a className="font-bold text-2xl text-pink-400">PawMart</a>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end gap-1">
                    <a className='btn btn-sm font-semibold rounded-sm bg-pink-300  hover:bg-gradient-to-r from-pink-300 via-pink-400 to-rose-400 transition-all duration-300'>Login</a>
                    <a className='btn btn-sm font-semibold rounded-sm bg-pink-300 hover:bg-gradient-to-r from-pink-300 via-pink-400 to-rose-400 transition-all duration-300'>Register</a>
                </div>
                <div className="dropdown dropdown-left  dropdown-bottom">
                    <div tabIndex={0} role="button" className=" px-1 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm  dropdown-content bg-pink-50 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
