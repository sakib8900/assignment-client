import React, { useEffect, useState } from 'react';
import RecentCar from './RecentCar';

const RecentCars = () => {
    const [cars, setCars] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/cars')
            .then(res => res.json())
            .then(data => setCars(data.slice(0, 8)));
    }, []);
    
    return (
        <div>
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

