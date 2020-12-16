
import {combineReducers} from 'redux';
import {authReducer} from "./auth/reducer";
import {clubCreateReducer} from "./club/reducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    club: clubCreateReducer
})
