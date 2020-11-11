import React, {Component} from 'react';
import {Container, Col, Row} from "react-bootstrap";
import EventCard from "./EventCard";


class Events extends Component {
    render() {

        let events = [];
        for (let i = 0; i < 6; i++) {
            events.push(<EventCard title="Event title"
                                 eventLink=""
                                 img="event1.png"
                                 owner="Umut Emre Bayramoğlu"
                                 location="Ankara"
                                 quota="10"
                                 date="Today"
                                 history="/"/>);
        }

        return (
            <Container>
                <Row className="py-2">
                    <Col className="col-12 text-center">
                        <hr/>
                        <h3 className="title-big">All Events</h3>
                        <hr/>
                    </Col>
                </Row>
                <Row className="py-2">
                    {events}
                </Row>
            </Container>
        );
    }
}

export default Events;