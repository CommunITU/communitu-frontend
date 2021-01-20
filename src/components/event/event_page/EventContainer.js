import React, {Component} from 'react';
import {Card, Col, Row} from "shards-react";
import ParticipateButtons from "./ParticipateButtons";
import ParticipantsPanel from "./ParticipantsPanel";
import Divider from "@material-ui/core/Divider";
import CommentArea from "./CommentArea";
import {connect} from "react-redux";
import EventOwnerOptions from "./EventOwnerOptions";


class EventContainer extends Component {


    eventImage = (url) => {
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
            zIndex: "1",
            width: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "center",
        }

        const {user} = this.props
        return (
            <div style={containerStyle}>
                <Col lg={7} md={10}>
                    <Card>

                        {/**
                         EVENT HEADER
                         */}
                        <Row className="m-0" style={{backgroundColor: "#F6F6F6"}}>

                            <Col className="card-img m-0 p-0" style={{maxHeight: '350px'}} lg={8}>
                                {this.eventImage(event.image_url)}
                            </Col>

                            <Col lg={4} sm={12}>

                                {/**
                                 EVENT OWNER OPTIONS
                                 */}
                                <Row className="float-right">
                                    {user && <EventOwnerOptions event={event}/>}
                                </Row>

                                <div className="my-4 mx-1">
                                    <Row className="my-auto ">
                                        <Col style={{fontSize: "2.2em"}} lg={12} sm={12}>
                                            <b>{event.name}</b>
                                        </Col>
                                    </Row>
                                    <Row className="mr-auto mt-4">
                                        <Col style={{fontSize: "1.2em"}} lg={12} sm={12}>
                                            on <b>{event.start_date}</b>
                                        </Col>
                                    </Row>

                                    <Row className="mr-auto mt-3">
                                        <Col style={{fontSize: "1.2em"}} lg={12} sm={12}>
                                            by <b>Club Name 1</b>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>

                        </Row>

                        <Row className="m-0">
                            <Col lg={8} className="p-3 border-top">
                                <h3 style={{fontSize: "2em"}}> Content</h3>
                                <div style={{marginTop: "15px", marginBottom: "25px"}}
                                     dangerouslySetInnerHTML={{__html: event.description}}/>


                                <Divider className="my-2" variant="fullWidth"/>

                                <CommentArea user={this.props.user} eventId={event.id}/>
                            </Col>

                            <Col lg={4} className="border-left border-top p-0">
                                <div style={{backgroundColor: "#f7f8f8"}} className="p-2">
                                    <Row className="justify-content-center m-0">
                                        <ParticipateButtons user={this.props.user} eventId={event.id}/>
                                    </Row>


                                    <Row className="justify-content-center">
                                        <Col class="mx-auto" lg="12" md="12" className="mt-3">
                                            <h5 className="text-center text-black-50">Location</h5>
                                        </Col>


                                        <Col lg="12" md="12" className="">
                                            <h4 className="text-center">{event.location}</h4>
                                        </Col>
                                    </Row>

                                </div>


                                <Row className="justify-content-center p-0 m-0" style={{backgroundColor: "#ffffff"}}>
                                    <Col lg={12}>
                                        <ParticipantsPanel user={this.props.user} eventId={event.id}/>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                    </Card>
                </Col>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, null)(EventContainer);
