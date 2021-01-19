import React from 'react'
import {Row} from "reactstrap";
import Moment from 'react-moment';
import {LocationCity, SupervisedUserCircle, TodaySharp} from "@material-ui/icons";

export default function EventInfo(props) {
    const {owner, eventLocation, date} = props.info;

    return (
        <div class="mt-2">
            <Row>
                <div class="event-info-label"><SupervisedUserCircle className="ml-2"/>Owner: <b><a
                    href="/">{owner}</a></b></div>

                <div class="event-info-label"><TodaySharp className="ml-2"/>Date: <b><Moment
                    format="HH:MM - DD/MM/YYYY" date={date}/></b></div>

                <div class="event-info-label"><LocationCity className="ml-2" />Location: <b>{eventLocation}</b>
                </div>

                {/*<div class="event-info-label"><HowToReg className="ml-2"/>Quota: <b>{quota}</b></div>*/}

            </Row>

        </div>
    )
}
