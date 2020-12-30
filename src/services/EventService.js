/**
 *  Manages the all api requests related to events.
 *
 *  @created    12/22/2020
 *  @author Umut Emre Bayramoglu
 */

import axios from "axios";
import {BASE_URL, EVENTS} from "../util/constants/ApiConfig";
import {baseHeaders} from "./Headers";

const fetchEvents = (loadSize, page) => {
    return axios.get(BASE_URL + EVENTS + `?page=${page}&size=${loadSize}`, baseHeaders())
}

export const EventService = {fetchEvents}