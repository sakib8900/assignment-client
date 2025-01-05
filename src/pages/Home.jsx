import React from 'react';
import Banner from './Banner';
import Banner2 from './Banner2';
import RecentCars from './cars/RecentCars';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Banner2></Banner2>
            <RecentCars></RecentCars>
        </div>
    );
};

export default Home;