import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import HeaderStyle1 from '../components/partials/ui/headerstyle/headerstyle1';
import FooterStyle from '../components/partials/ui/footerstyle/footerstyle'
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import '../assets/ui/css/bootstrap.min.css'
// import '../assets/ui/css/typography.css'
// import '../assets/ui/css/style.css'
// import '../assets/ui/css/responsive.css'

const DefaultLayout = ({ children }) => {
    const backToTop = document.getElementById("back-to-top")
    if (backToTop !== null && backToTop !== undefined) {
        document.getElementById("back-to-top").classList.add('animated', 'fadeOut')
        window.addEventListener('scroll', (e) => {
            if (document.documentElement.scrollTop > 50) {
                document.getElementById("back-to-top").classList.remove("fadeOut")
                document.getElementById("back-to-top").classList.add("fadeIn")
            } else {
                document.getElementById("back-to-top").classList.remove("fadeIn")
                document.getElementById("back-to-top").classList.add("fadeOut")
            }
        })
        document.querySelector('#top').addEventListener('click', (e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
    }
    return (
        <>
            <HeaderStyle1 />
            <div id="back-to-top">
                <Link className="top" to="#" id="top"> <i className="fa fa-angle-up"></i></Link>
            </div>
            <div className="wraper" style={{top : 100}}>
                <div className="content-page" id="content-page" >
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
            <br />
            <FooterStyle />
        </>
    )
}


export default DefaultLayout;