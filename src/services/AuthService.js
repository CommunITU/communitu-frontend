import axios from "axios";
import {BASE_URL, LOGIN} from "../util/constants/ApiConfig";

/**
 *  Manages the all api requests associated with authentication.
 *
 *  @created    11/14/2020
 *  @author Umut Emre Bayramoglu
 */


export const login = (email, pass) => {
    return axios.post(BASE_URL + LOGIN, {email: email, password: pass})
}


export const AuthService = {login};
