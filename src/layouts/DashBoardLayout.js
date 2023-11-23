import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import SideBar from '../components/partials/dashboard/SideBar';
import Footer from '../components/partials/dashboard/Footer';
import Header from '../components/partials/dashboard/Header';

const DashBoardLayout = ({children}) => {
    return (
        <>
            <SideBar/>
            <Header/>
            <div className="wrapper">
                <div className="content-page" id="content-page">
                    <TransitionGroup>
                        <CSSTransition
                            classNames="fade"
                            timeout={300}
                        >
                            {children}
                        </CSSTransition>
                    </TransitionGroup>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default DashBoardLayout;