import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {withRouter} from "react-router";


const ITEM_HEIGHT = 48;

function EventOwnerOptionsMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
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
        props.history.push(`/events/${event.id}/delete`)
    };


    return (
        <div>
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