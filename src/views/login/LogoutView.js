import React from 'react';
import {AuthService} from "../../services/AuthService";
import {useHistory, withRouter} from "react-router";
import {connect} from "react-redux";
import {logout} from "../../redux/auth/action";

export const LogoutView = () => {
    const history = useHistory();
    AuthService.logout()
    return (
        <div>
            <h3 className="text-dark text-center">Logging out...</h3>
            {history.push("/")}
            {logout()}
        </div>
    );
}

export default withRouter(connect(null,logout())(LogoutView))