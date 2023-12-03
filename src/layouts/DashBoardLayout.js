import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SideBar from '../components/partials/dashboard/SideBar';
import Footer from '../components/partials/dashboard/Footer';
import Header from '../components/partials/dashboard/Header';

const DashBoardLayout = ({ children }) => {

    return (
        <>
            <div className="wrapper">
                <SideBar />
                <Header />
                {/* <div className="content-page" id="content-page"> */}
                    <div class="col main pt-5 mt-3" >
                        {children}
                    </div>
                {/* </div> */}
            </div>
            <Footer />
        </>
    )

}

export default DashBoardLayout; 