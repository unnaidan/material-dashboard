import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import {
    Grid,
    Snackbar,
    Typography,
    TextField,
    Fab
} from '@material-ui/core'
import { ArrowForward as ArrowForwardIcon } from '@material-ui/icons'
import axios from './../plugins/axios'
import { App } from './../layouts'

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    typography: {
        marginTop: 50,
        marginBottom: 30,
        fontWeight: 300,
        color: grey[600]
    },
    image: {
        display: 'block',
        margin: '50px auto'
    },
    button: {
        display: 'flex',
        margin: '50px auto',
        minWidth: 230,
        boxShadow: '0 24px 38px rgba(0, 0, 0, 0.14)',
        backgroundColor: '#fff'
    },
    extendedIcon: {
        marginLeft: 10,
        color: grey[600]
    }
})

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            passwordConfirm: '',
            open: false,
            disabled: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.register = this.register.bind(this)
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    handleChange = name => e => {
        this.setState({
            [name]: e.target.value
        })
    }

    register = async e => {
        e.preventDefault()

        this.setState({
            disabled: true
        })

        const {
            email,
            password,
            passwordConfirm
        } = this.state

        try {
            await axios.post('register', {
                email,
                password,
                passwordConfirm
            })

            this.setState({
                email: '',
                password: '',
                passwordConfirm: '',
                open: true,
                disabled: false
            })
        } catch (err) {
            if (err.response.status === 422) {
                // Validation
            }
        }
    }

    render() {
        const { classes } = this.props
        const {
            email,
            password,
            passwordConfirm,
            disabled,
            open
        } = this.state

        return (
            <App>
                <Grid
                    className={classes.root}
                    justify="center"
                    alignItems="center"
                    spacing={16}
                    container
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={5}
                        xl={4}
                    >
                        <img
                            height="40"
                            className={classes.image}
                            src="/images/logo.png"
                            alt="Logo"
                        />
                        <Typography
                            variant="h6"
                            className={classes.typography}
                            align="center"
                        >
                            Hello there! Sign in and start managing <br /> your app
                        </Typography>
                        <form
                            onSubmit={this.register}
                            autoComplete="off"
                            noValidate
                        >
                            <TextField
                                label="И-мэйл хаяг"
                                value={email}
                                onChange={this.handleChange('email')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                autoFocus
                            />
                            <TextField
                                label="Нууц үг"
                                value={password}
                                onChange={this.handleChange('password')}
                                variant="outlined"
                                margin="normal"
                                type="password"
                                fullWidth
                            />
                            <TextField
                                label="Нууц үг дахин оруулна уу"
                                value={passwordConfirm}
                                onChange={this.handleChange('passwordConfirm')}
                                variant="outlined"
                                margin="normal"
                                type="password"
                                fullWidth
                            />
                            <Fab
                                className={classes.button}
                                disabled={disabled}
                                variant="extended"
                                type="submit"
                            >
                                Бүртгүүлэх
                                <ArrowForwardIcon className={classes.extendedIcon} />
                            </Fab>
                        </form>
                    </Grid>
                </Grid>
                <Snackbar
                    open={open}
                    onClose={this.handleClose}
                    message="Таны и-мэйл хаяг руу баталгаажуулах холбоос илгээлээ"
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                />
            </App>
        )
    }
}

export default withStyles(styles)(Register)
