import React, {Component} from 'react';
import NavbarUserActions from "./NavbarUserActions";
import NavbarNotifications from "./NavbarNotifications";
import {Navbar, Nav, NavItem, NavLink, Col, Row} from "react-bootstrap";
import {FaSignInAlt, FaRegUser} from "react-icons/fa"
import Container from "react-bootstrap/Container";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import NavbarCreateActions from "./NavbarCreateActions";

class _Navbar extends Component {

    handleNavAction = (uri) => {
        this.props.history.push(uri)
    }


    render() {
        const {isLoggedIn, user} = this.props;

        return (
            <Navbar expand="sm" collapseOnSelect variant="dark" className="custom-header align-items-stretch p-0">
                <Container className="align-items-stretch">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav p-0">
                        <Nav className="">
                            <NavItem className="px-3 py-2 active" onClick={() => this.handleNavAction("/")}>
                                <NavLink class="">Dashboard</NavLink>
                            </NavItem>
                            {/*<NavItem className="px-3 py-2" onClick={() => this.handleNavAction("/about")}>*/}
                            {/*    <NavLink>About</NavLink>*/}
                            {/*</NavItem>*/}
                        </Nav>
                    </Navbar.Collapse>


                    {
                        isLoggedIn
                            ? <Nav className="float-right mx-2">
                                <Col class="col-12">
                                    <Row>
                                        <NavItem className="py-2">
                                            <NavbarCreateActions/>
                                        </NavItem>
                                        <NavItem className="py-2">
                                            <NavbarNotifications/>
                                        </NavItem>
                                        <NavItem className="py-2">
                                            <NavbarUserActions user={user}/>
                                        </NavItem>
                                    </Row>
                                </Col>
                            </Nav>

                            : <Nav navbar className="mx-2">
                                <Col>
                                    <Row>
                                        <NavItem className="py-2" onClick={() => this.handleNavAction("/login")}>
                                            <NavLink><span
                                                className="mr-2 text-gray"><FaSignInAlt/> Login</span></NavLink>
                                        </NavItem>
                                        <NavItem className="py-2" onClick={() => this.handleNavAction("/register")}>
                                            <NavLink><span
                                                className="text-gray"><FaRegUser
                                                className="mr-1 mb-1"/>Register</span></NavLink>
                                        </NavItem>
                                    </Row>
                                </Col>

                            </Nav>
                    }


                </Container>
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state.auth)
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user
    }
}

export default withRouter(connect(mapStateToProps, null)(_Navbar));