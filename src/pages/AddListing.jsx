import React, { use, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

const AddListing = () => {
    const { user, loading } = use(AuthContext)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ category: 'Pets', price: 0 });

    const handleCategoryChange = (e) => {
        const updatedCategory = e.target.value;
        setFormData({ category: updatedCategory, price: updatedCategory == "Pets" ? 0 : '' })
    };

    const handlePriceChange = (e) => {
        setFormData(prev => ({ ...prev, price: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        const listngFormData = {
            name: e.target.name.value,
            category: e.target.category.value,
            Price: Number(e.target.price.value),
            location: e.target.location.value,
            description: e.target.description.value,
            image: e.target.image.value,
            email: user.email,
            date: e.target.date.value

        }
        fetch('http://localhost:3000/products', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(listngFormData)
        })
            .then(res => res.json())
            .then(data => {
                toast.success("Your Product added successfully");
                navigate("/pets-supplies");
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })

    }

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <div>
            <div className="w-11/12 max-w-2xl mx-auto py-16">
                <div className="mb-10 border border-pink-200 rounded-2xl shadow-xl p-8 space-y-6">
                    <div className='text-center'>
                        <h1 className="text-3xl md:text-5xl font-bold text-pink-600 mb-4">Create Listing</h1>
                        <p className="text-md text-gray-600">Share your pet for adoption or sell pet products</p>
                    </div>

                    <form onSubmit={handleSubmit} className="">
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Pet / Product Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:outline-none"
                                placeholder="e.g. Golden Retriever Puppy or Royal Canin 4kg"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                name="category"
                                required
                                onChange={handleCategoryChange}
                                className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:outline-none"
                            >
                                <option value="Pets">Pets (Adoption - Free)</option>
                                <option value="Pet Food">Pet Food</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Pet Care Products">Pet Care Products</option>
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
                                value={formData.price}
                                onChange={handlePriceChange}
                                disabled={formData.category === "Pets"}
                                className={`w-full px-5 py-3 border-2 rounded-xl focus:outline-none ${formData.category === "Pets"
                                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                    : "border-gray-300 focus:border-pink-500"
                                    }`}
                            />
                            {formData.category === "Pets" && (
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
                                required
                                className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:outline-none"
                                placeholder="url"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Date
                            </label>
                            <input
                                type="date"
                                name="date"
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
                        <button type='submit' className='w-full font-bold  px-5 py-3 my-btn my-3 rounded-xl'>Submit</button>
                    </form>
                </div>

            </div>

        </div>
    );
};

export default AddListing;