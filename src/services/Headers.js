import {AuthService} from "./AuthService";

export const headersWithToken = () => {
    const token = AuthService.getJwtToken();
    return {
        headers: {
            "Authorization": `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
}

export const baseHeaders = () => {
    return {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
}
