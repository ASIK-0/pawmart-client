import React, { use, useEffect, } from 'react';
import logo from '../assets/logo/paw (1).png';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router';

import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const Register = () => {
    const { signInWithGoogle, createUser, setUser, updateInfo } = use(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Register | PawMart";
    }, []);

    const handleSignup = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        const uppercasePattern = /[A-Z]/;
        const lowercasePattern = /[a-z]/;
        const lengthPattern = /.{6,}/;

        if (!uppercasePattern.test(password)) {
            toast.error("Password must contain at least one uppercase letter.");
            return;
        }

        if (!lowercasePattern.test(password)) {
            toast.error("Password must contain at least one lowercase letter.");
            return;
        }

        if (!lengthPattern.test(password)) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                return updateInfo({
                    displayName: name,
                    photoURL: photo,
                }).then(() => {
                    setUser({ ...user, displayName: name, photoURL: photo });
                    toast.success("Account created successfully!");
                    navigate('/')

                })
                    .catch(((error) => {
                        console.log(error);
                    }))
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage)
            })

    }
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                toast.success("Logged in with Google!");
                navigate('/')
                console.log(result);

            })
            .catch(error => {
                toast.error("Google sign in failed!");
                console.log(error);
            })
    };

    return (
        <div className="min-h-[calc(100vh-20px)] flex items-center justify-center relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-40 p-8 lg:p-10">
                <div className="md:w-1/2 max-w-lg mx-auto text-center lg:text-left space-y-4">
                    <img className='w-40 mx-auto lg:mx-0' src={logo} alt="PetSpace Logo" />
                    <h1 className="text-4xl md:text-5xl font-extrabold text-pink-600 drop-shadow-lg">
                        Join Your Pet Space!
                    </h1>
                    <p className="text-lg leading-relaxed mb-6">
                        Create an account to connect with your furry friends and the pet community.
                    </p>
                </div>
                <div className="lg::w-1/2 max-w-lg backdrop-blur-lg border border-pink-300/50 shadow-2xl  rounded-2xl p-8">
                    <form onSubmit={handleSignup} className="space-y-5">
                        <h2 className="text-4xl font-bold text-pink-600 mb-6 text-center">
                            Register
                        </h2>
                        <div>
                            <label className="text-sm font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Your Name"
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="example@email.com"
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>
                        <div className="relative">
                            <label className="text-sm font-medium mb-1">Password</label>
                            <input
                                type='password'
                                name="password"
                                required
                                placeholder="Create a strong password"
                                className="input input-bordered w-full pr-10 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1">
                                Photo URL <span className="text-xs text-gray-500">(optional)</span></label>
                            <input
                                type="url"
                                name="photo"
                                placeholder="https://example.com/photo.jpg"
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full my-btn rounded-lg font-medium py-3 text-white bg-pink-600 hover:bg-pink-700 transition"
                        >
                            Register
                        </button>

                        <div className="flex items-center justify-center gap-2 my-4">
                            <div className="h-px w-20 bg-pink-400"></div>
                            <span className="text-sm text-gray-600">or</span>
                            <div className="h-px w-20 bg-pink-400"></div>
                        </div>

                        <button
                            onClick={handleGoogleSignIn}
                            type="button"
                            className="flex items-center justify-center gap-3 bg-pink-200 text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="google"
                                className="w-5 h-5"
                            />
                            Continue with Google
                        </button>
                        <p className="text-center text-sm mt-6">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-pink-600 font-semibold hover:underline"
                            >
                                Login here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;