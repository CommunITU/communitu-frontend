import React from 'react';
import {Row,
    Col,
    Container} from "react-bootstrap";
import Navbar from "../components/navbar/Navbar";

const BaseLayout = ({ children }) => (

    <Container fluid>
        <Row>
            <Col
                className="main-content p-0"
                lg={{ size: 10, offset: 2 }}
                md={{ size: 9, offset: 3 }}
                sm="12"
                tag="main"
            >
                {/*IMPORT NAVBAR*/}
                <Navbar />

                {/*IMPORT PAGE CONTENT*/}
                {children}
            </Col>
        </Row>
    </Container>
);

export default BaseLayout;
