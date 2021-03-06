import React, {Component} from 'react';
import {withRouter} from "react-router";
import {EventService} from "../../services/EventService";
import {Container} from "shards-react";
import EventContainer from "../../components/event/event_page/EventContainer";
import LoadingIconSmall from "../../components/alert/LoadingIconSmall";


class EventPageView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            event: ""
        }

    }

    componentDidMount() {
        this.fetchEvent()
    }

    fetchEvent = () => {
        let eventId = this.props.match.params.eventId;
        EventService.getEventById(eventId).then(
            resp => {
                this.setState({event: resp.data.event})
            },
            err => {

            });
    }


    render() {
        const {event} = this.state

        const pageStyle = {
            backgroundImage: this.state.event ? `url(${this.state.event.image_url})` : '',
        };

        return (

            <Container fluid className="p-0 m-0">
                {event ?
                    <>
                        <div style={pageStyle} className="event-page-header-image" />
                            <EventContainer event = {event}  />
                    </>
                    : <div className="text-center" >
                        <LoadingIconSmall style={{width:"50px",height:"50px", marginTop:"50px"}}></LoadingIconSmall>
                    </div>}

            </Container>
        );
    }
}

export default withRouter(EventPageView);