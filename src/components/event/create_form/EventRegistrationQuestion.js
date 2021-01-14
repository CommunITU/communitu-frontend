import React, {Component} from 'react';
import {Button, Form, FormInput} from "shards-react";
import {connect} from "react-redux";
import CIcon from "@coreui/icons-react";
import {freeSet} from "@coreui/icons";
import {addQuestionOption, deleteQuestionFromForm, updateQuestionsForm} from "../../../redux/event/actionCreators";

class EventRegistrationQuestion extends Component {

    constructor(props) {
        super(props);

        let id = this.props.id
        this.state = {
            "question": this.props.registrationQuestions[id],
            "questionOptionsDom": this.props.questionOptionsDom,
        }
    }

    deleteQuestion = () => {
        let questionId = this.props.id;
        this.props.deleteQuestionFromForm(questionId)
    }

    onTextChange = (e) => {
        let id = this.props.id
        this.setState({[e.target.name]: e.target.value});
        this.setState({question: {...this.props.registrationQuestions[id], [e.target.name]: e.target.value}}, () => {
            this.props.updateQuestionsForm(id, this.state.question)
        })
    }

    onOptionTextChange = (e) => {
        let questionId = this.props.id
        let optionId = e.target.id
        let question_options = this.props.registrationQuestions[questionId].question_options
        question_options[optionId].option_text = e.target.value

        this.setState({
            question: {
                ...this.props.registrationQuestions[questionId],
                question_options: question_options
            }
        }, () => {
            this.props.updateQuestionsForm(questionId, this.state.question)
        })
    }


    createOptionDom = (optionId) => {
        return (
            <div className="d-flex flex-row my-1 align-items-center">
                <CIcon size="md" color="danger" content={freeSet.cilArrowRight}/>

                <FormInput id={optionId}
                           value={this.state.question.question_options[optionId]}
                           className="mx-3 border-top-0 border-left-0 border-right-0"
                           onChange={this.onOptionTextChange}
                           placeHolder="Enter the option"/>

                <CIcon alt="Delete Option" className="my-auto" style={{cursor: "pointer"}} size="md" color="danger"
                       content={freeSet.cilRemove}/>
            </div>)
    }

    addNewOption = () => {

        let questionOptionId = Object.keys(this.state.question.question_options).length + 1
        let questionOptionDom = this.createOptionDom(questionOptionId)
        this.props.addQuestionOption(this.props.id, questionOptionId, questionOptionDom)
    }

    changeQuestionType = (type) => {
        if (type === "choice" && Object.keys(this.state.question.question_options).length === 0) {
            this.addNewOption()
            this.addNewOption()
        }

        this.setState({question: {...this.state.question, question_type: type}}, () => {
            this.props.updateQuestionsForm(this.props.id,this.state.question)
        })
    }

    choiceAnswerPanel = () => {
        const {questionOptionsDom} = this.props
        const {question_type} = this.state.question
        return (
            <>
                {question_type === "choice" && Object.values(questionOptionsDom[this.props.id]).map((option, ind) => {
                    return option
                })}


                {question_type === "choice" &&
                <Button onClick={this.addNewOption} className="btn-ghost-dark border my-3">Add new option</Button>}
            </>
        )
    }

    hoverBg = (type) => {
        const hoverBg = "bg-info text-white"
        if (this.state.question.question_type === type)
            return hoverBg

        return ""
    }

    render() {

        const question = this.state.question
        return (
            <Form className="wipe-open"
                  style={{border: '1px solid gray', borderRadius: '10px', padding: '15px', marginTop: '10px'}}
                  onSubmit={this.onSubmit}>

                <div className="">

                    <FormInput className="border-left-0 border-right-0 border-top-0 border-bottom" name="title" type="text"
                               value={question && question.title}
                               onChange={this.onTextChange} size="lg"
                               placeholder="Enter the question title"/>
                </div>

                <div className="mt-3">

                    <FormInput className="border-left-0 border-right-0 border-top-0 border-bottom" name="explanation" type="text"
                               value={question && question.explanation}
                               onChange={this.onTextChange} size="md"
                               placeholder="Enter the question explanation"/>
                </div>

                <div className="d-flex my-3">

                    <div className="mr-auto">
                        <Button onClick={() => this.changeQuestionType("text")}
                                className={"mx-1 btn-light " + this.hoverBg("text")}>Text
                            Answer</Button>
                        <Button onClick={() => this.changeQuestionType("choice")}
                                className={"mx-1 btn-light " + this.hoverBg("choice")}>Choice
                            Answer</Button>

                    </div>

                    <div className="ml-auto">
                        <Button onClick={this.deleteQuestion} className="btn-ghost-dark"><CIcon size="xl"
                                                                                                color="danger"
                                                                                                content={freeSet.cilTrash}/></Button>
                    </div>
                </div>

                {this.choiceAnswerPanel()}

            </Form>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        registrationQuestions: state.questionForm.questions,
        questionOptionsDom: state.questionForm.questionsOptionsDom
    }
}

export default connect(mapStateToProps, {
    updateQuestionsForm,
    deleteQuestionFromForm,
    addQuestionOption
})(EventRegistrationQuestion);