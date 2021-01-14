import React, {PureComponent} from 'react'
import {Row} from "reactstrap";
import Container from "react-bootstrap/Container";
import {withRouter} from 'react-router';
import CreateEventForm from "../../components/event/create_form/CreateEventForm";
import {Col} from "shards-react";

/**
 *  'Create new event' view.
 *
 *  @created    11/27/2020
 *  @author Umut Emre Bayramoglu
 */

class CreateNewEventView extends PureComponent {

    render() {
        return (
            <Container fluid className="p-0 header-v2">

                <Row className="justify-content-center align-items-center py-4">
                    <div>
                        <h4 className="header-title mt-4 text-center">Create your event !</h4>
                        <h3 className="text-white-50 text-center">and get together</h3>
                    </div>
                </Row>

                <Row className="justify-content-center mt-4 mx-2">
                    <Col className="justify-content-center" lg={5} md={10} xs={12} sm={10}>
                        <CreateEventForm/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

// const mapStateToProps = (state) => {
//     console.log(state)
//     return {
//         isLoggedIn: state.auth.isLoggedIn
//     }
// }

export default withRouter(CreateNewEventView)