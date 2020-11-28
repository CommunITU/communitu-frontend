import {AuthService} from "../../services/AuthService";
import {clubCreatedFailed, clubCreatedPending, clubCreatedSuccess} from "./actionCreators";

export const createNewClub = () => dispatch => {
    dispatch(clubCreatedPending())
    const token = AuthService.getJwtToken();
    AuthService.loginWithToken(token)
        .then(resp => {
            if (resp.data) {
                dispatch(clubCreatedSuccess())
            } else {
                dispatch(clubCreatedFailed())
            }
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.message)
                dispatch(clubCreatedFailed(error.response.data.message))
            else
                dispatch(clubCreatedFailed(error))
        });
}