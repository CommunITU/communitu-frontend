import React, {Component} from 'react';
import {Alert, Button, Card, CardBody, Col, Form, FormInput, FormTextarea, Row} from "shards-react";
import classNames from "classnames";
import {withRouter} from "react-router";
import {ClubService} from "../../services/ClubService";
import SuccessModal from "../alert/SuccessModal";
import {UploadService} from "../../services/UploadService";

class CreateClubForm extends Component {

    constructor(props) {
        super(props);
        this.successDialog = React.createRef()

        this.state = {
            currentTab: 1,
            formErrors: [],
            successMessage: null,
            formAnimation: "slide-from-left",


            name: null,
            description: null,
            email: null,
            facebook_url: null,
            header_photo_url: null,
            profile_photo_url: null,
            telegram_url: null,
            instagram_url: null,
            website_url: null,
            discord_url: null,
            twitter_url: null,
            header_photo_file: null,
            profile_photo_file: null,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.successMessage) {
            this.successDialog.current.handleClickOpen()
        }
    }

    setBackendErrorsToState = () => {
        const {backendErrors} = this.props
        if (backendErrors) {
            let formErrors = this.state.formErrors
            Array.prototype.push.apply(formErrors, backendErrors);
            this.setState({formErrors: formErrors})
        }
    }


    handleTabChange = (type) => {
        this.setState(prevState => {
            return {
                currentTab: type === 'next' ? prevState.currentTab + 1 : prevState.currentTab - 1,
                formAnimation: type === 'next' ? "slide-from-right" : "slide-from-left"
            }
        })
    }

    onTextChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }


    onFileSelect(e) {
        this.setState({[e.target.name]: e.target.files[0]})
    }

    onFileUpload = (e) => {
        const {id} = e.target
        let file = null

        if (id === "profilePhotoUpload")
            file = this.state.profile_photo_file
        else if (id === "headerPhotoUpload") {
            file = this.state.header_photo_file
        }

        UploadService.uploadClubPhoto(file)
            .then(resp => {
                console.log(resp)
                if (resp.status === 200) {
                    let file_url = resp.data.file_url
                    console.log(file_url)
                    if (id === "profilePhotoUpload")
                        this.setState({'profile_photo_url': file_url})
                    else if (id === "headerPhotoUpload") {
                        this.setState({'header_photo_url': file_url})
                    }

                    console.log("File uploaded !")
                }
            })
            .catch(err => {
                console.log("File could not be uploaded !")
            })

    }

    formInputLabelClasses = () => {
        return (classNames(
            "mb-2",
            "d-block",
            "text-uppercase",
        ))
    }

    formPanelPage1 = () => {
        const formInputLabel = this.formInputLabelClasses()
        const panelClasses = this.state.formAnimation
        return (

            <div className={panelClasses}>
                <div className="d-flex align-items-center">
                    <h3 className={panelClasses + " mr-auto text-center"}><strong>General Information</strong></h3>
                    <h4 className={panelClasses + " ml-auto"}>1/3</h4>
                </div>

                <hr/>

                {/** Name of the club  */}
                <div className="panelClasses">
                    <strong className={formInputLabel}>Name of club</strong>
                    <FormInput onChange={this.onTextChange} value={this.state.name} name="name" size="md"
                               placeholder="Enter the club name"/>
                </div>

                {/** Club description */}
                <div className="mt-4">
                    <strong className={formInputLabel}>Club Description</strong>
                    <FormTextarea disabled={false} value={this.state.description} onChange={this.onTextChange}
                                  name="description" size="md"
                                  placeholder="Enter the club description"/>
                </div>

            </div>
        )
    }

    formPanelPage2 = () => {
        const formInputLabel = this.formInputLabelClasses()
        const panelClasses = this.state.formAnimation
        const {profile_photo_url, header_photo_url} = this.state
        return (
            <div className={panelClasses}>
                <div className="d-flex align-items-center">
                    <h3 className={panelClasses + " mr-auto text-center"}><strong>Profile and Header Photos</strong>
                    </h3>
                    <h4 className={panelClasses + " ml-auto"}>2/3</h4>
                </div>
                <hr/>


                {/** UPLOADED PROFILE PHOTO PREVIEW */}
                {profile_photo_url && <div className="text-center my-2">
                    <img alt="event" src={this.state.profile_photo_url} style={{width: '75%', height: '75%'}}/>
                </div>}
                {/** PROFILE PHOTO  */}
                <div>
                    <strong className={formInputLabel}>Select Profile Photo</strong>
                    <Row>
                        <Col lg="10" md="10" sm="10" xs="10" className="pr-0">
                            <div className="custom-file mb-3">
                                <input type="file" name="profile_photo_file" onChange={e => this.onFileSelect(e)}
                                       className="custom-file-input"
                                       id="profilePhoto">

                                </input>
                                <label className="custom-file-label" htmlFor="profilePhoto">
                                    {this.state.profile_photo_file ? this.state.profile_photo_file.name : ""}
                                </label>
                            </div>
                        </Col>
                        <Col lg="2" md="2" sm="2" xs="2" className="text-center pl-0">
                            <Button disabled={!this.state.profile_photo_file}
                                    id="profilePhotoUpload" htmlFor="profilePhoto" onClick={this.onFileUpload}
                                    className="btn btn-light">
                                Upload
                            </Button>
                        </Col>
                    </Row>
                </div>


                {/** UPLOADED HEADER PHOTO PREVIEW */}
                {header_photo_url && <div className="text-center my-2">
                    <img alt="event" src={this.state.header_photo_url} style={{width: '75%', height: '75%'}}/>
                </div>}
                {/** HEADER PHOTO  */}
                <div className="mt-2">
                    <strong className={formInputLabel}>Select Header Photo</strong>
                    <Row>
                        <Col lg="10" md="10" sm="10" xs="10" className="pr-0">
                            <div className="custom-file mb-3">
                                <input type="file" name="header_photo_file" onChange={e => this.onFileSelect(e)}
                                       className="custom-file-input"
                                       id="headerPhoto">

                                </input>
                                <label className="custom-file-label" htmlFor="headerPhoto">
                                    {this.state.header_photo_file ? this.state.header_photo_file.name : ""}
                                </label>
                            </div>
                        </Col>
                        <Col lg="2" md="2" sm="2" xs="2" className="text-center pl-0">
                            <Button
                                disabled={!this.state.header_photo_file}
                                id="headerPhotoUpload" htmlFor="headerPhoto" onClick={this.onFileUpload}
                                className="btn btn-light">
                                Upload
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

    formPanelPage3 = () => {
        const formInputLabel = this.formInputLabelClasses()
        const panelClasses = this.state.formAnimation
        return (
            <div className={panelClasses}>
                <div className="d-flex align-items-center">
                    <h3 className={panelClasses + " mr-auto text-center"}><strong>Contact & Social Media
                        Information</strong></h3>
                    <h4 className={panelClasses + " ml-auto"}>3/3</h4>
                </div>

                <hr/>

                <Row>
                    <Col className="col-12">
                        {/** WEBSITE URL */}
                        <strong className={formInputLabel}>Website</strong>
                        <FormInput onChange={this.onTextChange} name="website_url" size="md"
                                   value={this.state.website_url} placeholder="http://..."/>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col className="col-6">
                        {/** MAIL */}
                        <strong className={formInputLabel}>Mail Adress</strong>
                        <FormInput onChange={this.onTextChange} type="email" name="email" size="md"
                                   value={this.state.email}
                                   placeholder="Mail adress"/>
                    </Col>
                    <Col className="col-6">
                        {/** TWITTER URL */}
                        <strong className={formInputLabel}>Twitter URL</strong>
                        <FormInput onChange={this.onTextChange} name="twitter_url" size="md"
                                   value={this.state.twitter_url}
                                   placeholder="http://twitter.com/"/>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col className="col-6">
                        {/** INSTAGRAM URL */}
                        <strong className={formInputLabel}>Instagram URL</strong>
                        <FormInput onChange={this.onTextChange} name="instagram_url" size="md"
                                   value={this.state.instagram_url} placeholder="http://instagram.com/"/>

                    </Col>
                    <Col className="col-6">
                        {/** FACEBOOK URL  */}
                        <strong className={formInputLabel}>Facebook URL</strong>
                        <FormInput onChange={this.onTextChange} name="facebook_url" size="md"
                                   value={this.state.facebook_url} placeholder="http://facebook.com/"/>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col className="col-6">
                        {/** DISCORD URL  */}
                        <strong className={formInputLabel}>Discord URL</strong>
                        <FormInput onChange={this.onTextChange} name="discord_url" size="md"
                                   value={this.state.discord_url} placeholder="http://discord.com/"/>

                    </Col>
                    <Col className="col-6">
                        {/** TELEGRAM URL  */}
                        <strong className={formInputLabel}>Telegram URL</strong>
                        <FormInput onChange={this.onTextChange} name="telegram_url" size="md"
                                   value={this.state.telegram_url} placeholder="http://telegram.me/"/>
                    </Col>
                </Row>


            </div>
        )
    }

    validateForm = () => {

        const {name, description} = this.state
        const validation = name && description
        const formErrors = []
        if (!validation) {
            if (!name) formErrors.push("Club name is required.")
            if (!description) formErrors.push("Club description is required.")
        }
        this.setState({formErrors: formErrors})
        return validation
    }

    onSubmitForm = () => {

        // Validate form
        if (!this.validateForm())
            return

        // Get form field data
        const {
            name, description, profile_photo_url, header_photo_url, website_url, email, twitter_url, instagram_url,
            facebook_url, discord_url, telegram_url
        } = this.state

        // Create club object
        const club_data = {
            name, description, profile_photo_url, header_photo_url, website_url, email, twitter_url, instagram_url,
            facebook_url, discord_url, telegram_url
        }

        // Send club data to backend server
        ClubService.createNewClub(club_data)
            .then(resp => {
                if (resp.data) {
                    const successMessage = resp.data.message
                    this.setState({successMessage: successMessage})
                }
            })
            .catch(error => {
                let formErrors = this.state.formErrors;
                if (error.response && error.response.data && error.response.data.errors) {
                    let backendErrors = error.response.data.errors;
                    Array.prototype.push.apply(formErrors, backendErrors);
                } else {
                    Array.prototype.push.apply(formErrors, error);
                }
                this.setState({formErrors: formErrors})
            });


    }

    render() {
        const totalTab = 3  // Tab count of the form
        const {currentTab, formErrors} = this.state
        const formPanelPage1 = this.formPanelPage1()
        const formPanelPage2 = this.formPanelPage2()
        const formPanelPage3 = this.formPanelPage3()
        return (

            <div>
                <Card medium className="mb-4">
                    <CardBody>
                        <Form className="" onSubmit={this.onSubmit}>

                            {/** FORM ERROR MESSAGES */}
                            {formErrors.length > 0 && <Alert theme="danger">
                                {formErrors.map(error => {
                                    return (<div><strong>{error}</strong></div>)
                                })}
                            </Alert>}

                            {/** FORM PANELS */}
                            {currentTab === 1 && formPanelPage1}

                            {currentTab === 2 && formPanelPage2}

                            {currentTab === 3 && formPanelPage3}

                            {/** BUTTONS */}
                            {currentTab > 1 && <div className="float-left">
                                <Button onClick={() => this.handleTabChange("back")}
                                        className="btn btn-ghost-info mt-4">
                                    {'< Back '}
                                </Button>
                            </div>}
                            {currentTab < totalTab && <div className="float-right">
                                <Button onClick={() => this.handleTabChange("next")}
                                        className="btn btn-info mt-4">
                                    {' Next >'}
                                </Button>
                            </div>}
                            {currentTab === totalTab && <div className="float-right">
                                <Button
                                    onClick={this.onSubmitForm}
                                    size="lg"
                                    className="btn btn-info mt-4">
                                    Create Club!
                                </Button>
                            </div>}
                        </Form>
                    </CardBody>
                </Card>

                {/** SUCCESS ALERT DIALOG */}
                <SuccessModal modalTitle="Club created!" modalMessage="You are ready to organize events !"
                              ref={this.successDialog} history={this.props.history}/>
            </div>


        );
    }

}

export default withRouter((CreateClubForm));