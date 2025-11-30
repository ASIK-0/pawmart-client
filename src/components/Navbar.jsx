import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../assets/logo/pngegg.png'
import MyLink from './MyLink';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logOut } = use(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('Logout Successfully')
            })
            .catch()
    }

    const links = <>
        <li><MyLink className='font-medium' to="/">Home</MyLink></li>
        <li><MyLink className='font-medium' to="/pets-supplies">Pets & Supplies</MyLink></li>
        {
            user && <>
                <li><MyLink className='font-medium' to="/add-listing">Add Listing</MyLink></li>
                <li><MyLink className='font-medium' to="/my-listings">My Listings</MyLink></li>
                <li><MyLink className='font-medium' to="/my-orders">My Orders</MyLink></li>

            </>
        }
    </>

    return (
        <div className='backdrop-blur-2xl sticky z-50 top-0'>
            <div className="navbar bg-pink-100/70 shadow-sm px-[10px]  md:px-[80px] mx-auto">
                <div className="navbar-start">
                    <div className='flex items-center'>
                        <img className='w-[30px] md:w-[45px]' src={logo} alt="" />
                        <Link to={'/'} className="font-bold text-xl sm:text-2xl text-pink-600"><span className='text-black'>Paw</span>Mart</Link>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className='navbar-end flex items-center gap-2'>
                    {
                        user && (
                            <img
                                className='rounded-full w-[40px] h-[40px] border-2 border-pink-300 object-cover'
                                src={user.photoURL  ? user.photoURL : "https://img.icons8.com/?size=80&id=2zQuuMM0XuM9&format=png"}
                                referrerPolicy="no-referrer"
                                alt='profile'
                            />
                        )
                    }
                    {
                        user ? (
                            <Link to={'/'} 
                                onClick={handleLogOut}
                                className='btn btn-sm font-semibold text-sm rounded-sm my-btn'
                            >
                                Logout
                            </Link>
                        ) : (
                            <div className='flex gap-1'>
                                <Link to={"/login"} className='btn btn-sm font-semibold text-sm rounded-sm my-btn'>Login</Link>
                                <Link to={"/register"} className='btn btn-sm font-semibold text-sm rounded-sm my-btn'>Register</Link>
                            </div>
                        )
                    }

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
