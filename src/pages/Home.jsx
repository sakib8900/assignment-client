import React from 'react';
import Banner from './Banner';
import Banner2 from './Banner2';
import RecentCars from './cars/RecentCars';
import ClientReview from './cars/clientReview';
import SpecialOffers from './cars/SpecialOffers';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Rent A Car || Home</title>
            </Helmet>
            <Banner></Banner>
            <Banner2></Banner2>
            <RecentCars></RecentCars>
            <ClientReview></ClientReview>
            <SpecialOffers></SpecialOffers>
        </div>
    );
};

export default Home;