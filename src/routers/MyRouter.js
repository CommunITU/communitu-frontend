import React, {PureComponent} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import routes from "../routes";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {loginWithToken} from "../redux/auth/action";


/**
 *  Handle routing for the routes specified in {@link routes}
 *
 *  @created    10/25/2020
 *  @author Umut Emre Bayramoglu
 */
class MyRouter extends PureComponent {
    render() {
        this.props.loginWithToken();

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

const actionCreators = {
    loginWithToken: loginWithToken
}

export default withRouter(connect(null,actionCreators)(MyRouter));
