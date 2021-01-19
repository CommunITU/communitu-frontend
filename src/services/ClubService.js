/**
 *  Manages the all api requests related to clubs.
 *
 *  @created    11/29/2020
 *  @author Umut Emre Bayramoglu
 */

import {BASE_URL, CLUBS, USERS} from "../constants/ApiConfig";
import axios from "axios";
import {headersWithToken} from "./Headers";

const createNewClub = (clubData) => {
    return axios.post(BASE_URL + CLUBS, clubData, headersWithToken())
}

const getClubsNameExecutedByUser = (userId) => {
    return axios.get(BASE_URL + USERS + "/" + userId + CLUBS + "?role=executive&fields=id,name")
}


const getMyClubs = (userId) => {
    return axios.get(BASE_URL + USERS + "/" + userId + CLUBS + "?role=executive&fields=id,name,created_at&extra_fields=participant_num,event_num")
}


export const ClubService = {createNewClub, getClubsNameExecutedByUser, getMyClubs}