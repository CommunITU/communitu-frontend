import React, {Component} from 'react';
import {CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CProgress} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {freeSet} from "@coreui/icons";
import {withRouter} from "react-router";

class NavbarUserActions extends Component {

    handleNavAction = (uri) => {
        this.props.history.push(uri)
    }

    render() {
        const itemsCount = 5
        const {user} = this.props
        return (
            <CDropdown
                inNav
                className="c-header-nav-item mx-2"
            >
                <CDropdownToggle className="c-header-nav-link text-white" caret={true}>
                    {/*<CIcon className="text-white" content={freeSet.cilBell}/>*/}
                    {/*<CBadge shape="pill" color="danger">{itemsCount}</CBadge>*/}
                    <img
                        className="user-avatar rounded-circle mr-1"
                        src={require("../../assets/images/profile_pic.jpg").default}
                        alt="User Avatar"
                    />{" "}
                    <span className="d-none d-md-inline-block text-gray">{user.name}</span>
                </CDropdownToggle>

                <CDropdownMenu placement="bottom-end" className="pt-0">
                    <CDropdownItem
                        header
                        tag="div"
                        color="light"
                    >
                        <strong>Personal</strong>
                    </CDropdownItem>
                    <CDropdownItem><CIcon content={freeSet.cilUser} className="mr-2 text-success"/> Profile
                    </CDropdownItem>
                    <CDropdownItem><CIcon content={freeSet.cilList} className="mr-2 text-danger"/> My clubs
                    </CDropdownItem>
                    <CDropdownItem><CIcon content={freeSet.cilListRich} className="mr-2 text-info"/> My attendances
                    </CDropdownItem>
                    <CDropdownItem
                        header
                        tag="div"
                        color="light"
                    >
                        <strong>Options</strong>
                    </CDropdownItem>
                    <CDropdownItem><CIcon content={freeSet.cilSettings} className="mr-2 text-dark"/> Account Settings
                    </CDropdownItem>
                    <CDropdownItem onClick={() => this.handleNavAction("/logout")}>
                        <CIcon content={freeSet.cilAccountLogout} className="mr-2 text-danger"/> Logout </CDropdownItem>
                </CDropdownMenu>
            </CDropdown>
        );
    }
}

export default withRouter(NavbarUserActions);