import {addQuestionToForm, deleteQuestionFromForm, updateQuestionsForm} from "./actionCreators";

export const updateQuestionsFormAction = (questionId, question) => dispatch => {
    dispatch(updateQuestionsForm(questionId, question))
}

export const addQuestionFormAction = (questionId) => dispatch => {
    dispatch(addQuestionToForm(questionId))
}

export const deleteQuestionFormAction = (questionId) => dispatch => {
    dispatch(deleteQuestionFromForm(questionId))
}