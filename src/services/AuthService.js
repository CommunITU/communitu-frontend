import axios from "axios";
import {BASE_URL, LOGIN, LOGIN_WITH_TOKEN, REGISTER} from "../constants/ApiConfig";
import {headersWithToken} from "./Headers";

/**
 *  Manages the all api requests associated with authentication.
 *
 *  @created    11/14/2020
 *  @author Umut Emre Bayramoglu
 */


const login = (email, pass) => {
    return axios.post(BASE_URL + LOGIN, {email: email, password: pass})
}

const register = (userData) => {
    return axios.post(BASE_URL + REGISTER,  userData)
}

const loginWithToken = () => {
    return axios.post(BASE_URL + LOGIN_WITH_TOKEN, {}, headersWithToken())
}

const logout = () => {
    localStorage.removeItem('login_token');

};

const saveJwtToken = (token) => {
    localStorage.setItem('login_token', token);
}

const getJwtToken = () => {
    return localStorage.getItem('login_token');
}

const hasJwtToken = () => {
    let jwt = localStorage.getItem('login_token');
    if (jwt != null)
        return true
    else return false
}


export const AuthService = {login, register, logout, loginWithToken, saveJwtToken, getJwtToken, hasJwtToken};
