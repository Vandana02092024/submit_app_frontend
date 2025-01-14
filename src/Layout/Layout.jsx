import Sidebar from "../includes/sidebar";
import Header from "../includes/header";
import React, { useState } from 'react';

export const Layout = (props) => {

  const [headerTitle, setHeaderTitle] = useState('');
    const {children} = props    

    return(
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <Sidebar setHeaderTitle={setHeaderTitle} sidebar={true}/>
                <div className="layout-page bg-white">
                    <div className="content-wrapper">
                    <Header headerTitle={headerTitle}/>
                    {children}
                    </div>
                </div>
            </div>
        </div>
    );
}