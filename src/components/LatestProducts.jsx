
import { useEffect, useState } from 'react';
import axios from 'axios';
import RotatingCardCarousel from './RotatingCardCarousel';
import { Link } from 'react-router';

const LatestProducts = () => {
    const [latest, setLatest] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/latest-products')
            .then(res => {
                setLatest(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-6xl font-bold text-pink-600">
                    Featured Pets & Products
                </h2>
                <p className="mt-4 text-xl  md:text-2xl">
                    Watch our latest additions in stunning 3D
                </p>
            </div>
            <RotatingCardCarousel products={latest} />
            <div className='text-center md:mt-40'>
                <Link
                    to="/pets-supplies"
                    className="inline-block px-15 py-4 md:px-20 md:py-4 my-btn font-bold md:text-lg rounded-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                    <button>See All</button>
                </Link>
            </div>
        </div>
    );
};

export default LatestProducts;