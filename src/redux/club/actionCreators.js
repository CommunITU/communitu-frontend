import {CLUB_CREATED_FAILED, CLUB_CREATED_PENDING, CLUB_CREATED_SUCCESS} from "./actionTypes";


export const clubCreatedFailed = (errors) => {
    return {
        type: CLUB_CREATED_FAILED,
        errors: errors,
    }
}

export const clubCreatedSuccess = (success) => {
    return {
        type: CLUB_CREATED_SUCCESS,
        success: success
    }
}

export const clubCreatedPending = () => {
    return {
        type: CLUB_CREATED_PENDING,
    }
}