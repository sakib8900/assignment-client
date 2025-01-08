import React, { useEffect, useState } from 'react';
import RecentCar from './RecentCar';
import Loading from '../../utilitis/Loading';

const RecentCars = () => {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://assignment-11-server-one-lemon.vercel.app/cars')
            .then(res => res.json())
            .then(data => {
                setCars(data.slice(0, 8))
                setLoading(false)
            });
    }, []);
    if (loading) {
        return <Loading></Loading>
      }
    return (
        <div>
            <h2 className="text-3xl font-bold text-center mb-12">Recent Cars !</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    cars.map(car => <RecentCar key={car._id} car={car}></RecentCar>)
                }
            </div>
        </div>
    );
};

export default RecentCars;

// Model
// Price Per Day
// Availability
// Features
// Images
// Description

