import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

class EventSuccessAlert extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDialog: false
        }
    }

    handleClickOpen = () => {
        this.setState({showDialog: true})
    };

    handleClose = () => {
        this.setState({showDialog: false})
    };

    handleNavigation = () => {
        this.setState({showDialog: false})
        this.props.history.push("/")
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.showDialog}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">

                    <DialogTitle id="alert-dialog-title">
                        <h5 class="text-center my-auto">
                            <b>Club Created!</b>
                        </h5>
                    </DialogTitle>

                    <DialogContent dividers>
                        <DialogContentText id="alert-dialog-description my-auto">
                            <div class="success-dialog text-center">
                                <h5><b>You are ready to organize events!</b></h5>
                                <img alt="created-successfully" src={require('../../assets/images/tick-gif.gif').default}/>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleNavigation} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default EventSuccessAlert;
