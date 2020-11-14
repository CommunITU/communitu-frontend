import React, {PureComponent} from 'react'
import { Row } from "reactstrap";
import LoginForm from "../components/login/LoginForm"
import { LoginSidebar } from "../components/login/LoginSidebar";
import Container from "react-bootstrap/Container";

/**
 *  Login page of the application.
 *
 *  @created    12/14/2020
 *  @author Umut Emre Bayramoglu
 */

export class LoginView extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            menuVisible: false
        }
    }

    componentDidMount() {
        const {isLoggedIn,history} = this.props;
        if(isLoggedIn)
            history.push("/");

    }

    render() {
        return (
            <Container fluid>
                <Row className="h-100" >
                    <LoginSidebar />
                    <div className="col-lg col-md offset-lg-4 offset-md-4 login-right-container">
                        <h3 className="text-center font-weight-bold text-in-logo-color mb-4">CommunITU </h3>
                        <LoginForm />
                    </div>
                </Row>
            </Container>
        )
    }
}

