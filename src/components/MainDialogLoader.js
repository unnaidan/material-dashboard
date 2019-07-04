import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles'
import {
    Dialog,
    DialogContent,
    Typography,
    LinearProgress
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

const styles = theme => ({
    dark: {
        padding: theme.spacing(2),
        backgroundColor: grey[800],
        color: theme.palette.primary.contrastText
    },
    progress: {
        height: 7,
        marginTop: theme.spacing(2),
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },
    prgoressBar: {
        backgroundColor: theme.palette.primary.contrastText
    }
})

class MainDialogLoader extends Component {
    constructor(props) {
        super(props)

        this.state = {
            //
        }
    }

    render() {
        const {
            dark,
            progress,
            prgoressBar
        } = this.props.classes
        const { open } = this.props

        return (
            <div>
                <Dialog
                    open={open}
                    maxWidth="xs"
                    fullWidth
                >
                    <DialogContent className={dark}>
                        <Typography
                            variant="body2"
                            children="Ачааллаж байна"
                        />
                        <LinearProgress
                            color="primary"
                            classes={{
                                root: progress,
                                barColorPrimary: prgoressBar
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    open: state.theme.loading
})

const component = withStyles(styles)(MainDialogLoader)

export default connect(mapStateToProps)(component)
