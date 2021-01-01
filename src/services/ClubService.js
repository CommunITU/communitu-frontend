/**
 *  Manages the all api requests related to clubs.
 *
 *  @created    11/29/2020
 *  @author Umut Emre Bayramoglu
 */

import {BASE_URL, CLUBS} from "../constants/ApiConfig";
import axios from "axios";
import {headersWithToken} from "./Headers";

const createNewClub = (clubData) => {
    return axios.post(BASE_URL + CLUBS, clubData, headersWithToken())
}

export const ClubService = {createNewClub}