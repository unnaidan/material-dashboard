import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles'
import { pink } from '@material-ui/core/colors'
import {
    Avatar,
    Button,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from '@material-ui/core'
import { Delete } from 'mdi-material-ui'
import { selects } from './../redux/theme/getters'
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
    avatar: {
        backgroundColor: pink[50]
    },
    icon: {
        color: pink[500]
    }
})

class ActionDelete extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            disabled: false
        }
    }

    open = () => {
        this.setState({
            open: true,
            disabled: false
        })
    }

    close = () => {
        this.setState({
            open: false
        })
    }

    massDestroy = async () => {
        this.setState({
            disabled: true
        })

        const {
            path,
            onDelete,
            selects
        } = this.props

        try {
            await axios.post(path, {
                ids: selects.map(({ _id }) => _id)
            })

            this.close()
            await onDelete()

            this.props.dispatch({
                type: 'SELECT',
                selects: []
            })

            this.setState({
                disabled: false
            })
        } catch (e) {
            //
        }
    }

    render() {
        const {
            open,
            disabled
        } = this.state
        const { selects } = this.props
        const {
            title,
            typography,
            avatar,
            icon
        } = this.props.classes

        return (
            <div>
                <IconButton
                    color="secondary"
                    onClick={this.open}
                    disabled={selects.length === 0}
                    style={{
                        padding: 6
                    }}
                >
                    <Delete />
                </IconButton>
                <Dialog
                    open={open}
                    onClose={this.close}
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
                            disabled={disabled}
                            onClick={this.massDestroy}
                            color="secondary"
                            variant="contained"
                        >
                            Тийм
                        </Button>
                        <Button onClick={this.close}>
                            Үгүй
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    selects: selects(state)
})

export default connect(mapStateToProps)(withStyles(styles)(ActionDelete))
