import {LOGIN_FAILED, LOGIN_PENDING, LOGIN_SUCCESS} from "./actionTypes";


export const loginFailed = (error) => {
    return {
        type: LOGIN_FAILED,
        error: error,
    }
}

export const loginSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS,
        user: user,
    }
}

export const loginPending = () => {
    return {
        type: LOGIN_PENDING,
    }
}