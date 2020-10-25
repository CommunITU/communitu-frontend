import React, {Component} from "react";
import {Row,Col} from "react-bootstrap";

export default class Header extends Component {
    render() {
        return (
            <div className="carousel">
                <div className="carousel-inner">
                    <div className="header-img"/>
                    <div className="carousel-caption">
                       <Row className="align-items-center">
                           <Col lg={12} md={12} sm={12}> <h1 className="carousel-title">discover events </h1></Col>
                           <Col lg={12} md={12} sm={12}> <h1 className="carousel-title">on ITU </h1></Col>
                       </Row>
                    </div>
                </div>
            </div>
        )
    }
}