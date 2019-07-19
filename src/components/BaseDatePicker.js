import React, { Component } from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
    MuiPickersUtilsProvider,
    DatePicker
} from '@material-ui/pickers'

export default class BaseDatePicker extends Component {
    constructor(props) {
        super(props)

        this.state = {
            //
        }
    }

    render() {
        const {
            value,
            onChange,
            label
        } = this.props

        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    value={value}
                    onChange={onChange}
                    label={label}
                    format="yyyy-MM-dd"
                    inputVariant="outlined"
                    margin="none"
                    fullWidth
                    clearable
                />
            </MuiPickersUtilsProvider>
        )
    }
}
