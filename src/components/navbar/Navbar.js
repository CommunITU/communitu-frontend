import React, {Component} from 'react';
import NavbarNotif from "./NavbarNotif";
import NavbarMessages from "./NavbarMessages";
import {Navbar, Nav, NavItem, NavLink, Col, Row} from "react-bootstrap";

class _Navbar extends Component {

    render() {
        const isLoggedIn = true;

        return (
            <Navbar expand="sm" collapseOnSelect variant="dark"  className="custom-header">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavItem className="px-3">
                            <NavLink href="/dashboard">Dashboard</NavLink>
                        </NavItem>
                        <NavItem className="px-3">
                            <NavLink href="/users">Users</NavLink>
                        </NavItem>
                        <NavItem className="px-3">
                            <NavLink href="/dashboard">Settings</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>


                {
                    isLoggedIn
                        ? <Nav className="px-3 float-right">
                           <Col>
                               <Row>
                                   <NavbarNotif/>
                                   {/*<TheHeaderDropdownTasks/>*/}
                                   <NavbarMessages/>
                                   {/*<TheHeaderDropdown/>*/}
                               </Row>
                           </Col>

                        </Nav>
                        : <div>No Login</div>
                }


            </Navbar>
        );
    }
}

export default _Navbar;