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

const getEventById = (eventId) => {
    return axios.get(BASE_URL + EVENTS + `/${eventId}`, baseHeaders())
}

const createNewEvent = (event_data) => {
    return axios.post(BASE_URL + EVENTS, {event_data}, headersWithToken())
}

const getParticipationStatus = (eventId, userId) => {
    return axios.get(BASE_URL + EVENTS + `/${eventId}/participants/${userId}`, headersWithToken())
}

const participateToEvent = (eventId) => {
    return axios.post(BASE_URL + EVENTS + `/${eventId}/participants`, {}, headersWithToken())
}

const cancelParticipationToEvent = (eventId) => {
    return axios.delete(BASE_URL + EVENTS + `/${eventId}/participants`, headersWithToken())
}

const getRegistrationQuestions = (eventId) => {
    return axios.get(BASE_URL + EVENTS + `/${eventId}/reg_questions`, headersWithToken())
}

export const EventService = {
    fetchEvents,
    getEventById,
    createNewEvent,
    cancelParticipationToEvent,
    participateToEvent,
    getParticipationStatus,
    getRegistrationQuestions
}