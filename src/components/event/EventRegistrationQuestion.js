import React, {Component} from 'react';
import {Button, Form, FormInput} from "shards-react";
import {formInputLabelClasses} from "../../util/FormUtils";

class EventRegistrationQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "question": {},
        }
    }


    onTextChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
        this.setState({question: {...this.state.question, [e.target.name]: e.target.value}})
        this.props.updateQuestion(this.props.id, this.state.question)
    }

    render() {
        return (
            <Form className="wipe-open" style={{border: '1px solid gray', borderRadius: '10px', padding: '15px', marginTop:'10px'}}
                  onSubmit={this.onSubmit}>

                <div className="">

                    <FormInput name="title" type="text" value={this.state.title} onChange={this.onTextChange} size="md"
                               placeholder="Enter the question title"/>
                </div>

                <div className="mt-3">

                    <FormInput name="explanation" type="text" value={this.state.explanation} onChange={this.onTextChange} size="md"
                               placeholder="Enter the question explanation"/>
                </div>

            </Form>

        );
    }
}

export default EventRegistrationQuestion;