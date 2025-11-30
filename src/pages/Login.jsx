import React, { use } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import logo from '../assets/logo/paw (1).png'
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { signInWithGoogle, singInUser } = use(AuthContext)

    const handleSignin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        singInUser(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user)
                toast.success("Login Successfull")
                navigate(`${location.state ? location.state : "/"}`)
            })
            .catch((error) => {
                // console.log(error.message);
                toast.error(error.message)
            });
    };
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                toast.success("Logged in with Google!");
                navigate(`${location.state ? location.state : "/"}`)
                console.log(result);
            })
            .catch(error => {
                toast.error("Google sign in failed!");
                console.log(error)
            })
    };
    return (
        <div className="min-h-[calc(100vh-20px)] flex items-center justify-center bg-pink-50 relative overflow-hidden">
            <div>
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-40 p-8 lg:p-10  ">
                    <div className="md:w-1/2 max-w-lg mx-auto text-center items-center lg:text-left space-y-4">
                        <img className='w-40 mx-auto md:mx-0' src={logo} alt="" />
                        <h1 className="text-4xl md:text-5xl font-extrabold text-pink-600 drop-shadow-lg">
                            Welcome <span className='text-black'>Back</span>
                        </h1>
                        <p className="text-lg mb-6 text-gray-700">
                            Log in to continue caring for your little companions.🐾
                        </p>
                    </div>

                    <div className="md:w-1/2 max-w-lg backdrop-blur-lg  border border-pink-300/50 shadow-2xl rounded-2xl p-8">
                        <form onSubmit={handleSignin} className="space-y-5">
                            <h2 className="text-4xl font-bold text-pink-600 mb-2 text-center">
                                Login
                            </h2>
                            <div>
                                <label className="block text-sm mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="example@email.com"
                                    className="input input-bordered w-full  focus:outline-none focus:ring-2 focus:ring-pink-500"
                                />
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium mb-1">
                                    Password
                                </label>
                                <input
                                    type='password'
                                    name="password"
                                    required
                                    placeholder="******"
                                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
                                />
                            </div>
                            <div>
                            </div>

                            <br />
                            <button type="submit" className="w-full my-btn rounded-lg font-medium py-2">
                                Login
                            </button>

                            <div className="flex items-center justify-center gap-2 my-2">
                                <div className="h-px w-19 bg-pink-500"></div>
                                <span className="text-sm  /70">or</span>
                                <div className="h-px w-19 bg-pink-500 "></div>
                            </div>
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="flex items-center justify-center gap-3 bg-pink-200 text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                <img
                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                    alt="google"
                                    className="w-5 h-5"
                                />
                                Continue with Google
                            </button>

                            <p className="text-center text-sm  /80 mt-3">
                                Don’t have an account?{""}
                                <Link
                                    to="/register"
                                    className="text-pink-600 font-semibold hover:underline"
                                >
                                    Register here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;