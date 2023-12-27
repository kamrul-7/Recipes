// PrivateRoute.js
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './pages/AuthProvider';

const PrivateRoute = ({ element }) => {
    const { user } = useContext(AuthContext);

    return user ? (
        <Route element={element} />
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;
