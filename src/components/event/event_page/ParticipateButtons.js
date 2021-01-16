import React, {useEffect, useState} from 'react';
import {Button} from "shards-react";
import {connect} from "react-redux";
import {EventService} from "../../../services/EventService";


const ParticipateButtons = (props) => {

    const [participated, setParticipated] = useState(null);
    const [participationLoading, setParticipationLoading] = useState(null);

    useEffect(() => {
        const fetchParticipationStatus = () => {
            const user = props.user
            const eventId = props.eventId

            if (!user)
                return;

            setParticipationLoading(() => true)
            EventService.getParticipationStatus(eventId, user.id).then(
                resp => {
                    setParticipationLoading(() => false)
                    const {participationStatus} = resp.data
                    setParticipated(() => participationStatus)
                }
            )
                .catch(
                    err => {
                        setParticipationLoading(() => false)
                        if (err.response && err.response.data)
                            console.log(err.response.data.message)
                    }
                )
        }

        fetchParticipationStatus();
    }, [props.user, props.eventId])

    const onParticipateEvent = () => {
        const {eventId} = props;
        setParticipationLoading(() => true);
        EventService.participateToEvent(eventId)
            .then(resp => {
                setParticipationLoading(() => false)
                setParticipated(() => true)
            })

            .catch((err) => {
                setParticipationLoading(() => false)
                setParticipated(() => false)
                if (err.response && err.response.data)
                    console.log(err.response.data.message)
            })
    }

    const onCancelParticipation = () => {
        const {eventId} = props;
        setParticipationLoading(() => true);
        EventService.cancelParticipationToEvent(eventId)
            .then(resp => {
                setParticipationLoading(() => false)
                setParticipated(() => false)
            })

            .catch((err) => {
                setParticipationLoading(() => false)
                setParticipated(() => true)
                if (err.response && err.response.data)
                    console.log(err.response.data.message)
            })
    }

    return (
        <div>
            {participationLoading
                ? <div className="text-center">
                    <img alt="loading" style={{width: "20px", height: "20px"}}
                         src={require("../../../assets/images/loading.gif").default}></img>
                </div>

                : participated
                    ? <Button onClick={onCancelParticipation} className="mx-auto" theme="danger">Cancel
                        participation</Button>
                    :
                    <Button onClick={onParticipateEvent} className="mx-auto" theme="success">Participate</Button>}

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}


export default connect(mapStateToProps, null)(ParticipateButtons);