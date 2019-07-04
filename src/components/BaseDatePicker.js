import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import MomentUtils from '@date-io/moment'
import {
    MuiPickersUtilsProvider,
    DatePicker
} from '@material-ui/pickers'

const styles = theme => ({
    //
})

class BaseDatePicker extends Component {
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
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                    value={value}
                    onChange={onChange}
                    label={label}
                    format="YYYY-MM-DD"
                    inputVariant="outlined"
                    margin="normal"
                    fullWidth
                    clearable
                />
            </MuiPickersUtilsProvider>
        )
    }
}

export default withStyles(styles)(BaseDatePicker)
