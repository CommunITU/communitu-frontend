import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import routes from "../routes";

class MyRouter extends Component {
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