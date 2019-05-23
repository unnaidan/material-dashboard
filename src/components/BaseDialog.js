import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { teal } from '@material-ui/core/colors'
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from '@material-ui/core'
import { Create as CreateIcon } from '@material-ui/icons'

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
        backgroundColor: teal[500],
        color: '#fff',

        '&:hover': {
            backgroundColor: teal[700]
        }
    },
    avatar: {
        backgroundColor: teal[50]
    },
    icon: {
        color: teal[500]
    }
})

class BaseDialog extends Component {
    render() {
        const {
            open,
            title,
            fields,
            classes,
            onClose,
            onSubmit
        } = this.props

        return (
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth={true}
            >
                <DialogTitle
                    className={classes.title}
                    disableTypography
                >
                    <Avatar className={classes.avatar}>
                        <CreateIcon className={classes.icon} />
                    </Avatar>
                    <Typography
                        variant="h6"
                        className={classes.typography}
                    >
                        {title}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    {fields}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={onSubmit}
                        className={classes.submitButton}
                        variant="contained"
                    >
                        Хадгалах
                    </Button>
                    <Button onClick={onClose}>
                        Хаах
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(BaseDialog)
