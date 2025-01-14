import React from "react";
import { useState,useEffect } from 'react';
import { Link, useLocation ,useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';
import { showInfoAlert, showWarningAlert } from "../utils/Sweetalert";

export default function Sidebar({setHeaderTitle}) {
    const location = useLocation();
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState("");

    useEffect(() => {
        setActivePage(location.pathname);  
        const pageTitle = location.pathname === '/dashboard' ? 'Dashboard' : 
        location.pathname === '/users' ? 'Users' : 
        location.pathname === '/surveys' ? 'Surveys' : 
        location.pathname === '/questions' ? 'Questions' : ''
          setHeaderTitle(pageTitle); 
    }, [location.pathname, setHeaderTitle]);

    const handleLogout = (event) => {
        event.preventDefault();
        showWarningAlert('You want to logout?', 'Yes, logout!')
          .then((result) => {
            if (result.isConfirmed) {
              showInfoAlert('Logging out') .then(() => {
                    localStorage.removeItem('isAuthenticated');
                    navigate('/');
                });
              };
          })
      };
      

    return(
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme sidebar_shadow" data-bg-className="bg-menu-theme">
            <div className="app-brand demo">
                <a href="dashboard.php" className="app-brand-link">
                    <span className="app-brand-logo demo">
                        <img src="assets/img/submitt-logo.png" alt="" height="50px" style={{width: "180px"}}/>
                    </span>
                </a>

                <a href="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto d-xl-none">
                    <i className="bx bx-chevron-left bx-sm align-middle"></i>
                </a>
            </div>

            <div className="menu-inner-shadow" style={{display: "none"}}></div>

            <ul className="menu-inner py-1 ps ps--active-y">

                <li className="menu-header small text-uppercase"><span className="menu-header-text">Menu</span></li>

                <li className={`menu-item  ${activePage === '/dashboard' ? 'active' : ''}`}>
                    <Link 
                        className={`menu-link  ${activePage === '/dashboard' ? 'active' : ''}`}
                        to="/dashboard"
                        >
                        <i className="menu-icon tf-icons bx bx-home-circle"></i>
                        <div>Dashboard</div>
                    </Link>
                </li>
                <li className={`menu-item  ${activePage === '/users' ? 'active' : ''}`}>
                    <Link 
                        className={`menu-link  ${activePage === '/users' ? 'active' : ''}`}
                        to="/users"
                        >
                        <i className="menu-icon tf-icons bi bi-people"></i>
                        <div>Users</div>
                    </Link>
                </li>
                <li  className={`menu-item  ${activePage === '/surveys' ? 'active' : ''}`}>
                    <Link 
                        className={`menu-link  ${activePage === '/surveys' ? 'active' : ''}`}
                        to="/surveys"
                        >
                        <i className="menu-icon tf-icons bi bi-bullseye"></i>
                        <div>Surveys</div>
                    </Link>
                </li>
                <li  className={`menu-item  ${activePage === '/questions' ? 'active' : ''}`}>
                    <Link 
                        className={`menu-link  ${activePage === '/questions' ? 'active' : ''}`}
                        to="/questions"
                        >
                        <i className="menu-icon tf-icons bi bi-bullseye"></i>
                        <div>Questions</div>
                    </Link>
                </li>
                <li className="menu-header small text-uppercase">
                    <span className="menu-header-text">Account</span>
                </li>
                <li  className={`menu-item  ${activePage === '/accountSettings' ? 'active' : ''}`}>
                    <Link 
                        className={`dropdown-item  ${activePage === '/accountSettings' ? 'active' : ''}`}
                        to="/accountSettings"
                        >
                        <i className="bx bx-cog me-2"></i>
                        <span className="align-middle me-2">Settings</span>
                        <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                    </Link>
                </li>
                <li className="menu-item">
                    <Link className={`dropdown-item ${activePage === '/login' ? 'active' : ''}`} to="/"  onClick={handleLogout }>
                        <i className="bx bx-power-off me-2"></i>
                        <span className="align-middle">Log Out</span>
                    </Link>
                </li>
                <div className="ps__rail-x" style={{left: "0px" ,bottom: "0px"}}>
                    <div className="ps__thumb-x" tabindex="0" style={{left: "0px" ,width: "0px"}}>
                    </div>
                </div>
                <div className="ps__rail-y" style={{top: "0px" ,height: "91px" ,right: "3px"}}>
                    <div className="ps__thumb-y" tabindex="0" style={{top: "0px;", height: "29px"}}>
                    </div>
                </div>
            </ul>
        </aside>
    )
}