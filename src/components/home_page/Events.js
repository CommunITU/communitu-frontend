import React, {Component} from 'react';
import {Container,Col,Row} from "react-bootstrap";


class Events extends Component {
    render() {
        return (
            <Container>
                <Row className="py-2">
                    <Col className="col-12 text-center">All Events
                    <hr/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Events;