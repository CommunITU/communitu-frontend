/**
 *  Manages the all api requests related to user.
 *
 *  @created    20/01/2020
 *  @author Umut Emre Bayramoglu
 */

import {BASE_URL, USERS} from "../constants/ApiConfig";
import axios from "axios";
import {baseHeaders, headersWithToken} from "./Headers";

const getUserById = (user_id) => {
    return axios.get(BASE_URL + USERS + "/" + user_id, baseHeaders())
}

const deleteUserById = (clubId) => {
    return axios.delete(BASE_URL + USERS + "/" + clubId, baseHeaders())
}

const updateUserById = (userData) => {
    return axios.put(BASE_URL + USERS + "/" + userData.id, {user: userData}, headersWithToken())
}

export const UserService = {getUserById, deleteUserById, updateUserById}