import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router';

import {
    Row,
    Button,
    Form,
    FormInput,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from "shards-react";
import {Lock, Person} from "@material-ui/icons";
import {login} from "../../redux/auth/action";

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isCompleted: false,
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {email, pass} = this.state;
        this.props.login({email, pass}, this.props.history);

    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleCheckbox = (e) => {
        this.setState({checked: !this.state.checked})
    }

    render() {
        const {email, pass} = this.state;
        return (
            <div className="col-sm-10 col-md-9 col-xl-5 col-lg-7 mx-auto">
                <div className="card py-lg-2 py-md-2 ">
                    <div className="card-body">
                        <h3 className="text-center">Login</h3>
                        <hr/>
                        <Form onSubmit={this.onSubmit}>
                            {/* EMAIL FIELD */}
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon type="prepend">
                                        <InputGroupText><Person/></InputGroupText>
                                    </InputGroupAddon>
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
                                    <InputGroupAddon type="prepend">
                                        <InputGroupText><Lock/></InputGroupText>
                                    </InputGroupAddon>
                                    <FormInput
                                        id="fePassword"
                                        name="pass"
                                        type="password"
                                        placeholder="Password"
                                        onChange={this.onChange}
                                    />
                                </InputGroup>

                            </FormGroup>

                            {/* LOGIN BUTTON FIELD */}
                            <Row className="justify-content-center">
                                <Button className="btn-primary" disabled={!email || !pass}>Login</Button>
                            </Row>

                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps, {login})(LoginForm));
