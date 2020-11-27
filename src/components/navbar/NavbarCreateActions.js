import React, {Component} from 'react';
import {CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {freeSet} from "@coreui/icons";
import {withRouter} from "react-router";

class NavbarCreateActions extends Component {
    handleNavAction = (uri) => {
        this.props.history.push(uri)
    }

    render() {
        return (
            <CDropdown
                inNav
                className="c-header-nav-item "
            >
                <CDropdownToggle className="c-header-nav-link text-white " caret={true}>
                    <CIcon size="lg" content={freeSet.cilPlus}/>
                </CDropdownToggle>

                <CDropdownMenu placement="bottom-end" className="pt-0">
                    <CDropdownItem className="mt-2" onClick={() => this.handleNavAction("/events/create")}><CIcon
                        content={freeSet.cilPlaylistAdd}
                        className="mr-2 text-success"/> Create new
                        event</CDropdownItem>
                    <CDropdownItem className="my-0" onClick={() => this.handleNavAction("/clubs/create")}><CIcon
                        content={freeSet.cilPeople}
                        className="mr-2 text-danger"/> Create new
                        club</CDropdownItem>
                </CDropdownMenu>
            </CDropdown>
        );
    }


}

export default withRouter(NavbarCreateActions);