import React, {Component} from 'react';
import {Container, Col, Row} from "react-bootstrap";
import EventCard from "./EventCard";
import {EventService} from "../../services/EventService";


class Events extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoadingEvents: false,
            events: []
        }
    }

    componentDidMount() {
        this.setState({...this.state, isLoadingEvents: true})
        EventService.fetchEvents()
            .then(resp => {
                if (resp && resp.data) {
                    let events = resp.data;
                    this.setState({...this.state, events: events, isLoadingEvents:false});

                }
            })
            .catch(err => {
                this.setState({...this.state, events: [], isLoadingEvents:false});
            })
    }

    render() {

        const {events, isLoadingEvents} = this.state

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
                    {events.map((event, i) => {
                        return (<EventCard title= {event.title}
                                           eventLink= "/link"
                                           img="event1.png"
                                           owner="Umut Emre Bayramoğlu"
                                           quota= {event.quota}
                                           date= {event.startDate}
                                           history="/"/>)
                    })}
                </Row>
            </Container>
        );
    }
}

export default Events;