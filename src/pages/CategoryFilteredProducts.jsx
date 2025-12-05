import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router';
import ListingCard from '../components/ListingCard';

const CategoryFilteredProducts = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/category-products/${category}`)
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [category]);

    return (

        <div className='w-11/13 mx-auto'>
            <div className=" text-center my-8">
                <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-4">
                    {category}
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Browse all {category} products available for adoption or purchase.
                </p>
            </div>
            <div className='flex justify-between'>
            <h1 className='font-bold text-2xl md:text-5xl text-pink-600'>All Items : {products.length}</h1>
                <Link to={'/'} className=" text-pink-600 hover:text-pink-700 font-semibold flex items-center gap-2 text-lg">
                    ← Back to Home
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
                {products.length > 0 ? (
                    products.map(product => (
                        <ListingCard key={product._id} product={product} />
                    ))
                ) : (
                    <p className="text-center col-span-3">No products found</p>
                )}
            </div>
        </div>
    );
};

export default CategoryFilteredProducts;
