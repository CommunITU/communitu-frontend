import React, {Component} from 'react';
import NavbarNotif from "./NavbarNotif";
import NavbarMessages from "./NavbarMessages";
import {Navbar, Nav, NavItem, NavLink, Col, Row} from "react-bootstrap";
import {FaSignInAlt, FaRegUser} from "react-icons/fa"
import Container from "react-bootstrap/Container";

class _Navbar extends Component {

    render() {
        const isLoggedIn = false;

        return (
            <Navbar expand="sm" collapseOnSelect variant="dark" className="custom-header align-items-stretch p-0">
                <Container className="align-items-stretch">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav p-0">
                        <Nav className="">
                            <NavItem className="px-3 py-2 active">
                                <NavLink class="" href="/dashboard">Dashboard</NavLink>
                            </NavItem>
                            <NavItem className="px-3 py-2">
                                <NavLink href="/users">Users</NavLink>
                            </NavItem>
                            <NavItem className="px-3 py-2">
                                <NavLink href="/dashboard">Settings</NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>


                    {
                        isLoggedIn
                            ? <Nav className="float-right mx-2">
                                <Col class="col-12">
                                    <Row>
                                        <NavItem className="py-2">
                                            <NavbarNotif/>
                                        </NavItem>
                                        <NavItem className="py-2">
                                            <NavbarMessages/>
                                        </NavItem>
                                    </Row>
                                </Col>
                            </Nav>

                            : <Nav navbar className="mx-2">
                                <Col>
                                    <Row>
                                        <NavItem className="py-2">
                                            <NavLink href="/login"><span
                                                className="mr-2 text-gray"><FaSignInAlt/> Login</span></NavLink>
                                        </NavItem>
                                        <NavItem className="py-2">
                                            <NavLink href="/register"><span
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

export default _Navbar;