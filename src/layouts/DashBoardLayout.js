import React from 'react';
import Sidebar from '../components/partials/dashboard/SideBar';
import Footer from '../components/partials/dashboard/Footer';
import Header from '../components/partials/dashboard/Header';

import '../assets/css/bootstrap.min.css'

const DashBoardLayout = ({ children }) => {
    return (
        <>
            <div className="wrapper">
                {/* <Sidebar /> */}
                {/* <Header /> */}
                <div className="content-page" id="content-page">
                    {children}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default DashBoardLayout;