import {UPDATE_QUESTIONS_FORM,DELETE_QUESTION_FROM_FORM, ADD_QUESTION_TO_FORM} from "./actionTypes";


export const updateQuestionsForm = (questionID, questionFields) => {
    return {
        type: UPDATE_QUESTIONS_FORM,
        questionID: questionID,
        questionFields: questionFields,
    }
}

export const addQuestionToForm = (questionID) => {
    return {
        type: ADD_QUESTION_TO_FORM,
        questionID: questionID,
        questionFields: {title:null, explanation:null},
    }
}


export const deleteQuestionFromForm = (questionID) => {
    return {
        type: DELETE_QUESTION_FROM_FORM,
        questionID: questionID,
    }
}

