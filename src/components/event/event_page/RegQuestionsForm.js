import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {Alert, FormTextarea} from "shards-react";
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

export class RegQuestionsForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDialog: false,
            userResponses: {},
            formError: null,
        }

    }

    handleTextChange = (e) => {
        const {id, value} = e.target;
        const {userResponses} = this.state
        userResponses[id] = {'type': "text", 'answer': value}
        this.setState({
            userResponses: userResponses
        })
    }

    handleClickOpen = () => {
        this.setState({showDialog: true})
    };

    handleClose = () => {
        this.setState({showDialog: false})
        this.props.formCompletedCallback("failed")
    };

    handleOptionChange = (questionId, optionId) => {
        const {userResponses} = this.state
        userResponses[questionId] = {'type': "choice", 'answer': optionId}
        this.setState({
            userResponses: userResponses
        })
    }

    validateForm = () => {
        const {questions} = this.props
        const {userResponses} = this.state

        let validation = true
        questions.map((question) => {
            if (!validation)
                return ""

            if (question.is_mandatory
                && ((typeof userResponses[question.id]) === 'undefined'
                    || (typeof userResponses[question.id].answer == 'undefined')
                    || userResponses[question.id].answer === "")) {

                validation = false
                this.setState({formError: "Please answer the mandatory questions"})
            }

            return ""
        })

        console.log(validation)
        return validation;
    }

    onSubmitForm = () => {
        this.setState({formError: null})
        if (!this.validateForm())
            return

        this.props.formCompletedCallback("success")
        this.setState({showDialog: false})
    };

    createQuestion = (ind, question) => {
        const questionId = question.id
        return (
            <div className="mt-3">

                {/** Create question title and explanation */}
                <DialogContentText>
                    <b>{ind + 1}) {question.title}
                        <span className="text-danger">{question.is_mandatory ? " *" : ""}</span>
                    </b>
                </DialogContentText>
                <DialogContentText style={{fontSize: "14px", fontStyle: "italic"}}>
                    {question.explanation}
                </DialogContentText>


                {/** Create text answer question */}
                {question.question_type === "text" &&
                <FormTextarea
                    id={questionId}
                    onChange={this.handleTextChange}
                    size="md"
                />}

                {/** Create choice answer question */}
                {question.question_type === "choice" &&
                <FormControl component="fieldset">
                    <RadioGroup onChange={(e) => this.handleOptionChange(questionId, parseInt(e.target.name))}>
                        {question.options.map((option) => {
                            return (
                                <FormControlLabel name={option.id} value={option.option_text} control={<Radio/>}
                                                  label={option.option_text}/>
                            )
                        })}
                    </RadioGroup>
                </FormControl>}

            </div>)
    }

    render() {

        const {questions} = this.props
        const {formError} = this.state

        return (
            <>

                <Dialog
                    style={{zIndex: "9999"}}
                    open={this.state.showDialog}
                    onClose={this.handleClose}
                    fullWidth={true}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Registration Questions</DialogTitle>

                    <DialogContent>

                        {/** FORM ERROR MESSAGE */}
                        {formError && <Alert theme="danger">
                            <div><strong>{formError}</strong></div>
                        </Alert>}

                        {/** REGISTRATION QUESTIONS */}
                        {questions.map((question, ind) => {
                            return (
                                <>
                                    {this.createQuestion(ind, question)}
                                </>
                            )
                        })}

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.onSubmitForm} color="primary">
                            Participate
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}