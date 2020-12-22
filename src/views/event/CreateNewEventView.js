import React, {PureComponent} from 'react'
import {Row} from "reactstrap";
import Container from "react-bootstrap/Container";
import {withRouter} from 'react-router';

/**
 *  'Create new event' view.
 *
 *  @created    11/27/2020
 *  @author Umut Emre Bayramoglu
 */

class CreateNewEventView extends PureComponent {

    render() {
        return (
            <Container fluid>
                <Row className="h-100">
                   CREATE NEW EVENT VIEW
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