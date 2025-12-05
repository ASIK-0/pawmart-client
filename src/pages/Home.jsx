import React from 'react';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import WhyAdoptPawMart from '../components/WhyAdoptPawMart';
import MeetOurPetHeroes from '../components/MeetOurPetHeroes';
import LatestProducts from '../components/LatestProducts';

const Home = () => {
    return (
        <div className='mx-auto'>
            <Banner></Banner>
            <Categories></Categories>
            <LatestProducts></LatestProducts>
            <WhyAdoptPawMart/>
            <MeetOurPetHeroes/>
        </div>
    );
};

export default Home;