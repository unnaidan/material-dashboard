import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import {
    Grid,
    IconButton
} from '@material-ui/core'
import { teal, pink } from '@material-ui/core/colors'
import {
    SquareEditOutline,
    Delete
} from 'mdi-material-ui'

const styles = theme => ({
    root: {
        marginBottom: theme.spacing.unit * 3
    },
    button: {
        padding: 6
    },
    edit: {
        color: teal[500]
    },
    delete: {
        color: pink[500]
    }
})

class BaseTableActions extends Component {
    render() {
        const {
            onEdit,
            onDelete,
            selection,
            classes
        } = this.props

        return (
            <div>
                <Grid
                    spacing={8}
                    className={classes.root}
                    container
                >
                    <Grid item>
                        <IconButton
                            onClick={onEdit}
                            disabled={selection.length !== 1}
                            className={classNames(
                                classes.button,
                                classes.edit
                            )}
                        >
                            <SquareEditOutline />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton
                            onClick={onDelete}
                            disabled={!selection.length}
                            className={classNames(
                                classes.button,
                                classes.delete
                            )}
                        >
                            <Delete />
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    selection: state.selection
})

const component = withStyles(styles)(BaseTableActions)

export default connect(mapStateToProps)(component)
