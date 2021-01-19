import React from 'react';
import {useHistory, withRouter} from "react-router";
import {connect} from "react-redux";
import {logout} from "../../redux/auth/action";

export const LogoutView = (props) => {
    const history = useHistory();

    return (
        <div>
            <h3 className="text-dark text-center">Logging out...</h3>
            {history.push("/")}
            {props.logout && props.logout()}
        </div>
    );
}

export default withRouter(connect(null,logout)(LogoutView))