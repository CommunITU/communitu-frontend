import React, {Component} from 'react';
import {Form, FormInput} from "shards-react";
import {connect} from "react-redux";
import {updateQuestionsFormAction} from "../../redux/event/action";

class EventRegistrationQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "question": {},
        }
    }

    componentDidMount() {
        this.setState({question: this.props.question})
    }


    onTextChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
        this.setState({question: {...this.state.question, [e.target.name]: e.target.value}})

        this.props.updateQuestionsFormAction(this.props.id, this.state.question)
    }

    render() {

        const id = this.props.id
        const question = this.props.registrationQuestions[id]

        return (
            <Form className="wipe-open"
                  style={{border: '1px solid gray', borderRadius: '10px', padding: '15px', marginTop: '10px'}}
                  onSubmit={this.onSubmit}>

                <div className="">

                    <FormInput name="title" type="text" value={this.state.title || (question && question.title)}
                               onChange={this.onTextChange} size="md"
                               placeholder="Enter the question title"/>
                </div>

                <div className="mt-3">

                    <FormInput name="explanation" type="text"
                               value={this.state.explanation || (question && question.explanation)}
                               onChange={this.onTextChange} size="md"
                               placeholder="Enter the question explanation"/>
                </div>

            </Form>

        );
    }
}

const mapStateToProps = (state) => {

    return {
        registrationQuestions: state.questionForm.questions
    }
}

export default connect(mapStateToProps, {updateQuestionsFormAction})(EventRegistrationQuestion);