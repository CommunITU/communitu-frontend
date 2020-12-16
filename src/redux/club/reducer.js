import {CLUB_CREATED_FAILED, CLUB_CREATED_SUCCESS, CLUB_CREATED_PENDING} from "./actionTypes";

const initialState = {
    pending: false,
    errors: [],
    success:null,
}

export const clubCreateReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLUB_CREATED_FAILED:
            return {
                pending: false,
                errors: action.errors,
                successMessage: null,
            }

        case CLUB_CREATED_SUCCESS:
            return {
                pending: false,
                success: action.success,
                errors: []
            }

        case CLUB_CREATED_PENDING:
            return {
                errors: [],
                successMessage: null,
                pending: true
            }
        default:
            return state;

    }
}