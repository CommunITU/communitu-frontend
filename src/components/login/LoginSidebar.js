import React, { Component } from 'react';
import {Col} from "shards-react";
import classNames from "classnames";


export class LoginSidebar extends Component {

    render() {
        const classes = classNames(
            "login-side-panel",
            "col-md-4",
            "col-lg-4"
        );

        return (
            <Col
                className={classes}
            >
            </Col>
        );
    }
}

export default LoginSidebar;
