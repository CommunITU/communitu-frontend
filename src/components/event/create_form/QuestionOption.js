import React, {Component} from 'react';
import CIcon from "@coreui/icons-react";
import {freeSet} from "@coreui/icons";
import {FormInput} from "shards-react";

class QuestionOption extends Component {

    constructor(props) {
        super(props);
        this.state = {
            optionText: ""
        }
    }

    onTextChange = (e) => {
        this.setState({optionText: e.target.value})
        this.props.onOptionTextChange(e);
    }

    render() {
        const {optionId} = this.props
        return (
            <div className="d-flex flex-row my-1 align-items-center">
                <CIcon size="md" color="danger" content={freeSet.cilArrowRight}/>

                <FormInput id={optionId}
                           value={this.state.optionText}
                           className="mx-3 border-top-0 border-left-0 border-right-0"
                           onChange={this.onTextChange}
                           placeHolder="Enter the option"/>

                <CIcon alt="Delete Option" className="my-auto" style={{cursor: "pointer"}} size="md" color="danger"
                       content={freeSet.cilRemove}/>
            </div>
        );
    }
}

export default QuestionOption;