import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import SideBar from '../components/partials/dashboard/SideBar';
import Footer from '../components/partials/dashboard/Footer';
import Header from '../components/partials/dashboard/Header';


const DashBoardLayout = ({children}) => {
    return (
        <>

                <div className="wrapper">
                    <SideBar />

                </div>
                <Footer/>

        </>
    )
}

export default DashBoardLayout;