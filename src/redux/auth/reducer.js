import {LOGIN_FAILED, LOGIN_PENDING, LOGIN_SUCCESS} from "./actionTypes";

const initialState = {
    pending: false,
    user: null,
    error: null,
    isLoggedIn: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_FAILED:
            return {
                ...state,
                pending: false,
                error: action.error,
                isLoggedIn: false
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                pending: false,
                user: action.user,
                isLoggedIn: true,
            }

        case LOGIN_PENDING:
            return {
                ...state,
                pending: true,
                isLoggedIn: false
            }
        default:
            return state;

    }
}