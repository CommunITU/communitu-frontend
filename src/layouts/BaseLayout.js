import React from 'react';
import Navbar from "../components/navbar/Navbar";

/**
 *  Base layout that contains common elements such as navbar, foobar etc.,
 *  @see Check the {@link routes} to understand the layouts better.
 *  @param children     Content of the page
 *
 *  @created    10/25/2020
 *  @author Umut Emre Bayramoglu
 */
const BaseLayout = ({ children }) => (

    <div>
                {/*IMPORT NAVBAR*/}
                <Navbar />

                {/*IMPORT PAGE CONTENT*/}
                {children}
    </div>
);

export default BaseLayout;
