import React, { Component } from 'react'
import { Col } from 'shards-react';
import EventInfo from "./EventInfo";
import {withRouter} from "react-router";

export class EventCard extends Component {

    onEventClick = (e) => {

        const eventId = this.props.id
        this.props.history.push({pathname:"/club1/events/" + eventId,
            eventInfo:{eventId}});
    }

    render() {
        const { name, img} = this.props;
        return (
            <Col lg="4" md="6" sm="12">
                <div className="card selection-effect" style={{cursor: "pointer"}} onClick={this.onEventClick}>
                    <img alt="event" className="card-img-top fade-in"
                         src={require('../../assets/images/' + img).default}/>
                    <div className="card-body pt-0 mt-0">
                        <h3 className="event-title">{name}</h3>
                        <hr className="m-0 p-0"></hr>
                        <EventInfo info={this.props}/>
                    </div>
                </div>
            </Col>

        );
    }
}

export default withRouter(EventCard);