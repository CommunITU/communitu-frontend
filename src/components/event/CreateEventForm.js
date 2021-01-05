import React, {Component} from 'react';
import {
    Alert,
    Button,
    Card,
    CardBody,
    Col,
    Form,
    FormInput,
    FormSelect,
    Row
} from "shards-react";
import {withRouter} from "react-router";
import {ClubService} from "../../services/ClubService";
import EventSuccessAlert from "./EventSuccessAlert";
import {connect} from "react-redux";
import ReactQuill from "react-quill";
import {DatePicker_} from "../../util/DatePicker";
import CIcon from "@coreui/icons-react";
import {freeSet} from "@coreui/icons";
import {CBadge} from "@coreui/react";
import {formInputLabelClasses} from "../../util/FormUtils";
import EventRegistrationQuestion from "./EventRegistrationQuestion";

class CreateEventForm extends Component {

    FORM_PANEL_NUM = 4

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
            header_photo_url: null,
            profile_photo_url: null,
            start_date: null,
            end_date: null,
            ask_registration_questions: null,
            registration_questions: [],

            registration_questions_map: {},
            clubsLoading: false,
            clubsFetched: false,
            myClubs: [],
        }
    }

    componentDidMount() {
        this.fetchMyClubs()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.loggedUser !== prevProps.loggedUser) {
            this.fetchMyClubs()
        }

        if (this.state.successMessage) {
            this.successDialog.current.handleClickOpen()
        }


    }

    fetchMyClubs = () => {
        const {loggedUser} = this.props
        if (loggedUser) {
            this.setState({...this.state, clubsLoading: true})
            ClubService.getClubsNameExecutedByUser(loggedUser.id)
                .then(resp => {
                    this.setState({...this.state, myClubs: resp.data.clubs})
                    this.setState({...this.state, clubsFetched: true, clubsLoading: false})
                })
                .catch(err => {
                    this.setState({...this.state, clubsFetched: true, clubsLoading: false})
                })
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

    onQuillTextChange = (value) => {
        this.setState({"description": value});
    }

    onDateChange = (field, date) => {
        this.setState({[field]: date});
    }

    onFormSelectionChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onCheckboxChange = (e, opt) => {
        const newState = {};
        let checked = this.state[opt]
        newState[opt] = !checked;
        this.setState({...this.state, ...newState})
    }

    handleUploadPhoto = (e) => {

    }

    updateQuestion = (questionId, question) => {

        let questions = this.state.registration_questions_map
        questions[questionId] = question
        this.setState({registration_questions_map: questions})
    }

    addNewQuestion = () => {
        let questionId = this.state.registration_questions.length + 1
        this.setState({
            ...this.state,
            registration_questions: [...this.state.registration_questions,
                <EventRegistrationQuestion id={questionId} updateQuestion={this.updateQuestion}/>]
        })

    }


    formPanelPage1 = () => {
        const panelClasses = this.state.formAnimation
        const {myClubs, clubsFetched} = this.state

        return (
            <div className={panelClasses}>
                <div className="d-flex align-items-center">
                    <h3 className={panelClasses + " mr-auto text-center"}><strong>Firstly, select your club</strong>
                    </h3>
                    <h4 className={panelClasses + " ml-auto"}>1/{this.FORM_PANEL_NUM}</h4>
                </div>
                <hr/>

                {/** Club selection  */}
                <div className="panelClasses">
                    <FormSelect onChange={this.onFormSelectionChange} name="clubSelection">
                        {
                            clubsFetched
                                ? myClubs.map((club) => {
                                    let {clubSelection} = this.state
                                    let selected = false
                                    if (clubSelection === undefined || clubSelection === null) {
                                        this.setState({...this.state, clubSelection: club.id}, () => {
                                            selected = true
                                        })
                                    } else {
                                        selected = parseInt(this.state.clubSelection) === club.id
                                    }
                                    return (<option selected={selected} value={club.id}>{club.name}</option>)
                                })
                                : <option selected>Loading clubs...</option>
                        }
                    </FormSelect>
                </div>
            </div>
        )
    }

    formPanelPage2 = () => {
        const formInputLabel = formInputLabelClasses()
        const panelClasses = this.state.formAnimation
        return (

            <div className={panelClasses}>
                <div className="d-flex align-items-center">
                    <h3 className={panelClasses + " mr-auto text-center"}><strong>General Information</strong></h3>
                    <h4 className={panelClasses + " ml-auto"}>2/{this.FORM_PANEL_NUM}</h4>
                </div>

                <hr/>

                {/** Event name  */}
                <div className="panelClasses">
                    <strong className={formInputLabel}>Event Name</strong>
                    <FormInput onChange={this.onTextChange} value={this.state.name} name="name" size="md"
                               placeholder="Enter the event name"/>
                </div>

                {/** Event description */}
                <div className="mt-3">
                    <strong className={formInputLabel}>Event Description</strong>
                    <ReactQuill value={this.state.description} onChange={this.onQuillTextChange}/>
                </div>

                {/** STARTING AND TIME */}
                <Row className="mt-2">
                    <Col lg="6" md="6">
                        <strong className={formInputLabel}>Start Date</strong>
                        <div className="form-control p-1 m-1 text-center"><DatePicker_
                            onDateChange={this.onDateChange} selectedDate={this.state.start_date} name="start_date"/>
                        </div>

                    </Col>

                    <Col lg="6" md="6" className="mt-xs-2 mt-sm-2">
                        <strong className={formInputLabel}>End Date</strong>
                        <div className="form-control p-1 m-1 text-center"><DatePicker_
                            onDateChange={this.onDateChange} selectedDate={this.state.end_date} name="end_date"/></div>
                    </Col>
                </Row>


                {/** LOCATION */}
                <Row>
                    <Col lg="12" md="12">
                        <strong className={formInputLabel}>Location</strong>

                        <FormInput name="location" type="text" onChange={this.onTextChange} size="md"
                                   placeholder="Enter the location"/>
                    </Col>

                </Row>

            </div>
        )
    }

    formPanelPage3 = () => {
        const formInputLabel = formInputLabelClasses()
        const panelClasses = this.state.formAnimation
        return (
            <div className={panelClasses}>
                <div className="d-flex align-items-center">
                    <h3 className={panelClasses + " mr-auto text-center"}><strong>Profile and Header Photos</strong>
                    </h3>
                    <h4 className={panelClasses + " ml-auto"}>3/{this.FORM_PANEL_NUM}</h4>
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

    formPanelPage4 = () => {
        const panelClasses = this.state.formAnimation
        return (
            <div className={panelClasses}>
                <div className="d-flex align-items-center">
                    <h3 className={panelClasses + " mr-auto text-center"}><strong>Registration Questions Form</strong>
                    </h3>
                    <h4 className={panelClasses + " ml-auto"}>4/{this.FORM_PANEL_NUM}</h4>
                </div>

                <hr/>

                {/** ADDITIONAL REGISTRATION QUESTION FORM*/}

                {/*/!*<FormCheckbox*!/*/}
                {/*/!*    checked={this.state.ask_registration_questions}*!/*/}
                {/*/!*    onChange={e => this.onCheckboxChange(e, "ask_registration_questions")}*!/*/}
                {/*/!*>*!/*/}
                {/*/!*    I want to ask additional questions on the event registration screen.*!/*/}
                {/*/!*</FormCheckbox>*!/*/}
                {/*<FormTextarea onChange={this.onChange}*/}
                {/*              name="registrationFormQuestions" size="lg"*/}
                {/*              placeholder="Enter the questions that will be asked on event registration page."/>*/}


                <Col onClick={this.addNewQuestion} className="registration-add-question my-3">
                    <CIcon size="xl" color="danger" content={freeSet.cilPlus}/> Add New
                    Question
                </Col>

                {/*<CBadge onClick={this.fetchMyClubs} style={{height: 25}} textStyle={{*/}
                {/*    color: 'white', fontSize: 18, lineHeight: 7,*/}
                {/*}} size="2xl" shape="pill" color="secondary">Add New Question</CBadge>*/}

                {this.state.registration_questions.map((question) => {
                    console.log(question)
                    return question
                })}


            </div>
        )
    }

    onFileUpload(e) {
        this.setState({[e.target.name]: [e.target.value]})
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

        const {currentTab, formErrors} = this.state
        const formPanelPage1 = this.formPanelPage1()
        const formPanelPage2 = this.formPanelPage2()
        const formPanelPage3 = this.formPanelPage3()
        const formPanelPage4 = this.formPanelPage4()
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

                            {currentTab === 4 && formPanelPage4}

                            {/** BUTTONS */}
                            {currentTab > 1 && <div className="float-left">
                                <Button onClick={() => this.handleTabChange("back")}
                                        className="btn btn-ghost-info mt-4">
                                    {'< Back '}
                                </Button>
                            </div>}
                            {currentTab < this.FORM_PANEL_NUM && <div className="float-right">
                                <Button onClick={() => this.handleTabChange("next")}
                                        className="btn btn-info mt-4">
                                    {' Next >'}
                                </Button>
                            </div>}
                            {currentTab === this.FORM_PANEL_NUM && <div className="float-right">
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
                <EventSuccessAlert ref={this.successDialog} history={this.props.history}/>
            </div>


        );
    }

}

const mapStateToProps = (state) => {

    return {
        loggedUser: state.auth.user,
        loginPending: state.auth.pending
    }
}

export default withRouter(connect(mapStateToProps, null)(CreateEventForm));
