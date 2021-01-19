import React, {Component} from 'react';
import {
    Alert,
    Button,
    Card,
    CardBody,
    Col,
    Form,
    FormInput,
    Row
} from "shards-react";
import {withRouter} from "react-router";
import {EventService} from "../../../services/EventService";
import {connect} from "react-redux";
import ReactQuill from "react-quill";
import {DatePicker} from "../../../util/DatePicker";
import CIcon from "@coreui/icons-react";
import {freeSet} from "@coreui/icons";
import {formInputLabelClasses} from "../../../util/FormUtils";
import SuccessModal from "../../alert/SuccessModal";
import {UploadService} from "../../../services/UploadService";
import {addQuestionOption, addQuestionToForm} from "../../../redux/event/actionCreators";

class UpdateForm extends Component {

    FORM_PANEL_NUM = 2

    constructor(props) {
        super(props);
        this.successDialog = React.createRef()

        this.state = {
            currentTab: 1,
            formErrors: [],
            successMessage: null,
            formAnimation: "slide-from-left",


            name: props.event.name,
            description: props.event.description,
            image_url: props.event.image_url,
            start_date: props.event.start_date,
            end_date: props.event.end_date,
            location: props.event.location,
            created_by: props.event.created_by,
            quota: props.event.quota,

            registration_questions_dom: [],
            club_selection: null,
            event_image_file: null,
            myClubs: [],
        }


    }

    componentDidMount() {
        this.createRegistrationQuestionsForm();
    }

    // createRegistrationQuestionsForm() {
    //     let questions = this.props.event.registration_questions
    //     if (questions) {
    //         this.props.event.registration_questions.map((question) => {
    //             this.props.addQuestionToForm(question.id, {preCreatedQuestion: question});
    //
    //             if (question.type === "choice") {
    //                 question.options.map((option) => {
    //                     let optionDom = <QuestionOption optionId={option.id}/>
    //                     this.props.addQuestionOption(question.id, option.id, optionDom, {preCreatedOption: option})
    //                 })
    //             }
    //
    //             return true;
    //         })
    //
    //     }
    // }

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

    onQuillTextChange = (value) => {
        this.setState({"description": value});
    }

    onDateChange = (field, date) => {
        this.setState({[field]: date});
    }


    onCheckboxChange = (e, opt) => {
        const newState = {};
        let checked = this.state[opt]
        newState[opt] = !checked;
        this.setState({...this.state, ...newState})
    }


    addNewQuestion = () => {
        let questionId = Object.values(this.props.registrationQuestionsDom).length;
        this.props.addQuestionFormAction(questionId)
    }


