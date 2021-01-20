import React, {Component} from 'react';

import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Container,
    Row,
    Col
} from "reactstrap";
import {Button, Form, FormGroup} from "shards-react";
import {UserService} from "../../services/UserService";
import {withRouter} from "react-router";
import ConfirmModal from "../../components/alert/ConfirmModal";

class ProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            updatedProfile: {},
            showUpdateModal: false,
        }
    }

    componentDidMount() {
        this.fetchUser()
    }

    fetchUser = () => {
        let userId = this.props.match.params.userId

        UserService.getUserById(userId)
            .then(resp => {
                if (resp.status === 200) {
                    this.setState({user: resp.data.user})
                    this.setState({updatedProfile: resp.data.user})
                }
            })
            .catch(err => {
                if (err.response && err.response.data)
                    console.log(err.response.data.message)
            })
    }


    onUserInfoChange = (e) => {
        const {name, value} = e.target
        let updatedProfile = {...this.state.updatedProfile}
        updatedProfile[name] = value
        this.setState({updatedProfile: updatedProfile})
    }


    closeUpdateModal = () => {
        this.setState({showUpdateModal: false})
    }

    onClickUpdateProfile = () => {
        this.setState({showUpdateModal: true})
    }

    onUpdateModalConfirmed = () => {
        console.log(this.state.updatedProfile)
        UserService.updateUserById(this.state.updatedProfile)
            .then(resp => {
                this.closeUpdateModal()
                if (resp.status === 200) {
                    window.location.reload(true);
                }
            })
            .catch(err => {
                this.closeUpdateModal()
                if (err.response && err.response.data)
                    console.log(err.response.data.message)
            })
    }

    render() {
        const {user} = this.state

        return (
            <Container className="mt-4">

                <ConfirmModal
                    show={this.state.showUpdateModal}
                    contextText="Profile will be updated, do you confirm?"
                    contextTitle="Update"
                    onClose={this.closeUpdateModal}
                    onConfirm={this.onUpdateModalConfirmed}
                    rightButtonText="Update"
                ></ConfirmModal>

                <Row>
                    <Col className="order-xl-1 mb-xl-0" l="4" xl="4">
                        <Card>
                            <Row className="justify-content-center ">
                                <Col className="order-lg-2 text-center mt-4" lg="12">
                                    {user.profile_photo_url && <img
                                        style={{maxHeight: "150px", maxWidth: "150px"}}
                                        alt="..."
                                        className="rounded-circle"
                                        src={user.profile_photo_url}
                                    />}
                                </Col>
                            </Row>
                            <CardBody className="pt-0 pt-md-4">
                                <div className="text-center">
                                    <h3>
                                        {user.name}
                                        <span className="font-weight-light">  {user.surname}</span>
                                    </h3>
                                    <div className="h5 font-weight-300">
                                        <i className="ni location_pin mr-2"/>
                                        Contact: {user.contact}
                                    </div>
                                    <hr className="my-4"/>
                                    <div className="h5 mt-4">
                                        <i className="ni business_briefcase-24 mr-2"/>
                                        About me
                                    </div>
                                    <div>
                                        <i className="ni education_hat mr-2"/>
                                        {user.about_me}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col className="order-xl-2" l="4" xl="8">
                        <Card className="">
                            <CardHeader style={{backgroundColor: "#f5f5f5"}} className="border-0">
                                <Row className="align-items-center">
                                    <Col xs="12">
                                        <h3>My account</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <h6 className="heading-small text-muted mb-4">
                                        User information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-first-name"
                                                    >
                                                        First name
                                                    </label>
                                                    <Input
                                                        name="name"
                                                        onChange={this.onUserInfoChange}
                                                        className="form-control-alternative"
                                                        defaultValue={user.name}
                                                        id="input-first-name"
                                                        placeholder="First name"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-last-name"
                                                    >
                                                        Last name
                                                    </label>
                                                    <Input
                                                        name="surname"
                                                        onChange={this.onUserInfoChange}
                                                        className="form-control-alternative"
                                                        defaultValue={user.surname}
                                                        id="input-last-name"
                                                        placeholder="Last name"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4"/>
                                    {/* Address */}
                                    <h6 className="heading-small text-muted mb-4">
                                        Contact information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-contact"
                                                    >
                                                        Contact
                                                    </label>
                                                    <Input
                                                        name="contact"
                                                        onChange={this.onUserInfoChange}
                                                        className="form-control-alternative"
                                                        defaultValue={user.contact}
                                                        id="input-contact"
                                                        placeholder="Contact"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4"/>

                                    {/* Description */}
                                    <h6 className="heading-small text-muted mb-4">About me</h6>
                                    <div className="pl-lg-4">
                                        <FormGroup>
                                            <label>About Me</label>
                                            <Input
                                                onChange={this.onUserInfoChange}
                                                name="about_me"
                                                className="form-control-alternative"
                                                placeholder="A few words about you ..."
                                                rows="4"
                                                defaultValue={user.about_me}
                                                type="textarea"
                                            />
                                        </FormGroup>
                                    </div>


                                    <div className="float-right">
                                        <Button onClick={this.onClickUpdateProfile} className="mx-3">Update
                                            Profile</Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>


            </Container>
        );
    }
}

export default withRouter(ProfileView);