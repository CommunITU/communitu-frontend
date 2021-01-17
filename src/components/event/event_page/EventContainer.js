import React, {Component} from 'react';
import {Card, Col, Row} from "shards-react";
import ParticipateButtons from "./ParticipateButtons";
import ParticipantsPanel from "./ParticipantsPanel";


class EventContainer extends Component {


    eventImage = (url) => {
        console.log(url)
        const style = {
            width: '100%',
            height: '100%',
        }
        return <img alt="event" style={style} src={url}/>
    }


    render() {
        const {event} = this.props

        const containerStyle = {
            marginTop: "100px",
            zIndex: "9999",
            width: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "center",
        }

        return (
            <div style={containerStyle}>
                <Col lg={7} md={10}>
                    <Card>
                        <Row className="m-0" style={{backgroundColor: "#F6F6F6"}}>

                            <Col className="card-img m-0 p-0" style={{maxHeight: '350px'}} lg={8}>
                                {this.eventImage(event.image_url)}
                            </Col>

                            <Col lg={4} sm={12} className="my-auto p-4">
                                <Row>
                                    <Col style={{fontSize: "2.2em"}} lg={12} sm={12}>
                                        <b>{event.name}</b>
                                    </Col>
                                </Row>

                                <Row className="mr-auto mt-3">
                                    <Col style={{fontSize: "1.2em"}} lg={12} sm={12}>
                                        on <b>{event.start_date}</b>
                                    </Col>
                                </Row>

                                <Row className="mr-auto mt-3">
                                    <Col style={{fontSize: "1.2em"}} lg={12} sm={12}>
                                        by <b>Club Name 1</b>
                                    </Col>
                                </Row>
                            </Col>


                        </Row>

                        <Row className="m-0 border-top">
                            <Col lg={8} className="p-3">
                                <h3 style={{fontSize: "2em"}}> Content</h3>
                                <div className="mt-3" dangerouslySetInnerHTML={{__html: event.description}}/>

                            </Col>

                            <Col lg={4} className="border-left">
                                <Row className="justify-content-center p-3">
                                    <ParticipateButtons eventId = {event.id} />
                                </Row>


                                <Row className="justify-content-center">
                                    <Col class="mx-auto" lg="12" md="12" className="mt-3">
                                        <h5 className="text-center text-black-50">Location</h5>
                                    </Col>
                                    <Col lg="12" md="12" className="">
                                        <h4 className="text-center">{event.location}</h4>
                                    </Col>
                                </Row>


                                <Row className="justify-content-center">
                                <ParticipantsPanel eventId = {event.id}/>
                                </Row>

                            </Col>
                        </Row>
                    </Card>
                </Col>
            </div>
        );
    }
}

export default EventContainer;