import React from "react";
import {Alert} from "shards-react";

export default class SuccessAlertWithNavigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
        };

    }

    showAlert = () => {
        this.setState({visible: true});
    }

    render() {
        const {message} = this.props

        return (
            <div>
                <Alert className="mb-3" open={this.state.visible} theme="danger">
                    <b>{message}</b>
                </Alert>
            </div>
        );
    }
}