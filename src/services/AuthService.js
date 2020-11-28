import axios from "axios";
import {BASE_URL, LOGIN, LOGIN_WITH_TOKEN} from "../util/constants/ApiConfig";

/**
 *  Manages the all api requests associated with authentication.
 *
 *  @created    11/14/2020
 *  @author Umut Emre Bayramoglu
 */


const login = (email, pass) => {
    return axios.post(BASE_URL + LOGIN, {email: email, password: pass})
}

const loginWithToken = () => {
    return axios.post(BASE_URL + LOGIN_WITH_TOKEN, {}, headersWithToken())
}

const saveJwtToken = (token) => {
    localStorage.setItem('login_token', token);
}

const getJwtToken = () => {
    return localStorage.getItem('login_token');
}

export const headersWithToken = () => {
    const token = AuthService.getJwtToken();
    return {
        headers: {
            "Authorization": `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
}

export const AuthService = {login, loginWithToken, saveJwtToken, getJwtToken};
