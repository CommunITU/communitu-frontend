import axios from "axios";
import {BASE_URL, UPLOAD} from "../constants/ApiConfig";
import {fileUploadWithToken} from "./Headers";
import uuid from "react-uuid";


/**
 *  Creates requests to upload files.
 *
 *  @created    01/17/2020
 *  @author Umut Emre Bayramoglu
 */

const uploadEventPhoto = (file) => {
    let data = new FormData();
    data.append("file", file)
    let new_uuid = uuid();

    return axios.post(BASE_URL + UPLOAD + `/events/${new_uuid}`, data, fileUploadWithToken())
}

const uploadClubPhoto = (file) => {
    let data = new FormData();
    data.append("file", file)

    let new_uuid = uuid();
    return axios.post(BASE_URL + UPLOAD + `/clubs/${new_uuid}`, data, fileUploadWithToken())
}

export const UploadService = {uploadClubPhoto, uploadEventPhoto}