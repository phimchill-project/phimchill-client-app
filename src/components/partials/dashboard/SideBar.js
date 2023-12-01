import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Accordion } from 'react-bootstrap'
import Scrollbar from 'smooth-scrollbar'
import logo from '../../../assets/ui/images/logo.png'
const minisidbar = () => {
  document.body.classList.toggle('sidebar-main')
}

const SideBar = () => {
  const [activeMenu, setActiveMenu] = useState(false)
  //   const[activesubMenu,setSubmenu] = useState(false)
  //   const[activesubMenu1,setSubmenu1] = useState(false)
  //Collapse state
  useEffect(
    () => {
      Scrollbar.init(document.querySelector('#sidebar-scrollbar'))
    }
  )
  return (
    <div className="" style={{marginTop : 100, fontSize : 30}}>
      <div className="">
        {/* <Link to="/" className="header-logo">
          <img src={logo} className="img-fluid rounded-normal" alt="" />
          <div className="logo-title">
            <span className="text-primary text-uppercase">Streamit</span>
          </div>
        </Link> */}
        {/* <div className="iq-menu-bt-sidebar">
          <div className="iq-menu-bt align-self-center">
            <div className="wrapper-menu" onClick={minisidbar}>
              <div className="main-circle"><i className="las la-bars"></i></div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="data-scrollbar" data-scroll="1" id="sidebar-scrollbar">
        <nav className="iq-sidebar-menu">
          <div  id="iq-sidebar-toggle" className="iq-menu" style={{width : 200}}>
            <li className='active' style={{listStyleType : 'none', marginLeft: 70, borderStyle: 'outset'}}>
              <Link to="/" className="text-primary">
                <i className="ri-arrow-right-line"></i>
                <span>Visit site</span>
              </Link>
            </li>
            <li className='active' style={{listStyleType : 'none', marginLeft: 70}}>
              <Link to="/" className="iq-waves-effect">
                <i className="las la-home iq-arrow-left"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li className='active' style={{listStyleType : 'none', marginLeft: 70}}>
              <Link to="/rating" className="iq-waves-effect">
                <i className="las la-star-half-alt"></i>
                <span>Rating </span>
              </Link>
            </li>
            <li className='active' style={{listStyleType : 'none', marginLeft: 70}}>
              <Link to="/comment" className="iq-waves-effect">
                <i className="las la-comments"></i>
                <span>Comment</span>
              </Link>
            </li>

          </div>
        </nav>
      </div>
    </div>
    // <div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" >
    //   <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
    //     <li class="nav-item mb-2 mt-3"><a class="nav-link text-secondary" href="#"><h5>Jacob Nejam</h5></a></li>
    //     <li class="nav-item mb-2 "><a class="nav-link text-secondary" href="#"><i class="fas fa-user font-weight-bold"></i> <span className="ml-3">Overview</span></a></li>
    //     <li class="nav-item mb-2">
    //       <a class="nav-link text-secondary" href="#submenu1" data-toggle="collapse" data-target="#submenu1"><i class="far fa-file-word font-weight-bold"></i> <span className="ml-3"> Reports▾</span></a>
    //       <ul class="list-unstyled flex-column pl-3 collapse" id="submenu1" aria-expanded="false">
    //         <li class="nav-item mb-2 "><a class="nav-link text-secondary" href=""><i class="fas fa-book-reader"></i> Data Report </a></li>
    //         <li class="nav-item mb-2 "><a class="nav-link text-secondary" href=""> <i class="fas fa-book-medical"></i> File Report </a></li>
    //       </ul>
    //     </li>
    //     <li class="nav-item mb-2"><a class="nav-link text-secondary" href="#"><i class="far fa-chart-bar font-weight-bold"></i> <span className="ml-3">Analytics</span></a></li>
    //     <li class="nav-item mb-2"><a class="nav-link text-secondary" href="#"><i class="fas fa-file-export font-weight-bold"></i><span className="ml-3">Export</span></a></li>
    //     <li class="nav-item mb-2"><a class="nav-link text-secondary" href="#"><i class="fas fa-tablet-alt font-weight-bold"></i><span className="ml-3">Snippets</span></a></li>
    //     <li class="nav-item mb-2"><a class="nav-link text-secondary" href="#"><i class="fas fa-atom font-weight-bold"></i> <span className="ml-3">Flex</span></a></li>
    //     <li class="nav-item mb-2"><a class="nav-link text-secondary" href="#"><i class="far fa-folder font-weight-bold"></i> <span className="ml-3">Layouts</span></a></li>
    //     <li class="nav-item mb-2"><a class="nav-link text-secondary" href="#">Templates</a></li>
    //     <li class="nav-item mb-2"><a class="nav-link text-secondary" href="#">Themes</a></li>
    //   </ul>
    // </div>
  )
}

export default SideBar;
