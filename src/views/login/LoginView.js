import React, {PureComponent} from 'react'
import {Row} from "reactstrap";
import LoginForm from "../../components/auth/LoginForm"
import {AuthSidebar} from "../../components/auth/AuthSidebar";
import Container from "react-bootstrap/Container";
import {connect} from "react-redux";
import {withRouter} from 'react-router';

/**
 *  Login page of the application.
 *
 *  @created    12/14/2020
 *  @author Umut Emre Bayramoglu
 */

class LoginView extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            menuVisible: false
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {isLoggedIn, history} = this.props;
        if(isLoggedIn){
            history.push("/");
        }
    }

    render() {
        return (
            <Container fluid>
                <Row className="h-100">
                    <AuthSidebar/>
                    <div className="col-lg col-md offset-lg-4 offset-md-4 login-right-container">
                        <h3 className="text-center font-weight-bold text-in-logo-color mb-4">CommunITU </h3>
                        <LoginForm/>
                    </div>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
}

export default withRouter(connect(mapStateToProps, null)(LoginView))