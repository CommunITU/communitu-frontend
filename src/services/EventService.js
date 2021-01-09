/**
 *  Manages the all api requests related to events.
 *
 *  @created    12/22/2020
 *  @author Umut Emre Bayramoglu
 */

import axios from "axios";
import {BASE_URL, EVENTS} from "../constants/ApiConfig";
import {baseHeaders, headersWithToken} from "./Headers";

const fetchEvents = (loadSize, page) => {
    return axios.get(BASE_URL + EVENTS + `?page=${page}&size=${loadSize}`, baseHeaders())
}

const createNewEvent = (event_data) => {
    return axios.post(BASE_URL + EVENTS, {event_data}, headersWithToken())
}

export const EventService = {fetchEvents, createNewEvent}