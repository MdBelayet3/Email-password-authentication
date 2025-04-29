import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router';

const Layout = () => {
    return (
        <div className='w-2/3 mx-auto'>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;