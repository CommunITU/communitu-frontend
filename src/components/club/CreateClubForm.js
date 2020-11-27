import React, {PureComponent} from 'react';
import {Alert, Button, Card, CardBody, Col, Form, FormInput, FormTextarea, Row} from "shards-react";
import classNames from "classnames";

class CreateClubForm extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            currentTab: 1,
            formAnimation: "slide-from-left",
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

    handleUploadPhoto = (e) => {

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
        return (
            <div className={panelClasses}>
                <div className="d-flex align-items-center">
                    <h3 className={panelClasses + " mr-auto text-center"}><strong>Profile and Header Photos</strong>
                    </h3>
                    <h4 className={panelClasses + " ml-auto"}>2/3</h4>
                </div>
                <hr/>

                {/** PROFILE PHOTO  */}
                <div>
                    <strong className={formInputLabel}>Select Profile Photo</strong>
                    <Row>
                        <Col lg="10" md="10" sm="10" xs="10" className="pr-0">
                            <div className="custom-file mb-3">
                                <input type="file" name="profile_photo_url" onChange={e => this.onFileUpload(e)}
                                       className="custom-file-input"
                                       id="customFile2">

                                </input>
                                <label className="custom-file-label" htmlFor="customFile2">
                                    {this.state.profile_photo_url}
                                </label>
                            </div>
                        </Col>
                        <Col lg="2" md="2" sm="2" xs="2" className="text-center pl-0">
                            <Button onClick={this.handleUploadPhoto()} className="btn btn-light">
                                Upload
                            </Button>
                        </Col>
                    </Row>
                </div>


                {/** HEADER PHOTO  */}
                <div className="mt-2">
                    <strong className={formInputLabel}>Select Header Photo</strong>
                    <Row>
                        <Col lg="10" md="10" sm="10" xs="10" className="pr-0">
                            <div className="custom-file mb-3">
                                <input type="file" name="header_photo_url" onChange={e => this.onFileUpload(e)}
                                       className="custom-file-input"
                                       id="customFile2">

                                </input>
                                <label className="custom-file-label" htmlFor="customFile2">
                                    {this.state.header_photo_url}
                                </label>
                            </div>
                        </Col>
                        <Col lg="2" md="2" sm="2" xs="2" className="text-center pl-0">
                            <Button onClick={this.handleUploadPhoto()} className="btn btn-light">
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

    onFileUpload(e) {
        this.setState({[e.target.name]: [e.target.value]})
    }

    validateForm = () => {

        const {name, description} = this.state
        const validation = name && description
        console.log(name, description)
        if (!validation) {
            let formErrors = []
            if (!name) formErrors.push("Club name is required.")
            if (!description) formErrors.push("Club description is required.")
            this.setState({formErrors: formErrors})
        }
        return validation
    }

    onSubmitForm = () => {
        // Validate form at first
        if (!this.validateForm()) return

        // Get form field data
        const {
            name, description, profile_photo_url, header_photo_url, website_url, email, twitter_url, instagram_url,
            facebook_url, discord_url, telegram_url
        } = this.state

        // Create club object
        const club_info = {
            name, description, profile_photo_url, header_photo_url, website_url, email, twitter_url, instagram_url,
            facebook_url, discord_url, telegram_url
        }

        // Send club data to backend server
        // TODO: IMPLEMENT REDUX FUNCTIONS
    }

    render() {

        const totalTab = 3  // Tab count of the form
        const {currentTab, formErrors} = this.state

        const formPanelPage1 = this.formPanelPage1()
        const formPanelPage2 = this.formPanelPage2()
        const formPanelPage3 = this.formPanelPage3()
        return (

            <Card medium className="mb-4">
                <CardBody>
                    <Form className="" onSubmit={this.onSubmit}>

                        {/** FORM ERROR MESSAGES */}
                        {formErrors && <Alert theme="danger">
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
        );
    }

}

export default CreateClubForm;