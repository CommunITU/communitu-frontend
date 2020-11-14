import React, {PureComponent} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import routes from "../routes";

/**
 *  Handle routing for the routes specified in {@link routes}
 *
 *  @created    10/25/2020
 *  @author Umut Emre Bayramoglu
 */
class MyRouter extends PureComponent {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    {
                        routes.map((route,
                                    index) => {
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    component={() => {
                                        return (
                                            <route.layout>
                                                <route.component/>
                                            </route.layout>
                                        );
                                    }}
                                >
                                </Route>

                            )
                        })
                    }
                </Switch>
            </BrowserRouter>
        );
    }
}

export default MyRouter;