import {UPDATE_QUESTIONS_FORM} from "./actionTypes";


export const updateQuestionsForm = (questionID, questionFields) => {
    return {
        type: UPDATE_QUESTIONS_FORM,
        questionID: questionID,
        questionFields: questionFields,
    }
}
