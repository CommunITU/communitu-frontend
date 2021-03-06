import React, {Component} from 'react';
import {Container, Col, Row} from "react-bootstrap";
import EventCard from "./EventCard";
import {EventService} from "../../services/EventService";


class Events extends Component {

    static EVENT_LOAD_SIZE = 6

    constructor(props) {
        super(props);

        this.state = {
            isLoadingEvents: false,
            events: [],
            page: 1,
        }
    }

    componentDidMount() {
        this.setState({...this.state, isLoadingEvents: true})
        EventService.fetchEvents(Events.EVENT_LOAD_SIZE, this.state.page)
            .then(resp => {
                if (resp && resp.data) {
                    let events = resp.data;
                    this.setState({...this.state, events: events, isLoadingEvents: false});

                }
            })
            .catch(err => {
                this.setState({...this.state, events: [], isLoadingEvents: false});
            })
    }

    render() {

        const {events} = this.state

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
                    {events.map((event) => {
                        return (<EventCard id={event.id}
                                           name={event.name}
                                           img={event.image_url}
                                           owner="Umut Emre Bayramoğlu"
                                           eventLocation={event.location}
                                           quota={event.quota}
                                           date={event.startDate}/>)
                    })}
                </Row>
            </Container>
        );
    }
}

export default Events;