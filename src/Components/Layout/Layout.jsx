import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router';

const Layout = () => {
    return (
        <div>
            <h1 className='text-3xl'>This is Layout</h1>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;