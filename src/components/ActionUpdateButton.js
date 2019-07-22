import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import { teal } from '@material-ui/core/colors'
import { IconButton } from '@material-ui/core'
import { Pencil } from 'mdi-material-ui'

const styles = theme => ({
    root: {
        textAlign: 'right'
    },
    button: {
        color: teal[500]
    }
})

class ActionUpdateButton extends Component {
    render() {
        const { path } = this.props
        const {
            root,
            button
        } = this.props.classes

        return (
            <div className={root}>
                <IconButton
                    to={path}
                    component={Link}
                    className={button}
                    style={{
                        margin: '-14px 0'
                    }}
                >
                    <Pencil />
                </IconButton>
            </div>
        )
    }
}

export default withStyles(styles)(ActionUpdateButton)
