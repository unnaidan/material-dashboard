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
import { ArrowRight } from 'mdi-material-ui'
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
    logo: {
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

class PasswordReset extends Component {
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
        this.resetPassword = this.resetPassword.bind(this)
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

    resetPassword = async e => {
        e.preventDefault()

        this.setState({
            disabled: true
        })

        const {
            email,
            password,
            passwordConfirm
        } = this.state

        const { match, history } = this.props
        const { token } = match.params

        try {
            await axios.post('reset/password', {
                email,
                password,
                passwordConfirm,
                token
            })

            this.setState({
                open: true
            })

            setTimeout(() => {
                history.push('/signin')
            }, 3000)
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
            open,
            disabled
        } = this.state
        const {
            root,
            typography,
            logo,
            button,
            extendedIcon
        } = classes

        return (
            <App>
                <Grid
                    className={root}
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
                            className={logo}
                            src="/static/images/logo.png"
                            alt="Logo"
                        />
                        <Typography
                            variant="h6"
                            className={typography}
                            align="center"
                        >
                            Шинэ нууц үг оруулна уу
                        </Typography>
                        <form
                            onSubmit={this.resetPassword}
                            autoComplete="off"
                            noValidate
                        >
                            <TextField
                                label="И-мэйл хаяг"
                                value={email}
                                onChange={this.handleChange('email')}
                                type="email"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                autoFocus
                            />
                            <TextField
                                label="Нууц үг"
                                value={password}
                                onChange={this.handleChange('password')}
                                type="password"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label="Нууц үг дахин оруулна уу"
                                value={passwordConfirm}
                                onChange={this.handleChange('passwordConfirm')}
                                type="password"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <Fab
                                className={button}
                                disabled={disabled}
                                variant="extended"
                                type="submit"
                            >
                                Нууц үг шинэчлэх
                                <ArrowRight className={extendedIcon} />
                            </Fab>
                        </form>
                    </Grid>
                </Grid>
                <Snackbar
                    open={open}
                    onClose={this.handleClose}
                    message="Таны нууц үг шинэчлэгдлээ"
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                />
            </App>
        )
    }
}

export default withStyles(styles)(PasswordReset)
