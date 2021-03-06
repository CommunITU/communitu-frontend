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

const updateEventById = (eventData) => {
    return axios.put(BASE_URL + EVENTS + `/${eventData.id}`,{event: eventData}, headersWithToken())
}

const deleteEventById = (eventId) => {
    return axios.delete(BASE_URL + EVENTS + `/${eventId}`, headersWithToken())
}

const createNewEvent = (event_data) => {
    return axios.post(BASE_URL + EVENTS, {event_data}, headersWithToken())
}

const getParticipationStatus = (eventId, userId) => {
    return axios.get(BASE_URL + EVENTS + `/${eventId}/participants/${userId}`, headersWithToken())
}

const participateToEvent = (eventId, userResponses) => {
    return axios.post(BASE_URL + EVENTS + `/${eventId}/participants`, {user_responses: userResponses}, headersWithToken())
}

const getEventParticipants = (eventId, returnParams) => {
    let returnParamsStatement = returnParams.join(",")
    return axios.get(BASE_URL + EVENTS + `/${eventId}/participants?return_params=${returnParamsStatement}`, baseHeaders())
}

const cancelParticipationToEvent = (eventId) => {
    return axios.delete(BASE_URL + EVENTS + `/${eventId}/participants`, headersWithToken())
}

const getRegistrationQuestions = (eventId) => {
    return axios.get(BASE_URL + EVENTS + `/${eventId}/reg_questions`, headersWithToken())
}

const getAllEventCommentsById = (eventId) => {
    return axios.get(BASE_URL + EVENTS + `/${eventId}/comments`, baseHeaders())
}

const addEventComment = (comment, eventId) => {
    return axios.post(BASE_URL + EVENTS + `/${eventId}/comments`, {comment: comment}, headersWithToken())
}

export const EventService = {
    fetchEvents,
    getEventById,
    updateEventById,
    deleteEventById,
    createNewEvent,
    cancelParticipationToEvent,
    participateToEvent,
    getParticipationStatus,
    getRegistrationQuestions,
    getAllEventCommentsById,
    addEventComment,
    getEventParticipants,

}