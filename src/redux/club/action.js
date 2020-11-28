import {clubCreatedFailed, clubCreatedPending, clubCreatedSuccess} from "./actionCreators";
import {ClubService} from "../../services/ClubService";

export const createNewClub = (clubData) => dispatch => {
    dispatch(clubCreatedPending())
    console.log(clubData)
    ClubService.createNewClubReq(clubData)
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