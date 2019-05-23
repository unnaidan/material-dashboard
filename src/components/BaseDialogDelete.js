import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
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

const styles = theme => ({
    title: {
        display: 'flex',
        alignItems: 'center',
    },
    typography: {
        flexGrow: 1,
        marginLeft: 16,
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
    render() {
        const {
            open,
            classes,
            onClose,
            onSubmit
        } = this.props

        return (
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle
                    className={classes.title}
                    disableTypography
                >
                    <Avatar className={classes.avatar}>
                        <Delete className={classes.icon} />
                    </Avatar>
                    <Typography
                        variant="h6"
                        className={classes.typography}
                    >
                        Устгах
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={onSubmit}
                        className={classes.submitButton}
                        variant="contained"
                    >
                        Устгах
                    </Button>
                    <Button onClick={onClose}>
                        Болих
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(BaseDialogDelete)
