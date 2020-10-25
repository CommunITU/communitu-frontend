import React, {Component} from 'react';
import {CBadge, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CProgress} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {freeSet} from "@coreui/icons";

class NavbarNotif extends Component {
    render() {
        const itemsCount = 5
        return (
            <CDropdown
                inNav
                className="c-header-nav-item mx-2"
            >
                <CDropdownToggle className="c-header-nav-link" caret={false}>
                    <CIcon className="text-white" content={freeSet.cilBell}/>
                    <CBadge shape="pill" color="danger">{itemsCount}</CBadge>
                </CDropdownToggle>
                <CDropdownMenu  placement="bottom-end" className="pt-0">
                    <CDropdownItem
                        header
                        tag="div"
                        className="text-center"
                        color="light"
                    >
                        <strong>You have {itemsCount} notifications</strong>
                    </CDropdownItem>
                    <CDropdownItem><CIcon content={freeSet.cilUserFollow} className="mr-2 text-success" /> New user registered</CDropdownItem>
                    <CDropdownItem><CIcon content={freeSet.cilUserUnfollow} className="mr-2 text-danger" /> User deleted</CDropdownItem>
                    <CDropdownItem><CIcon content={freeSet.cilChartPie} className="mr-2 text-info" /> Sales report is ready</CDropdownItem>
                    <CDropdownItem><CIcon content={freeSet.cilBasket} className="mr-2 text-primary" /> New client</CDropdownItem>
                    <CDropdownItem><CIcon content={freeSet.cilSpeedometer} className="mr-2 text-warning" /> Server overloaded</CDropdownItem>
                    <CDropdownItem
                        header
                        tag="div"
                        color="light"
                    >
                        <strong>Server</strong>
                    </CDropdownItem>
                    <CDropdownItem className="d-block">
                        <div className="text-uppercase mb-1">
                            <small><b>CPU Usage</b></small>
                        </div>
                        <CProgress size="xs" color="info" value={25} />
                        <small className="text-muted">348 Processes. 1/4 Cores.</small>
                    </CDropdownItem>
                    <CDropdownItem className="d-block">
                        <div className="text-uppercase mb-1">
                            <small><b>Memory Usage</b></small>
                        </div>
                        <CProgress size="xs" color="warning" value={70} />
                        <small className="text-muted">11444GB/16384MB</small>
                    </CDropdownItem>
                    <CDropdownItem className="d-block">
                        <div className="text-uppercase mb-1">
                            <small><b>SSD 1 Usage</b></small>
                        </div>
                        <CProgress size="xs" color="danger" value={90} />
                        <small className="text-muted">243GB/256GB</small>
                    </CDropdownItem>
                </CDropdownMenu>
            </CDropdown>
        );
    }
}

export default NavbarNotif;