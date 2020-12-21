import React from 'react';
import {AuthService} from "../../services/AuthService";

export const LogoutView = () => {
    AuthService.logout()
    return (
        <div></div>
    );
}

export default LogoutView;