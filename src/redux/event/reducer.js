import {ADD_QUESTION_TO_FORM, DELETE_QUESTION_FROM_FORM, UPDATE_QUESTIONS_FORM} from "./actionTypes";
import EventRegistrationQuestion from "../../components/event/EventRegistrationQuestion";
import React from "react";

const initialState = {
    questions: {},
    questionsDom: {}
}

export const questionFormReducer = (state = initialState, action) => {
    let questions = state.questions
    let questionsDom = state.questionsDom
    switch (action.type) {
        case UPDATE_QUESTIONS_FORM:
            questions[action.questionID] = action.questionFields
            return {
                ...state,
                questions: questions,
            }

        case DELETE_QUESTION_FROM_FORM:
            delete questions[action.questionID]
            delete questionsDom[action.questionID]

            // It is necessary to re-render component
            questions = {...questions}
            questionsDom = {...questionsDom}
            return {
                ...state,
                questions: questions,
                questionsDom: questionsDom,
            }

        case ADD_QUESTION_TO_FORM:
            questionsDom[action.questionID] = <EventRegistrationQuestion id={action.questionID}/>
            questions[action.questionID] = action.questionFields

            // It is necessary to re-render component
            questions = {...questions}
            questionsDom = {...questionsDom}
            return {
                ...state,
                questions: questions,
                questionsDom: questionsDom,
            }
        default:
            return state;

    }
}