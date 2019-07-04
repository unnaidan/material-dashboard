import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles'
import { grey } from '@material-ui/core/colors'
import {
    Grid,
    Typography,
    TextField,
    Fab
} from '@material-ui/core'
import { ArrowRight } from 'mdi-material-ui'
import axios from './../plugins/axios'
import { setAuth } from './../redux/auth/actions'
import { App } from './../layouts'
import { BasePasswordField } from './../components'

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    typography: {
        marginTop: 30,
        marginBottom: 30,
        fontWeight: 300,
        color: grey[600]
    },
    logo: {
        display: 'block',
        margin: '50px auto 30px'
    },
    button: {
        display: 'flex',
        margin: '50px auto',
        minWidth: 230
    },
    extendedIcon: {
        marginLeft: 10,
        color: grey[400]
    },
    br: {
        '@media (max-width: 767px)': {
            display: 'none'
        }
    }
})

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            errors: {},
            disabled: false
        }
    }

    handleChange = name => e => {
        this.setState({
            [name]: e.target.value
        })
    }

    signIn = async e => {
        e.preventDefault()

        this.setState({
            errors: {},
            disabled: true
        })

        const {
            email,
            password
        } = this.state

        const { setAuth, history } = this.props

        try {
            const {
                user,
                token
            } = await axios.post('login', {
                email,
                password
            })

            setAuth(user, token)
            history.push('/')
        } catch (err) {
            if (err.response.status === 422) {
                const { errors } = err.response.data
                this.setState({
                    errors,
                    disabled: false
                })
            }
        }
    }

    render() {
        const { classes } = this.props
        const {
            email,
            password,
            errors,
            disabled
        } = this.state
        const {
            root,
            typography,
            logo,
            button,
            extendedIcon,
            br
        } = classes

        return (
            <App>
                <Grid
                    className={root}
                    justify="center"
                    alignItems="center"
                    spacing={2}
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
                            height="50"
                            className={logo}
                            src="/static/images/logo-small.png"
                            alt="Logo"
                        />
                        <Typography
                            variant="h6"
                            className={typography}
                            align="center"
                        >
                            Hello there! Sign in and start managing <br className={br} /> your app
                        </Typography>
                        <form
                            onSubmit={this.signIn}
                            autoComplete="off"
                            noValidate
                        >
                            <TextField
                                label="И-мэйл хаяг"
                                value={email}
                                error={!!errors.email}
                                onChange={this.handleChange('email')}
                                type="email"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                autoFocus
                            />
                            <BasePasswordField
                                label="Нууц үг"
                                value={password}
                                error={!!errors.password}
                                onChange={this.handleChange('password')}
                            />
                            <Fab
                                className={button}
                                disabled={disabled}
                                color="primary"
                                variant="extended"
                                type="submit"
                            >
                                Нэвтрэх
                                <ArrowRight className={extendedIcon} />
                            </Fab>
                        </form>
                    </Grid>
                </Grid>
            </App>
        )
    }
}

const mapDispatchToProps = {
    setAuth
}

const component = withStyles(styles)(Login)

export default connect(
    null,
    mapDispatchToProps
)(component)
