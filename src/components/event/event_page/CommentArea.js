import React, {useEffect, useState} from 'react';
import {Button, Col, FormTextarea, Row} from "shards-react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CIcon from "@coreui/icons-react";
import {freeSet} from "@coreui/icons";
import {EventService} from "../../../services/EventService";
import LoadingIconSmall from "../../alert/LoadingIconSmall";
import ConfirmModal from "../../alert/ConfirmModal";
import {withRouter} from "react-router";

const CommentArea = (props) => {

    const {user, eventId} = props
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true)

    const [myComment, setMyComment] = useState(null);
    const [myCommentSending, setMyCommentSending] = useState(null);

    const [showLoginRequiredModal, setShowLoginRequiredModal] = useState(false)

    useEffect(() => {
        const fetchComments = () => {
            setCommentsLoading(() => true)
            EventService.getAllEventCommentsById(eventId)
                .then(resp => {
                    if (resp.status === 200) {
                        setCommentsLoading(() => false)
                        setComments(() => resp.data.comments)
                    }

                })
                .catch(err => {
                    setCommentsLoading(() => false)
                    if (err.response && err.response.data)
                        console.log(err.response.data.message)
                })
        }

        fetchComments()

    }, [eventId])


    const onSendComment = (e) => {

        /**
         * If user not logged in, show login required modal.
         */
        if (user === null) {
            setShowLoginRequiredModal(() => true)
            return;
        }

        setMyCommentSending(() => true)
        EventService.addEventComment(myComment, eventId)
            .then(resp => {
                setMyCommentSending(() => false)
                setComments(() => [{
                    content: myComment, sender_name: user.name, sender_surname: user.surname,
                    sender_avatar: user.profile_photo_url
                }, ...comments])

            })
            .catch(err => {
                setMyCommentSending(() => false)
                if (err.response && err.response.data)
                    console.log(err.response.data.message)
            })
    }

    const onTextChange = (e) => {
        setMyComment(() => e.target.value)
    }


    const createComments = () => {

        return (
            <List>
                {comments.map((comment, ind) => {
                    return (
                        <div>
                            <ListItem alignItems="flex-start" className="mb-2">
                                <ListItemAvatar>
                                    <Avatar alt="profile"
                                            src={comment.sender_avatar}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<h5
                                        style={{fontSize: '14px'}}>{comment.sender_name} {comment.sender_surname}</h5>}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                {comment.content}
                                            </Typography>

                                        </React.Fragment>
                                    }
                                />

                            </ListItem>
                            {comments.length !== ind + 1 && <Divider className="my-2 mx-3" variant="fullWidth"/>}
                        </div>
                    )
                })}


            </List>

        )
    }


    const closeLoginRequiredModal = () => {
        setShowLoginRequiredModal(()=> false)
    }

    const confirmLoginRequiredModal = () => {
        setShowLoginRequiredModal(()=> false)
        props.history.push("/login")
    }


    return (
        <React.Fragment>
            {commentsLoading
                ? <LoadingIconSmall/>

                : <div>
                    <ConfirmModal
                        show={showLoginRequiredModal}
                        contextText="You need to login!"
                        contextTitle="Login"
                        onClose={closeLoginRequiredModal}
                        onConfirm={confirmLoginRequiredModal}
                        rightButtonText="Login"
                    ></ConfirmModal>

                    <div lg={12} className="p-0" style={{marginTop: '15px', marginBottom: '15px'}}>
                        <h3 style={{fontSize: "1.5em"}}> Comments {comments.length > 0 ? "(" + comments.length + ")" : ""}</h3>

                        <Col lg={12}>
                            <Row>
                                <FormTextarea className="mt-2" onChange={onTextChange} name="comment" size="md"
                                              placeholder="Enter your opinion about the event. "/>
                            </Row>

                            <Row className="justify-content-end align-items-center">
                                {myCommentSending
                                    ? <LoadingIconSmall/>
                                    : <Button onClick={onSendComment} className="mt-2" size="sm" theme="info">Send
                                        <CIcon content={freeSet.cilArrowRight}></CIcon>
                                    </Button>}
                            </Row>
                        </Col>

                        <Col lg={12} className="p-0">
                            {createComments()}
                        </Col>
                    </div>
                </div>}
        </React.Fragment>
    );
}


export default withRouter(CommentArea);