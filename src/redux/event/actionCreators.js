import {
    UPDATE_QUESTIONS_FORM,
    DELETE_QUESTION_FROM_FORM,
    ADD_QUESTION_TO_FORM,
    UPDATE_QUESTION_OPTION, ADD_QUESTION_OPTION
} from "./actionTypes";


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
        questionFields: {title: null, explanation: null, questionType: "text", questionOptions: {}},
    }
}


export const deleteQuestionFromForm = (questionID) => {
    return {
        type: DELETE_QUESTION_FROM_FORM,
        questionID: questionID,
    }
}

export const addQuestionOption = (questionID, optionID,questionOptionDom) => {
    return {
        type: ADD_QUESTION_OPTION,
        questionID: questionID,
        optionID: optionID,
        questionOption: {optionText: null},
        newQuestionOptionDom: questionOptionDom
    }
}

export const updateQuestionOption = (questionID, optionID, option) => {
    return {
        type: UPDATE_QUESTION_OPTION,
        questionID: questionID,
        optionID: optionID,
        option: option,
    }
}