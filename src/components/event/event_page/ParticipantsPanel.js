import React, {useEffect, useState} from 'react';
import {Col, Container} from "shards-react";
import {EventService} from "../../../services/EventService";
import {Divider} from "@material-ui/core";
import {Row} from "react-bootstrap";
import LoadingIconSmall from "../../alert/LoadingIconSmall";

const ParticipantsPanel = (props) => {

    const [loadingParticipants, setLoadingParticipants] = useState(false)
    const [participants, setParticipants] = useState([])
    const {eventId} = props

    useEffect(() => {
        const fetchParticipants = () => {
            setLoadingParticipants(() => true)
            EventService.getEventParticipants(eventId, ['id', 'name', 'surname', 'profile_photo_url','authority'])
                .then(resp => {
                    setLoadingParticipants(() => false)
                    if (resp.status === 200) {
                        console.log(resp.data.participants)
                        setParticipants(() => resp.data.participants)
                    }

                })
                .catch(err => {
                    setLoadingParticipants(() => false)
                    if (err.response && err.response.data)
                        console.log(err.response.data.message)
                })
        }

        fetchParticipants();

    }, [eventId])

    return (
        <>
            {loadingParticipants && <LoadingIconSmall/>}
            {!loadingParticipants && <Container className="mt-2">
                <Row>
                    <Col lg={12}><h5 className="text-center text-black-50">Participants</h5></Col>
                    <Col lg={12}><Divider className="mx-4" variant="fullWidth"/></Col>
                </Row>


                <Row className="justify-content-center my-2">

                    {participants.length === 0 && "There is not any participant yet."}
                    {participants.map((user) => {
                        return (
                            <Col lg={3} sm={3} md={3} xs={3} className="m-0 p-1" style={{cursor: "pointer"}}>
                                <Row className="justify-content-center m-0 p-0">
                                    <Col lg={12}>
                                        <img
                                            className="user-avatar rounded-circle mr-1"
                                            alt="user_avatar"
                                            style={{width: "25px", height: "25px"}}
                                            src={user.profile_photo_url}/>

                                    </Col>

                                    <Col lg={12}>
                                        <span>{user.name}</span>
                                    </Col>
                                </Row>
                            </Col>

                        )
                    })}
                </Row>

            </Container>}
        </>

    )
}

export default ParticipantsPanel;