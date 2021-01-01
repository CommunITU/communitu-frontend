import React, {Component} from "react";
import {withRouter} from 'react-router';

import {
    Row,
    Col,
    Button,
    Form,
    FormCheckbox,
    FormInput,
    FormGroup,
    InputGroup,
} from "shards-react";
import {AuthService} from "../../services/AuthService";
import SuccessAlertWithNavigation from "../alert/SuccessAlertWithNavigation";
import ErrorAlert from "../alert/ErrorAlert";

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.successDialog = React.createRef()
        this.errorDialog = React.createRef()

        this.state = {
            policyChecked: false,
            registerPending: undefined,
            registerSuccess: undefined,
            registerApiMessage: undefined,
        }
    }

    clearState = () => {
        this.setState({...this.state,
            registerPending: undefined,
            registerSuccess: undefined,
            registerApiMessage: undefined,})
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {name, email, password} = this.state;
        this.setState({...this.state, registerPending: true})
        AuthService.register({name, email, password})
            .then(resp => {
                this.setState({
                    ...this.state, registerApiMessage: resp.data.message,
                    registerPending: false, registerSuccess: true
                })
                this.successDialog.current.showAlert()

            })
            .catch(error => {
                this.setState({
                    ...this.state, registerPending: false, registerSuccess: false
                })

                if (error.response && error.response.data && error.response.data.message) {
                    this.setState({
                        ...this.state, registerApiMessage: error.response.data.message
                    })

                } else {
                    this.setState({
                        ...this.state, registerApiMessage: error
                    })
                }
                this.errorDialog.current.showAlert()
            })
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleCheckbox = (e) => {
        this.setState({policyChecked: !this.state.policyChecked})
    }

    render() {
        const {name, email, password, policyChecked, registerApiMessage, registerSuccess} = this.state;
        return (
            <div className="col-sm-10 col-md-9 col-xl-5 col-lg-7 mx-auto">
                {registerSuccess === true &&
                <SuccessAlertWithNavigation ref={this.successDialog} history={this.props.history}
                                            message={registerApiMessage}/>}

                {registerSuccess === false &&
                <ErrorAlert ref={this.errorDialog} history={this.props.history}
                            message={registerApiMessage}/>}

                <div className="card py-lg-2 py-md-2 ">
                    <div className="card-body">
                        <h3 className="text-center">Register</h3>
                        <hr/>
                        <Form onSubmit={this.onSubmit}>
                            {/* NAME FIELD */}
                            <FormGroup>
                                <InputGroup>
                                    <FormInput
                                        id="name"
                                        name="name"
                                        type=""
                                        placeholder="Name"
                                        onChange={this.onChange}
                                    />
                                </InputGroup>
                            </FormGroup>

                            {/* EMAIL FIELD */}
                            <FormGroup>
                                <InputGroup>
                                    <FormInput
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        onChange={this.onChange}
                                    />
                                </InputGroup>
                            </FormGroup>

                            {/* PASSWORD FIELD */}
                            <FormGroup>
                                <InputGroup>
                                    <FormInput
                                        id="fePassword"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        onChange={this.onChange}
                                    />
                                </InputGroup>

                            </FormGroup>

                            {/* CHECKBOX FIELD */}
                            <Row className="justify-content-center">
                                <Col md="12" className="form-group">
                                    <FormCheckbox
                                        onChange={this.handleCheckbox}
                                        checked={policyChecked}
                                    >
                                        I agree with your{" "}
                                        <a href="/">Privacy Policy</a>.
                                    </FormCheckbox>
                                </Col>
                            </Row>

                            {/* LOGIN BUTTON FIELD */}
                            <Row className="justify-content-center">
                                <Button className="btn-primary"
                                        disabled={!name || !email || !password || !policyChecked}>Login</Button>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(RegisterForm);
