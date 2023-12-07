import React from 'react';
import Footer from '../components/partials/dashboard/Footer';
import Header from '../components/partials/dashboard/Header';

const DashBoardLayout = ({ children }) => {

    return (
        <>
            <div className="wrapper">
<<<<<<< HEAD
                <SideBar />
                {/*<Header />*/}
                {/* <div className="content-page" id="content-page"> */}
                    <div class="col main pt-5 mt-3" >
                        {children}
                    </div>
                {/* </div> */}
=======
                <Header />
                <div className="col main pt-5 mt-3" >
                    {children}
                </div>
>>>>>>> 687a795232bdf880cade65b0a58f36616cb3cd61
            </div>
            <Footer />
        </>
    )
}

export default DashBoardLayout; 