import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext/AuthContext';
import Loading from './Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loading />;
    }

    if (user && user?.email) {
        return children;
    }

    return <Navigate state={{ from: location.pathname }} to="/login" />;
};

export default PrivateRoute;
