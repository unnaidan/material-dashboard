import React, { Component } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/styles'
import {
    Snackbar,
    SnackbarContent,
    IconButton
} from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import { Close } from 'mdi-material-ui'

const styles = theme => ({
    error: {
        backgroundColor: theme.palette.error.dark
    },
    success: {
        backgroundColor: green[700]
    }
})

class BaseSnackbar extends Component {
    static defaultProps = {
        type: 'success'
    }

    constructor(props) {
        super(props)

        this.state = {
            //
        }
    }

    render() {
        const {
            open,
            onClose,
            type,
            message
        } = this.props
        const {
            error,
            success
        } = this.props.classes

        return (
            <div>
                <Snackbar
                    open={open}
                    onClose={onClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    ClickAwayListenerProps={{
                        mouseEvent: false
                    }}
                >
                    <SnackbarContent
                        className={classNames({
                            [error]: type === 'error',
                            [success]: type === 'success'
                        })}
                        message={
                            <span>
                                {message}
                            </span>
                        }
                        action={
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={onClose}
                            >
                                <Close />
                            </IconButton>
                        }
                    />
                </Snackbar>
            </div>
        )
    }
}

export default withStyles(styles)(BaseSnackbar)
