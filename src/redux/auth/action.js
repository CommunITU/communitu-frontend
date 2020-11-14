import {AuthService} from "../../services/AuthService";
import {loginFailed, loginPending, loginSuccess} from "./actionCreators";


export const login = (user_info) => dispatch => {
    const {email, pass} = user_info
    dispatch(loginPending())
    AuthService.login(email, pass)
        .then(resp => {
            if (resp.data) {
                dispatch(loginSuccess())
            } else {
                dispatch(loginFailed())
            }
        })
        .catch(error => {
            dispatch(loginFailed())
        });
}