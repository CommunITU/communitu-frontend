import {clubCreatedFailed, clubCreatedPending, clubCreatedSuccess} from "./actionCreators";
import {ClubService} from "../../services/ClubService";

export const createNewClub = (clubData) => dispatch => {
    dispatch(clubCreatedPending())
    ClubService.createNewClubReq(clubData)
        .then(resp => {
            if (resp.data) {
                const successMessage = resp.data.message
                dispatch(clubCreatedSuccess(successMessage))
            }
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.errors)
                dispatch(clubCreatedFailed(error.response.data.errors))
            else
                dispatch(clubCreatedFailed([error]))
        });
}