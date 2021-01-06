import {updateQuestionsForm} from "./actionCreators";

export const updateQuestionsFormAction = (questionId, question) => dispatch => {
    console.log(question)
    dispatch(updateQuestionsForm(questionId, question))
}
