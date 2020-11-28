/**
 *  Manages the all api requests related to clubs.
 *
 *  @created    11/29/2020
 *  @author Umut Emre Bayramoglu
 */

import {BASE_URL, CLUBS} from "../util/constants/ApiConfig";
import {headersWithToken} from "./AuthService";
import axios from "axios";

const createNewClubReq = (clubData) => {
    return axios.post(BASE_URL + CLUBS, clubData, headersWithToken())
}

export const ClubService = {createNewClubReq}