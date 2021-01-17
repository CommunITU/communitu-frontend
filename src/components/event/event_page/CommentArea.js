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

const CommentArea = (props) => {

    const {eventId} = props
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true)

    const [myComment, setMyComment] = useState(null);
    const [myCommentSending, setMyCommentSending] = useState(null);

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
        setMyCommentSending(() => true)
        EventService.addEventComment(myComment, eventId)
            .then(resp => {
                setMyCommentSending(() => false)
                setComments(() => [{content: myComment}, ...comments])

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
                {comments.map((comment) => {
                    return (
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="profile"
                                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<h5 style={{fontSize: '14px'}}>Umut Emre Bayramoğlu</h5>}
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
                            <Divider variant="inset" component="li"/>
                        </ListItem>
                    )
                })}
            </List>
        )
    }

    return (
        <React.Fragment>
            {commentsLoading
                ? <div className="text-center">
                    <img alt="loading" style={{width: "20px", height: "20px"}}
                         src={require("../../../assets/images/loading.gif").default}></img>
                </div>

                : <div lg={12} className="p-0" style={{marginTop: '15px', marginBottom: '15px'}}>
                    <h3 style={{fontSize: "1.5em"}}> Comments</h3>

                    <Col lg={12}>
                        <Row>
                            <FormTextarea onChange={onTextChange} name="comment" size="md"
                                          placeholder="Enter your opinion about the event. "/>
                        </Row>

                        <Row className="justify-content-end align-items-center">
                            {myCommentSending
                                ? <div className="text-center">
                                    <img alt="loading" style={{width: "20px", height: "20px"}}
                                         src={require("../../../assets/images/loading.gif").default}></img>
                                </div>

                                : <Button onClick={onSendComment} className="mt-2" size="sm" theme="info">Send
                                    <CIcon content={freeSet.cilArrowRight}></CIcon>
                                </Button>}
                        </Row>
                    </Col>

                    <Col lg={12} className="p-0">
                        {createComments()}
                    </Col>
                </div>}
        </React.Fragment>
    );
}


export default CommentArea;