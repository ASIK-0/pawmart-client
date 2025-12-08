import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate, useParams } from 'react-router';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const UpdateListing = () => {
    const { user, loading } = use(AuthContext)
    const { id } = useParams()
    const [listing, setListing] = useState()
    const navigation = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`)
            .then(res => {
                const data = res.data.result;
                document.title = "Update List | PawMart";
                setListing({
                    ...data,
                    category: data.category || "Pets",
                    price: data.category === "Pets" ? 0 : (data.price || "")
                });
            })
    }, [id])

    console.log(listing)

    const handleUpdate = (e) => {
        e.preventDefault()

        const listngFormData = {
            name: e.target.name.value,
            category: e.target.category.value,
            Price: Number(e.target.price.value),
            location: e.target.location.value,
            description: e.target.description.value,
            image: e.target.image.value,
            date: e.target.date.value,
            email: user.email
        }

        axios.put(`http://localhost:3000/update/${id}`, listngFormData)
            .then(res => {
                console.log(res.data);
                toast.success('Update Successfull')
                navigation('/my-listings')
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleCategoryChange = (e) => {
        const updatedCategory = e.target.value;
        setListing(prev => ({
            ...prev,
            category: updatedCategory,
            price: updatedCategory === "Pets" ? 0 : ""
        }))
    };

    const handlePriceChange = (e) => {
        setListing(prev => ({ ...prev, price: e.target.value }));
    };

    if (loading || !listing) {
        return <LoadingSpinner />
    }

    return (
        <div>
            <div className="w-11/12 max-w-2xl mx-auto py-10">
                <div>
                    <Link to={'/my-listings'} className="mb-8 text-pink-600 hover:text-pink-700 font-semibold flex items-center gap-2 text-lg">
                        ← Back to Lisings
                    </Link>
                </div>
                <div className="mb-10 border border-pink-200 rounded-2xl shadow-xl p-8 space-y-6">
                    <div className='text-center'>
                        <h1 className="text-3xl md:text-5xl font-bold text-pink-600 mb-4">Update Listing</h1>
                        <p className="text-md text-gray-600">Share your pet for adoption or sell pet products</p>
                    </div>

                    <form onSubmit={handleUpdate} className="">
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Pet / Product Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={listing?.name}
                                required
                                className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:outline-none"
                                placeholder="e.g. Golden Retriever Puppy or Royal Canin 4kg"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold mb-2">
                                Category
                            </label>
                            <select
                                name="category"
                                required
                                value={listing?.category}
                                onChange={handleCategoryChange}
                                className="w-full px-5 py-3 border-2 rounded-xl focus:border-pink-500 focus:outline-none appearance-none cursor-pointer"
                            >
                                <div className='text-black'>
                                    <option value="Pets">Pets (Adoption - Free)</option>
                                    <option value="Pet Food">Pet Food</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Pet Care Products">Pet Care Products</option>
                                </div>
                            </select>


                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Price (BDT)
                            </label>
                            <input
                                type="number"
                                name="price"
                                required
                                value={listing?.price}
                                onChange={handlePriceChange}
                                disabled={listing.category === "Pets"}
                                className={`w-full px-5 py-3 border-2 rounded-xl focus:outline-none ${listing.category === "Pets"
                                    ? " text-gray-300 cursor-not-allowed"
                                    : "border-gray-300 focus:border-pink-500"
                                    }`}
                            />
                            {listing.category === "Pets" && (
                                <p className="text-sm text-green-600 mt-2">Adoption is always free</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                defaultValue={listing?.location}
                                required
                                className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:outline-none"
                                placeholder="e.g. Dhaka, Chattogram, Sylhet"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                defaultValue={listing?.description}
                                rows="4"
                                required
                                className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:outline-none"
                                placeholder="Tell us about your pet or product..."
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Image URL
                            </label>
                            <input
                                type="url"
                                name="image"
                                defaultValue={listing?.image}
                                required
                                className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:outline-none"
                                placeholder="https://images.unsplash.com/..."
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                Use Unsplash or Imgur link
                            </p>
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                defaultValue={listing?.date}
                                required
                                className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Your Email (for contact)
                            </label>
                            <input
                                type="email"
                                value={user?.email || ""}
                                readOnly
                                className="w-full px-5 py-3 bg-gray-100 border-2 border-gray-300 rounded-xl text-gray-700"
                            />
                        </div>
                        <button type='submit' className='w-full font-bold  px-5 py-3 my-btn my-3 rounded-xl'>Update</button>
                    </form>
                </div>

            </div>

        </div>
    );
};

export default UpdateListing;