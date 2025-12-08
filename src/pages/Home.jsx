import React from 'react';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import WhyAdoptPawMart from '../components/WhyAdoptPawMart';
import MeetOurPetHeroes from '../components/MeetOurPetHeroes';
import LatestProducts from '../components/LatestProducts';
import { Helmet } from "react-helmet-async";


const Home = () => {
    return (
        <div className='mx-auto'>
            <Helmet>
                <title>Home | PawMart</title>
            </Helmet>
            <Banner></Banner>
            <Categories></Categories>
            <LatestProducts></LatestProducts>
            <WhyAdoptPawMart />
            <MeetOurPetHeroes />
        </div>
    );
};

export default Home;