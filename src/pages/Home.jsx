import React from 'react';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import WhyAdoptPawMart from '../components/WhyAdoptPawMart';
import MeetOurPetHeroes from '../components/MeetOurPetHeroes';

const Home = () => {
    return (
        <div className='mx-auto'>
            <Banner></Banner>
            <Categories></Categories>
            <WhyAdoptPawMart/>
            <MeetOurPetHeroes/>
        </div>
    );
};

export default Home;