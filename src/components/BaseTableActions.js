import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import {
    Box,
    Grid,
    Button,
    IconButton
} from '@material-ui/core'
import {
    Plus,
    Delete
} from 'mdi-material-ui'
import DeleteDialog from './DeleteDialog'

const styles = theme => ({
    plusIcon: {
        marginRight: theme.spacing(1)
    }
})

class BaseTableActions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false
        }
    }

    open = () => {
        this.setState({
            open: true
        })
    }

    close = () => {
        this.setState({
            open: false
        })
    }

    render() {
        const { open } = this.state
        const {
            newUrl,
            deletePath,
            selection,
            classes
        } = this.props
        const {
            plusIcon
        } = classes

        return (
            <div>
                <Box mb={3}>
                    <Grid
                        justify="flex-end"
                        spacing={2}
                        container
                    >
                        <Grid item>
                            <Button
                                color="primary"
                                variant="contained"
                                component={Link}
                                to={newUrl}
                            >
                                <Plus className={plusIcon} />
                                Шинэ
                            </Button>
                        </Grid>
                        <Grid item>
                            <IconButton
                                color="secondary"
                                onClick={this.open}
                                disabled={!selection.length}
                                style={{
                                    padding: 6
                                }}
                            >
                                <Delete />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
                <DeleteDialog
                    open={open}
                    onClose={this.close}
                    path={deletePath}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    selection: state.theme.selection
})

const component = withStyles(styles)(BaseTableActions)

export default connect(mapStateToProps)(component)
