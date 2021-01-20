import React, {Component} from 'react';
import {CBadge, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CImg} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {freeSet} from '@coreui/icons'

class NavbarNotifications extends Component {
    render() {
        const itemsCount = 1
        return (
            <CDropdown
                inNav
                className="c-header-nav-item mx-2"
                direction="down"
                style={{zIndex:"99999"}}
            >
                <CDropdownToggle className="c-header-nav-link text-white " caret={false}>
                    <CIcon size="lg" content={freeSet.cilBell}/><CBadge shape="pill"
                                                                        color="danger">{itemsCount}</CBadge>
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                    <CDropdownItem
                        header
                        tag="div"
                        color="light"
                    >
                        <strong>You have {itemsCount} messages</strong>
                    </CDropdownItem>
                    <CDropdownItem href="#">
                        <div className="message">
                            <div className="pt-3 mr-3 float-left">
                                <div className="c-avatar">
                                    <CImg
                                        src="https://i.pinimg.com/474x/f4/a5/38/f4a53836deeb8db01c2b9644e170e82d.jpg"
                                        className="c-avatar-img"
                                        alt="admin@bootstrapmaster.com"
                                    />
                                    <span className="c-avatar-status bg-success"/>
                                </div>
                            </div>
                            <div>
                                <small className="text-muted">John Doe</small>
                                <small className="text-muted float-right mt-1">Just now</small>
                            </div>
                            <div className="text-truncate font-weight-bold">
                                <span className="fa fa-exclamation text-danger"/>
                            </div>
                            <div className="small text-muted text-truncate">
                                Will be implemented soon ..............
                            </div>
                        </div>
                    </CDropdownItem>


                    <CDropdownItem href="#" className="text-center border-top"><strong>View all
                        messages</strong></CDropdownItem>
                </CDropdownMenu>
            </CDropdown>
        )
    }
}

export default NavbarNotifications;