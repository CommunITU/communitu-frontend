import {UPDATE_QUESTIONS_FORM} from "./actionTypes";

const initialState = {
    questions: {},
}

export const questionFormReducer = (state = initialState, action) => {
    console.log(action
    )
    switch (action.type) {
        case UPDATE_QUESTIONS_FORM:
            let questions = state.questions
            questions[action.questionID] = action.questionFields
            console.log(questions)
            return {
                ...state,
                questions: questions,
            }
        default:
            return state;

    }
}