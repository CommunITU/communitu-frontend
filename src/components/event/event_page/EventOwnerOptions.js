import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {withRouter} from "react-router";
import ConfirmModal from "../../alert/ConfirmModal";
import {EventService} from "../../../services/EventService";


const ITEM_HEIGHT = 48;

function EventOwnerOptionsMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);


    const open = Boolean(anchorEl);
    const event = props.event

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const onUpdateEvent = () => {
        setAnchorEl(null);
        props.history.push(`/events/${event.id}/update`)

    };

    const onDeleteEvent = () => {
        setAnchorEl(null);
        setShowDeleteDialog(() => true)
    };

    const closeDeleteDialog = () => {
        setShowDeleteDialog(() => false);
    }

    const onDeleteConfirmed = () => {
        setShowDeleteDialog(() => false)
        EventService.deleteEventById(event.id)
            .then(resp => {
                setShowDeleteDialog(() => false)
                props.history.push("/")
            })
            .catch(err => {
                if(err.response && err.response.data){
                    console.log(err.response.data.message)
                }
            })
    }

    return (
        <div>
            <ConfirmModal show={showDeleteDialog}
                          onClose={closeDeleteDialog}
                          onConfirm={onDeleteConfirmed}
                          contextTitle="Delete Event"
                          contextText="Event will be deleted, do you confirm?">

            </ConfirmModal>

            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >

                <MenuItem key='update' onClick={onUpdateEvent}>
                    Update Event
                </MenuItem>

                <MenuItem key='delete' onClick={onDeleteEvent}>
                    Delete Event
                </MenuItem>

            </Menu>
        </div>
    );
}


export default withRouter(EventOwnerOptionsMenu);