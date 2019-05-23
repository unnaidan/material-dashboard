import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'

const styles = theme => ({
    button: {
        marginBottom: theme.spacing.unit * 3
    },
    icon: {
        marginRight: theme.spacing.unit
    }
})

class BaseNewButton extends Component {
    render() {
        const { classes, ...restProps } = this.props

        return (
            <Button
                {...restProps}
                className={classes.button}
                color="primary"
                variant="contained"
            >
                <AddIcon className={classes.icon} />
                Шинэ
            </Button>
        )
    }
}

export default withStyles(styles)(BaseNewButton)
