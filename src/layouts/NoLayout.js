import React from 'react';
import routes from "../routes";

/**
 *  No layout, means does not contain common elements with other pages such as navbar, footer.
 *  Shows the only children page (content of page).
 *  @see Check the {@link routes} to understand the layouts better.
 *  @param children     Content of the page
 *
 *  @created    11/12/2020
 *  @author Umut Emre Bayramoglu
 */
const NoLayout = ({ children }) => (

    <div>
        {/*IMPORT PAGE CONTENT*/}
        {children}
    </div>
);

export default NoLayout;
