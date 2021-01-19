import React, {PureComponent} from 'react'
import {Row} from "reactstrap";
import Container from "react-bootstrap/Container";
import {withRouter} from 'react-router';
import {Col} from "shards-react";
import UpdateEventForm from "../../components/event/update_form/UpdateEventForm";
import {EventService} from "../../services/EventService";
import LoadingIconSmall from "../../components/alert/LoadingIconSmall";

class UpdateEventView extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            event: null,
            eventLoading: true
        }
    }

    componentDidMount() {
        this.fetchEvent()
    }

    fetchEvent = () => {
        const {eventId} = this.props.match.params
        this.setState({eventLoading: true})
        EventService.getEventById(eventId)
            .then(resp => {
                this.setState({eventLoading: false})
                if (resp.status === 200) {
                    let event = resp.data.event
                    event['id'] = eventId
                    this.setState({event: event})
                }

            })
            .catch(err => {
                this.setState({eventLoading: false})
                if (err.response && err.response.data)
                    console.log(err.response.data.message)
            })
    }

    render() {
        return (
           <React.Fragment>

               {this.state.eventLoading && <LoadingIconSmall style={{width: "50px", height: "50px", marginTop:"50px"}} />}
               {!this.state.eventLoading && this.state.event &&
               <Container fluid className="p-0 header-v2">
                   <Row className="justify-content-center align-items-center py-4">
                       <div>
                           <h4 className="header-title mt-4 text-center">Update event</h4>
                           <h3 className="text-white-50 text-center">{this.state.event.name}</h3>
                       </div>
                   </Row>

                   <Row className="justify-content-center mt-4 mx-2">
                       <Col className="justify-content-center" lg={5} md={10} xs={12} sm={10}>
                           <UpdateEventForm event={this.state.event}/>
                       </Col>
                   </Row>

               </Container>}
           </React.Fragment>
        )
    }
}

export default withRouter(UpdateEventView)