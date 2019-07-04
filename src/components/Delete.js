import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles'
import { pink } from '@material-ui/core/colors'
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from '@material-ui/core'
import { Delete } from 'mdi-material-ui'
import axios from './../plugins/axios'

const styles = theme => ({
    title: {
        display: 'flex',
        alignItems: 'center',
    },
    typography: {
        flexGrow: 1,
        marginLeft: theme.spacing(2),
        fontWeight: 400,
        color: '#43425d'
    },
    submitButton: {
        backgroundColor: pink[500],
        color: '#fff',

        '&:hover': {
            backgroundColor: pink[700]
        }
    },
    avatar: {
        backgroundColor: pink[50]
    },
    icon: {
        color: pink[500]
    }
})

class BaseDialogDelete extends Component {
    constructor(props) {
        super(props)

        this.state = {
            disabled: false
        }
    }

    onSubmit = async () => {
        this.setState({
            disabled: true
        })

        const {
            path,
            selection,
            onClose,
            onDelete
        } = this.props

        try {
            await axios.post(path, {
                ids: selection.map(({ _id }) => _id)
            })

            onClose()

            this.props.dispatch({
                type: 'SELECt',
                items: []
            })

            this.setState({
                disabled: false
            })

            await onDelete()
        } catch (e) {
            //
        }
    }

    render() {
        const {
            open,
            onClose,
            classes
        } = this.props
        const {
            title,
            typography,
            avatar,
            icon,
            submitButton
        } = classes

        return (
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle
                    className={title}
                    disableTypography
                >
                    <Avatar className={avatar}>
                        <Delete className={icon} />
                    </Avatar>
                    <Typography
                        variant="h6"
                        children="Устгах"
                        className={typography}
                    />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={this.onSubmit}
                        className={submitButton}
                        variant="contained"
                    >
                        Тийм
                    </Button>
                    <Button onClick={onClose}>
                        Үгүй
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = state => ({
    selection: state.theme.selection
})

const component = withStyles(styles)(BaseDialogDelete)

export default connect(mapStateToProps)(component)
