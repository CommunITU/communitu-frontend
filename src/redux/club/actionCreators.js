import {CLUB_CREATED_FAILED, CLUB_CREATED_PENDING, CLUB_CREATED_SUCCESS} from "./actionTypes";


export const clubCreatedFailed = (error) => {
    return {
        type: CLUB_CREATED_FAILED,
        error: error,
    }
}

export const clubCreatedSuccess = () => {
    return {
        type: CLUB_CREATED_SUCCESS,
    }
}

export const clubCreatedPending = () => {
    return {
        type: CLUB_CREATED_PENDING,
    }
}