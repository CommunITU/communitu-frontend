import React from "react";
import { Alert} from "shards-react";

export default class SuccessAlertWithNavigation extends React.Component {
    constructor(props) {
        super(props);

        this.interval = null;
        this.state = {
            visible: false,
            countdown: 0,
            timeUntilDismissed: 3
        };

    }

    showAlert = () => {
        this.clearInterval();
        this.setState({ visible: true, countdown: 0, timeUntilDismissed: 3 });
        this.interval = setInterval(this.handleTimeChange, 1000);
    }

    handleTimeChange = () =>  {
        if (this.state.countdown < this.state.timeUntilDismissed - 1) {
            this.setState({
                ...this.state,
                ...{ countdown: this.state.countdown + 1 }
            });
            return;
        }

        this.setState({ ...this.state, ...{ visible: false } });
        this.clearInterval();
        this.props.history.push("/")
    }

    clearInterval = () =>  {
        clearInterval(this.interval);
        this.interval = null;
    }

    render() {
        const {message} = this.props

        return (
            <div>
                <Alert className="mb-3" open={this.state.visible} theme="success">
                    <b>{message} You will be redirected in {" "}
                        {this.state.timeUntilDismissed - this.state.countdown} seconds!</b>
                </Alert>
            </div>
        );
    }
}