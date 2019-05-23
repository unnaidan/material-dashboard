import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import {
    Grid,
    Typography,
    TextField,
    Fab
} from '@material-ui/core'
import { ArrowForward as ArrowForwardIcon } from '@material-ui/icons'
import axios from './../plugins/axios'
import { user } from './../redux/getters'
import { setAuth } from './../redux/actions'
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

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            disabled: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.signIn = this.signIn.bind(this)
    }

    handleChange = name => e => {
        this.setState({
            [name]: e.target.value
        })
    }

    signIn = async e => {
        e.preventDefault()

        this.setState({
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
                // Validation
            }
        }
    }

    render() {
        const { classes } = this.props
        const {
            email,
            password,
            disabled
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
                            onSubmit={this.signIn}
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
                            <Fab
                                className={classes.button}
                                disabled={disabled}
                                variant="extended"
                                type="submit"
                            >
                                Нэвтрэх
                                <ArrowForwardIcon className={classes.extendedIcon} />
                            </Fab>
                        </form>
                    </Grid>
                </Grid>
            </App>
        )
    }
}

const mapStateToProps = state => ({
    user: user(state)
})

const mapDispatchToProps = {
    setAuth
}

const component = withStyles(styles)(Login)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(component)