    formPanelPage1 = () => {
        const formInputLabel = formInputLabelClasses()
        const panelClasses = this.state.formAnimation
        return (

            <div className={panelClasses}>
                <div className="d-flex align-items-center">
                    <h3 className={panelClasses + " mr-auto text-center"}><strong>General Information</strong></h3>
                    <h4 className={panelClasses + " ml-auto"}>{this.state.currentTab}/{this.FORM_PANEL_NUM}</h4>
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

    formPanelPage2 = () => {
        const formInputLabel = formInputLabelClasses()
        const panelClasses = this.state.formAnimation
        return (
            <div className={panelClasses}>
                <div className="d-flex align-items-center">
                    <h3 className={panelClasses + " mr-auto text-center"}><strong>Profile and Header Photos</strong>
                    </h3>
                    <h4 className={panelClasses + " ml-auto"}>{this.state.currentTab}/{this.FORM_PANEL_NUM}</h4>
                </div>
                <hr/>


                {/** CURRENT PHOTO PREVIEW */}
                <div className="text-center">
                    <img alt="event" src={this.state.image_url} style={{width: '50%', height: '50%'}}/>
                </div>


                {/** HEADER PHOTO  */}
                <div className="mt-2">
                    <strong className={formInputLabel}>Select Header Photo</strong>
                    <Row>
                        <Col lg="10" md="10" sm="10" xs="10" className="pr-0">
                            <div className="custom-file mb-3">
                                <input id="eventPhoto" type="file"
                                       name="event_image_file"
                                       onChange={e => this.onFileSelection(e)}
                                       className="custom-file-input">

                                </input>
                                <label className="custom-file-label"
                                       htmlFor="eventPhoto">
                                    {this.state.event_image_file ? this.state.event_image_file.name : ""}
                                </label>
                            </div>
                        </Col>
                        <Col lg="2" md="2" sm="2" xs="2" className="text-center pl-0">
                            <Button
                                disabled={!this.state.event_image_file}
                                id="eventPhotoUpload" onClick={this.onFileUpload} className="btn btn-light">
                                Upload
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

    formPanelPage3 = () => {
        const panelClasses = this.state.formAnimation

        return (
            <div className={panelClasses}>
                <div className="d-flex align-items-center">
                    <h3 className={panelClasses + " mr-auto text-center"}><strong>Registration Questions Form</strong>
                    </h3>
                    <h4 className={panelClasses + " ml-auto"}>{this.state.currentTab}/{this.FORM_PANEL_NUM}</h4>
                </div>

                <hr/>


                <Col onClick={this.addNewQuestion} className="registration-add-question my-3">
                    <CIcon size="xl" color="danger" content={freeSet.cilPlus}/> Add New
                    Question
                </Col>

                {Object.values(this.props.registrationQuestionsDom).map((question) => {
                    return question
                })}


            </div>
        )
    }

    onFileSelection(e) {
        this.setState({[e.target.name]: e.target.files[0]})
    }

    onFileUpload = (e) => {
        const {id} = e.target
        let file = null

        if (id === "eventPhotoUpload")
            file = this.state.event_image_file

        UploadService.uploadEventPhoto(file)
            .then(resp => {
                if (resp.status === 200) {
                    let file_url = resp.data.file_url
                    if (id === "eventPhotoUpload")
                        this.setState({'image_url': file_url})

                    console.log("File uploaded !")
                }
            })
            .catch(err => {
                console.log("File could not be uploaded !")
            })

    }

    validateForm = () => {

        const {name, description, start_date, end_date, location, quota} = this.state
        // const {registrationQuestions} = this.props
        let validation = true

        const formErrors = []

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
        if (this.state.event_image_file && !this.state.image_url) {
            formErrors.push("Please upload the selected image.")
            validation = false
        }

        // let questions = Object.values(registrationQuestions)
        // if (questions.length > 0) {
        //     questions.map((question, qInd) => {
        //         const {title, explanation} = question
        //         if (!title) {
        //             formErrors.push(`Registration question ${qInd + 1} title is required!`)
        //             validation = false
        //         }
        //         if (!explanation) {
        //             formErrors.push(`Registration question ${qInd + 1} explanation is required!`)
        //             validation = false
        //         }
        //
        //         // let options = Object.values(question_options)
        //         // if (question_type === "choice" && options.length > 0) {
        //         //     options.map((option, oInd) => {
        //         //         const {option_text} = option
        //         //         if (!option_text) {
        //         //             formErrors.push(`Registration question ${oInd + 1} option ${oInd + 1} is required!`)
        //         //             validation = false
        //         //         }
        //         //         return true;
        //         //     })
        //         // }
        //         return true;
        //     })
        // }
        this.setState({formErrors: formErrors})
        return validation
    }

    onSubmitForm = () => {

        // Validate form
        if (!this.validateForm())
            return

        // Get form field data
        let {
            name, description, start_date, end_date, location, quota, image_url, created_by
        } = this.state


        // The fields that will be send to backend
        // const registrationQuestions = this.props.registrationQuestions

        if (!image_url)
            image_url = "no_event_image.png"

        const eventData = {
            name, description, start_date, end_date, location, quota, image_url,
            created_by, id: this.props.event.id
        }

        console.log(eventData)
        // Send updated event data to backend server
        EventService.updateEventById(eventData)
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

        const {event} = this.props
        const {currentTab, formErrors} = this.state
        const formPanelPage1 = this.formPanelPage1()
        const formPanelPage2 = this.formPanelPage2()
        // const formPanelPage3 = this.formPanelPage3()

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

                            {/*{currentTab === 3 && formPanelPage3}*/}

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
                                    Update!
                                </Button>
                            </div>}
                        </Form>
                    </CardBody>
                </Card>

                {/** SUCCESS ALERT DIALOG */}
                <SuccessModal modalTitle="Event updated!" modalMessage=""
                              redirectUrl = {"/events/"+event.id}
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

export default withRouter(connect(mapStateToProps, {addQuestionToForm, addQuestionOption})(UpdateForm));
