import React, { use, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import ListingCard from '../components/ListingCard';
import { AuthContext } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const PetsSupplies = () => {
    const data = useLoaderData()
    console.log(data)

    const [search, setSeach] = useState('')
    const [category, setCategory] = useState('');

    const { loading } = use(AuthContext)

    
    useEffect(() => {
        if (search) {
            // setSearchLoading(true);
            const timer = setTimeout(() => {
                // setSearchLoading(false);
            }, 500);
            return () => clearTimeout(timer);
        } else {
            // setSearchLoading(false)
        }
    }, [search]);
    if ( loading ) {
       return <LoadingSpinner></LoadingSpinner>
    };

    const term = search.trim().toLocaleLowerCase()
    const filteredData = data.filter(product => {
        const matchSearch = product.name?.toLocaleLowerCase().includes(term);
        const matchCategory = category === '' ? true : product.category === category;
        return matchCategory && matchSearch;
    })

    return (
        <div className='w-11/12 mx-auto'>
            <div className=" text-center my-8">
                <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-4">
                    Pets & Supplies
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Find your forever friend or everything they need — all in one place
                </p>
            </div>
            <div>
                <div className='flex flex-col md:flex-row gap-4 justify-between'>
                    <h1 className='font-bold text-2xl md:text-5xl text-pink-600'>All Items :</h1>
                    <div className='flex gap-2.5'>
                        <select
                            className="select select-bordered border-pink-200"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            <option value="Pets">Pets</option>
                            <option value="Pet Food">Food</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Pet Care Products">Pet Care Products</option>
                        </select>

                        <label className="input border border-pink-200">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input type="search" value={search} onChange={(e) => setSeach(e.target.value)} required placeholder="Search" />
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-[40px]">
                    {
                        filteredData.map(product => <ListingCard key={product._id} product={product} />)
                    }
                </div>

            </div>
        </div>
    );
};

export default PetsSupplies;