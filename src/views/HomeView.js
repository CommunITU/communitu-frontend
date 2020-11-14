import React, {PureComponent} from 'react';
import Header from "../components/home_page/Header";
import Events from "../components/home_page/Events";

/**
 *  Home page of the application.
 *
 *  @created    10/25/2020
 *  @author Umut Emre Bayramoglu
 */

class HomeView extends PureComponent {
    render() {
        return (
            <div>
                <Header />
                <Events />
            </div>
        );
    }
}

export default HomeView;