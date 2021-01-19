import {
    ADD_QUESTION_OPTION,
    ADD_QUESTION_TO_FORM,
    DELETE_QUESTION_FROM_FORM,
    UPDATE_QUESTIONS_FORM
} from "./actionTypes";
import EventRegistrationQuestion from "../../components/event/create_form/EventRegistrationQuestion";
import React from "react";

const initialState = {
    questions: {},
    questionsDom: {},
    questionsOptionsDom: {},
}

export const questionFormReducer = (state = initialState, {newQuestionOptionDom, questionOption, optionID, questionFields, questionID, type}) => {
    let questions = state.questions
    let questionsDom = state.questionsDom
    let questionsOptionsDom = state.questionsOptionsDom

    switch (type) {
        case UPDATE_QUESTIONS_FORM:
            questions[questionID] = questionFields
            return {
                ...state,
                questions: questions,
            }

        case DELETE_QUESTION_FROM_FORM:
            delete questions[questionID]
            delete questionsDom[questionID]
            delete questionsOptionsDom[questionID]

            // It is necessary to re-render component
            questions = {...questions}
            questionsDom = {...questionsDom}
            return {
                ...state,
                questions: questions,
                questionsDom: questionsDom,
            }

        case ADD_QUESTION_TO_FORM:
            questionsDom[questionID] = <EventRegistrationQuestion id={questionID}/>
            questions[questionID] = questionFields

            // It is necessary to re-render component
            questions = {...questions}
            questionsDom = {...questionsDom}
            return {
                ...state,
                questions: questions,
                questionsDom: questionsDom,
            }

        case ADD_QUESTION_OPTION:
            questions[questionID].question_options[optionID] = questionOption
            questionsOptionsDom[questionID] = {...questionsOptionsDom[questionID]}
            questionsOptionsDom[questionID][optionID] = newQuestionOptionDom


            // It is necessary to re-render component
            questions = {...questions}
            questionsOptionsDom = {...questionsOptionsDom}
            return {
                ...state,
                questions: questions,
                questionsOptionsDom: questionsOptionsDom
            }

        default:
            return state;

    }
}

