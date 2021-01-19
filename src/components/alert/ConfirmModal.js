import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {Button} from "shards-react";

export const ConfirmModal = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const {contextText, contextTitle, show, onClose, onConfirm, leftButtonText, rightButtonText} = props
    return (
            <Dialog
                fullScreen={fullScreen}
                open={show}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{contextTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {contextText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  outline pill theme="dark" onClick={onClose}>
                        {leftButtonText ? leftButtonText : "Cancel"}
                    </Button>

                    <Button  outline pill theme="danger" onClick={onConfirm}>
                        {rightButtonText ? rightButtonText : "OK"}
                    </Button>
                </DialogActions>
            </Dialog>
    );
}

export default ConfirmModal;