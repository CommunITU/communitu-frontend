import React, { Component } from 'react'
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

/**
 * Customize date picker theme
 * @type {Theme}
 */
export const customTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#007bff',
            light: '#2a8ffa',
            dark: '#095db5',
        },
        secondary: {
            main: '#86baf0',
        },
    },

    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        fontWeightBold: "bolder",
        fontSize: "11",
    },
})

export class DatePicker_ extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDate: this.props.selectedDate,
        }
    }


    render() {
        const updateDate = (date) => {
            this.setState({selectedDate:date});
            this.props.onDateChange(this.props.name,date)
        }

        const {selectedDate} = this.state;
        const initialDateVal = this.props.value;

        return (

            /**
             * Date time picker component.
             */
            <MuiThemeProvider theme={customTheme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker value={selectedDate ? selectedDate : initialDateVal} onChange={updateDate} />
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>

        )
    }
}
