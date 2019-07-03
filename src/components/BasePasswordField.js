import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import {
    IconButton,
    InputAdornment,
    TextField
} from '@material-ui/core'
import {
    Eye,
    EyeOff
} from 'mdi-material-ui'

const styles = theme => ({
    //
})

class BasePasswordField extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showPassword: false
        }
    }

    toggleShowPassword = () => {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }))
    }

    render() {
        const {
            label,
            value,
            error,
            onChange
        } = this.props
        const { showPassword } = this.state

        return (
            <TextField
                value={value}
                onChange={onChange}
                label={label}
                error={error}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                                onClick={this.toggleShowPassword}
                            >
                                {showPassword ? <Eye /> : <EyeOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                variant="outlined"
                margin="normal"
                fullWidth
            />
        )
    }
}

export default withStyles(styles)(BasePasswordField)
