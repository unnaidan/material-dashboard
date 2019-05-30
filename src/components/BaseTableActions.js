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

    isEmpty = () => {
        const { selection } = this.props
        return !selection.length
    }

    render() {
        const { open } = this.state
        const {
            newPath,
            deletePath,
            classes
        } = this.props
        const { plusIcon } = classes

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
                                to={newPath}
                            >
                                <Plus className={plusIcon} />
                                Шинэ
                            </Button>
                        </Grid>
                        <Grid item>
                            <IconButton
                                color="secondary"
                                children={<Delete />}
                                onClick={this.open}
                                disabled={this.isEmpty()}
                                style={{
                                    padding: 6
                                }}
                            />
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
