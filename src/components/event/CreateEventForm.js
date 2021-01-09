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
import {EventService} from "../../services/EventService";
import {connect} from "react-redux";
import ReactQuill from "react-quill";
import {DatePicker} from "../../util/DatePicker";
import CIcon from "@coreui/icons-react";
import {freeSet} from "@coreui/icons";
import {formInputLabelClasses} from "../../util/FormUtils";
import {addQuestionFormAction} from "../../redux/event/action";
import SuccessModal from "../alert/SuccessModal";

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
            image_url: null,
            start_date: null,
            end_date: null,
            location: null,
            quota: null,
            ask_registration_questions: null,
            registration_questions_dom: [],

            clubs_loading: false,
            clubs_fetched: false,
            club_selection: null,

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
            this.setState({...this.state, clubs_loading: true})
            ClubService.getClubsNameExecutedByUser(loggedUser.id)
                .then(resp => {
                    this.setState({...this.state, myClubs: resp.data.clubs})
                    this.setState({...this.state, clubs_fetched: true, clubs_loading: false})
                    this.setState({...this.state, club_selection: resp.data.clubs[0].id})
                })
                .catch(err => {
                    this.setState({...this.state, clubs_fetched: true, clubs_loading: false})
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
        let clubID = parseInt(e.target.value)
        this.setState({"club_selection": clubID});
    }

    onCheckboxChange = (e, opt) => {
        const newState = {};
        let checked = this.state[opt]
        newState[opt] = !checked;
        this.setState({...this.state, ...newState})
    }

    handleUploadPhoto = (e) => {

    }

    addNewQuestion = () => {
        let questionId = Object.values(this.props.registrationQuestionsDom).length;
        this.props.addQuestionFormAction(questionId)
    }

    createClubSelectOptions = () => {
        const {myClubs, clubs_fetched} = this.state
        const options = []

        clubs_fetched
            ? myClubs.map((club, ind) => {
                let selected = (club.id === this.state.club_selection)
                return (options.push(<option selected={selected} value={club.id}>{club.name}</option>))
            })
            : options.push(<option selected>Loading clubs...</option>)

        return options
    }

    formPanelPage1 = () => {
        const panelClasses = this.state.formAnimation

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
                    <FormSelect onChange={this.onFormSelectionChange} name="club_selection">
                        {
                            this.createClubSelectOptions()
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
                        <div className="form-control p-1 m-1 text-center"><DatePicker
                            onDateChange={this.onDateChange} selectedDate={this.state.start_date} name="start_date"/>
                        </div>

                    </Col>

                    <Col lg="6" md="6" className="mt-xs-2 mt-sm-2">
                        <strong className={formInputLabel}>End Date</strong>
                        <div className="form-control p-1 m-1 text-center"><DatePicker
                            onDateChange={this.onDateChange} selectedDate={this.state.end_date} name="end_date"/></div>
                    </Col>
                </Row>


                {/** LOCATION */}
                <Row className="mt-2">
                    <Col lg="6" md="6">
                        <strong className={formInputLabel}>Location</strong>

                        <FormInput value={this.state.location} name="location" type="text" onChange={this.onTextChange}
                                   size="md"
                                   placeholder="Enter the location"/>
                    </Col>

                    <Col lg="6" md="6">
                        <strong className={formInputLabel}>Quota</strong>

                        <FormInput value={this.state.quota} name="quota" type="number" onChange={this.onTextChange}
                                   size="md"
                                   placeholder="Enter the quota"/>
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

                {/** HEADER PHOTO  */}
                <div className="mt-2">
                    <strong className={formInputLabel}>Select Header Photo</strong>
                    <Row>
                        <Col lg="10" md="10" sm="10" xs="10" className="pr-0">
                            <div className="custom-file mb-3">
                                <input type="file" name="image_url" onChange={e => this.onFileUpload(e)}
                                       className="custom-file-input"
                                       id="customFile2">

                                </input>
                                <label className="custom-file-label" htmlFor="customFile2">
                                    {this.state.image_url}
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

                {Object.values(this.props.registrationQuestionsDom).map((question) => {
                    return question
                })}


            </div>
        )
    }

    onFileUpload(e) {
        this.setState({[e.target.name]: [e.target.value]})
    }

    validateForm = () => {

        const {club_selection, name, description, start_date, end_date, location, quota} = this.state
        const {registrationQuestions} = this.props
        let validation = true

        const formErrors = []
        if (!club_selection) {
            formErrors.push("Please select the club.")
            validation = false
        }
        if (!name) {
            formErrors.push("Event name is required.")
            validation = false
        }
        if (!description) {
            formErrors.push("Event description is required.")
            validation = false
        }
        if (!start_date) {
            formErrors.push("Event start date is required.")
            validation = false
        }
        if (!end_date) {
            formErrors.push("Event end date is required.")
            validation = false
        }
        if (!location) {
            formErrors.push("Event location is required.")
            validation = false
        }
        if (!quota) {
            formErrors.push("Event quota is required.")
            validation = false
        }

        let questions = Object.values(registrationQuestions)
        if (questions.length > 0) {
            questions.map((question, qInd) => {
                const {title, explanation, question_options, question_type} = question
                if (!title) {
                    formErrors.push(`Registration question ${qInd + 1} title is required!`)
                    validation = false
                }
                if (!explanation) {
                    formErrors.push(`Registration question ${qInd + 1} explanation is required!`)
                    validation = false
                }

                let options = Object.values(question_options)
                if (question_type === "choice" && options.length > 0) {
                    options.map((option, oInd) => {
                        const {option_text} = option
                        if (!option_text) {
                            formErrors.push(`Registration question ${oInd + 1} option ${oInd + 1} is required!`)
                            validation = false
                        }
                        return true;
                    })

                }
                return true;
            })
        }
        this.setState({formErrors: formErrors})
        return validation
    }

    onSubmitForm = () => {

        // Validate form
        if (!this.validateForm())
            return

        // Get form field data
        let {
            club_selection, name, description, start_date, end_date, location, quota, image_url
        } = this.state


        // The fields that will be send to backend
        const registrationQuestions = this.props.registrationQuestions
        const created_by = club_selection

        if(!image_url)
            image_url = "no_event_image.png"

        const eventData = {
            name, description, start_date, end_date, location, quota, image_url,
            created_by
        }
        eventData['registration_questions'] = registrationQuestions

        // Send event data to backend server
        EventService.createNewEvent(eventData)
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
                <SuccessModal modalTitle="Event created!" modalMessage="You are ready to share event!"
                              ref={this.successDialog} history={this.props.history}/>
            </div>


        );
    }

}

const mapStateToProps = (state) => {
    return {
        loggedUser: state.auth.user,
        loginPending: state.auth.pending,
        registrationQuestions: state.questionForm.questions,
        registrationQuestionsDom: state.questionForm.questionsDom,
    }
}

export default withRouter(connect(mapStateToProps, {addQuestionFormAction})(CreateEventForm));
