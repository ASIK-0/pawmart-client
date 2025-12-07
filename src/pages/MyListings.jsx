import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const MyListings = () => {

    const [myListing, setMyListing] = useState([]);
    const { user } = use(AuthContext)

    useEffect(() => {
        axios.get(`http://localhost:3000/my-listings?email=${user?.email}`)
            .then(res => {
                setMyListing(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [user?.email])

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/delete/${id}`)
                    .then(res => {
                        console.log(res.data);
                        const filterData = myListing.filter(listing => listing._id !== id);
                        setMyListing(filterData);
                        toast.success("Deleted successfully!");

                        Swal.fire({
                            title: "Deleted!",
                            text: "Your List has been deleted.",
                            icon: "success"
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        toast.error("Delete failed!");
                    });
            }
        });
    };


    return (
        <div className="w-11/12 max-w-7xl mx-auto my-10 md:my-16">
            <div className="flex sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                <div>
                    <h1 className="text-2xl md:text-5xl font-bold text-pink-600">
                        My Listings
                    </h1>
                    <p className="text-gray-600 mt-2 text-[8px] md:text-lg">
                        Manage your adorable pets & products ({myListing.length} {myListing.length === 1 ? 'post' : 'posts'})
                    </p>
                </div>
                <Link to="/add-listing">
                    <button className="my-btn px-4 py-3 sm:px-6 sm:py-4 rounded-2xl items-center text-nowrap font-semibold md:font-bold text-sm md:text-xl">Add  Listing
                    </button>
                </Link>
            </div>

            {/* Desktop*/}
            <div className="hidden md:block rounded-3xl shadow-xl overflow-hidden border border-pink-300">
                <div className="overflow-x-hidden">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-pink-200">
                                <th className="text-left py-6 px-6 font-bold text-lg">Product</th>
                                <th className="text-left py-6 px-6 font-bold text-lg">Description</th>
                                <th className="text-left py-6 px-6 font-bold text-lg">Category</th>
                                <th className="text-center py-6 px-6 font-bold text-lg">Price</th>
                                <th className="text-center py-6 px-6 font-bold text-lg">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myListing.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-20">
                                        <div className="flex flex-col items-center">
                                            <p className="text-4xl font-semibold text-gray-500">Aww, it’s empty here!</p>
                                            <p className="text-gray-400 mt-2">Bring your pets & products to life 🐾</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                myListing.map(listing => (
                                    <tr
                                        key={listing._id}
                                        className={'hover:bg-pink-50 transition-all duration-300 border-b border-pink-100'}
                                    >
                                        <td className="py-6 px-6">
                                            <div className="flex items-center gap-4">
                                                <div className="">
                                                    <div>
                                                        <img src={listing.image} alt={listing.name} className="h-16 min-w-16 max-w-16 rounded-2xl border border-pink-400" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold  text-gray-800">{listing.name}</div>
                                                    <div className="text-sm text-gray-500">Posted {listing.date}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-6 px-6">
                                            <p className="text-gray-600">
                                                {listing.description || "No description added"}
                                            </p>
                                        </td>

                                        <td className="py-6 px-6">
                                            <span
                                                className={`w-38 inline-block text-center px-4 py-2 rounded-full text-white font-bold text-sm shadow-md  
                                                    ${listing.category === "Pets"
                                                        ? "bg-pink-500"
                                                        : listing.category === "Pet Food"
                                                            ? "bg-amber-500"
                                                            : listing.category === "Accessories"
                                                                ? "bg-purple-500"
                                                                : "bg-teal-500"}`}
                                            >
                                                {listing.category}
                                            </span>
                                        </td>

                                        <td className="py-6 px-6 text-center">
                                            {listing.category === "Pets" ? (
                                                <span className="text-sm text-nowrap font-bold text-green-600 flex items-center gap-2">
                                                    Free Adoption
                                                </span>
                                            ) : (
                                                <span className="text-xl font-semibold text-pink-600">{listing.Price}</span>
                                            )}
                                        </td>

                                        <td className="py-6 px-6 text-center">
                                            <div className="flex justify-center gap-3">
                                                <Link to={`/update-listings/${listing?._id}`} className="btn bg-blue-500/85 hover:bg-blue-600 px-6 text-white rounded-md shadow-lg transform hover:scale-110 transition">
                                                    Edit
                                                </Link>
                                                <button onClick={() => handleDelete(listing?._id)} className="btn bg-red-500/80 hover:bg-red-600 text-white rounded-md shadow-lg transform hover:scale-110 transition">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile */}
            <div className="block md:hidden space-y-6">
                {myListing.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-pink-100">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6" />
                        <p className="text-2xl font-semibold text-gray-500">No listings yet!</p>
                        <p className="text-gray-400 mt-2">Start adding your pets or products</p>
                    </div>
                ) : (
                    myListing.map(listing => (
                        <div key={listing._id} className="rounded-3xl shadow-2xl p-6 border-2 border-pink-100">
                            <div className="flex gap-5">
                                <img
                                    src={listing?.image}
                                    alt={listing?.name}
                                    className="w-28 h-28 rounded-2xl object-cover border border-pink-300"
                                />
                                <div className="flex-1">
                                    <h3 className="text-xl h-6 overflow-hidden font-bold text-gray-800">{listing?.name}</h3>
                                    <span className={`inline-block px-4 py-2 rounded-full text-white text-xs font-bold mt-2 ${listing.category === "Pets" ? "bg-pink-500" :
                                        listing.category === "Pet Food" ? "bg-amber-500" :
                                            listing.category === "Accessories" ? "bg-purple-500" : "bg-teal-500"
                                        }`}>
                                        {listing.category}
                                    </span>
                                    <p className="text-lg font-bold mt-3">
                                        {listing.category === "Pets" ?
                                            <span className="text-green-600 flex items-center gap-2">
                                                Free Adoption
                                            </span> :
                                            <span className="text-pink-600">Price: {listing.price}</span>
                                        }
                                    </p>

                                </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button className="flex-1 bg-blue-500/80 hover:bg-blue-600 text-white font-bold py-3 rounded-md shadow-lg transform hover:scale-105 transition">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(listing?._id)} className="flex-1 bg-red-500/80 hover:bg-red-600 text-white font-bold py-3 rounded-md shadow-lg transform hover:scale-105 transition">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyListings;