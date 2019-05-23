import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { Plus } from 'mdi-material-ui'

const styles = theme => ({
    icon: {
        marginRight: theme.spacing.unit * 2
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
                <Plus className={classes.icon} />
                Шинэ
            </Button>
        )
    }
}

export default withStyles(styles)(BaseNewButton)
