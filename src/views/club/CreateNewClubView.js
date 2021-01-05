import React, {PureComponent} from 'react'
import Container from "react-bootstrap/Container";
import {Col, Row} from "shards-react";
import CreateClubForm from "../../components/club/CreateClubForm";

/**
 *  'Create new club' view.
 *
 *  @created    11/27/2020
 *  @author Umut Emre Bayramoglu
 */

class CreateNewClubView extends PureComponent {

    componentDidMount() {
    }

    render() {
        return (
            <Container fluid className="p-0 header-v2">

                <Row className="justify-content-center align-items-center py-4">
                    <div>
                        <h4 className="header-title mt-4 text-center">Create your club !</h4>
                        <h3 className="text-white-50 text-center">and start to organize events</h3>
                    </div>
                </Row>

                <Row className="justify-content-center mt-4 mx-2">
                    <Col className="justify-content-center" lg={5} md={10} xs={12} sm={10}>
                        <CreateClubForm/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default (CreateNewClubView)