import {AuthService} from "../../services/AuthService";
import {loginFailed, loginPending, loginSuccess} from "./actionCreators";


export const login = (user_info) => dispatch => {
    const {email, pass} = user_info
    dispatch(loginPending())
    AuthService.login(email, pass)
        .then(resp => {
            if (resp.data) {
                const {user, token} = resp.data
                dispatch(loginSuccess(user))
                AuthService.saveJwtToken(token)
            } else {
                dispatch(loginFailed())
            }
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                dispatch(loginFailed(error.response.data.message))
            } else {
                console.log(error)
                dispatch(loginFailed(error))
            }
        });
}

export const loginWithToken = () => dispatch => {

    if (!AuthService.hasJwtToken())
        return;

    dispatch(loginPending())
    const token = AuthService.getJwtToken();
    AuthService.loginWithToken(token)
        .then(resp => {
            if (resp.data) {
                const {user} = resp.data
                dispatch(loginSuccess(user))
            } else {
                dispatch(loginFailed())
            }
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                console.log(error.response.data.message)
                dispatch(loginFailed(error.response.data.message))
            } else {
                console.log(error)
                dispatch(loginFailed(error))
            }
        });
}

export const logout = () => dispatch => {

    if (!AuthService.hasJwtToken())
        return;

    dispatch(loginPending())
}