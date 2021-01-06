
import {combineReducers} from 'redux';
import {authReducer} from "./auth/reducer";
import {questionFormReducer} from "./event/reducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    questionForm: questionFormReducer,
})
