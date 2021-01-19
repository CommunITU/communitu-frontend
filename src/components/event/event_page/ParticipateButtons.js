import React, {useEffect, useRef, useState} from 'react';
import {Button} from "shards-react";
import {EventService} from "../../../services/EventService";
import {RegQuestionsForm} from "./RegQuestionsForm";
import ConfirmModal from "../../alert/ConfirmModal";
import {withRouter} from "react-router";


const ParticipateButtons = (props) => {

    const [participated, setParticipated] = useState(null);
    const [participationLoading, setParticipationLoading] = useState(null);
    const [regQuestions, setRegQuestions] = useState([]);
    const regQuestionsFormRef = useRef()

    const [showLoginRequiredModal, setShowLoginRequiredModal] = useState(false)

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

        /**
         * If user not logged in, show login required modal.
         */
        if (props.user === null) {
            setShowLoginRequiredModal(() => true)
            return;
        }


        const {eventId} = props;
        setParticipationLoading(() => true);

        /**
         * Before the participation, get registration questions of the event.
         */
        EventService.getRegistrationQuestions(eventId)
            .then(resp => {
                const {registration_questions} = resp.data
                setRegQuestions(() => registration_questions)
                if (registration_questions.length > 0) {
                    regQuestionsFormRef.current.handleClickOpen()
                } else {
                    doParticipation()
                }


            })
            .catch(err => {
                setParticipationLoading(() => false)
                if (err.response && err.response.data)
                    console.log(err.response.data.message)
            })
    }

    const onParticipationFormCompleted = (status, responses) => {

        if (status === "success") {
            doParticipation(responses)
        } else if (status === "failed") {
            setParticipationLoading(() => false)
        }
    }

    const doParticipation = (userResponses) => {
        const {eventId} = props;
        setParticipationLoading(() => true)
        EventService.participateToEvent(eventId, userResponses)
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

    const closeLoginRequiredModal = () => {
        setShowLoginRequiredModal(() => false)
    }

    const confirmLoginRequiredModal = () => {
        setShowLoginRequiredModal(() => false)
        props.history.push("/login")
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

            <RegQuestionsForm ref={regQuestionsFormRef} questions={regQuestions}
                              formCompletedCallback={onParticipationFormCompleted}/>

            <ConfirmModal
                show={showLoginRequiredModal}
                contextText="You need to login!"
                contextTitle="Login"
                onClose={closeLoginRequiredModal}
                onConfirm={confirmLoginRequiredModal}
                rightButtonText="Login"
            ></ConfirmModal>
        </div>
    )
}


export default withRouter(ParticipateButtons);