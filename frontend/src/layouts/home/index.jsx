import HomeView from './HomeView';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const HomeRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeView />} />
        </Routes>
    );
};

export default HomeRoutes;