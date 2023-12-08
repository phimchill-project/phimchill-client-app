import React from 'react';
import Footer from '../components/partials/dashboard/Footer';
import Header from '../components/partials/dashboard/Header';

const DashBoardLayout = ({ children }) => {

    return (
        <>
            <div className="wrapper">
                <Header />
                <div className="col main pt-5 mt-3" >
                    {children}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default DashBoardLayout; 