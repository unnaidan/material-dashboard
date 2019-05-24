import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { user } from './../redux/getters'
import { ThemeContext } from './../theme/context'
import {
    MainBar,
    MainDrawer
} from './../components'

const drawerWidth = 260

const styles = theme => ({
    root: {
        display: 'flex'
    },
    appBarSpacer: {
        height: 56
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        marginLeft: -drawerWidth,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    contentShift: {
        marginLeft: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        })
    }
})

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            drawer: true,
            signinRoute: '/signin',
            mobileDrawer: false,
            toggleDrawer: this.toggleDrawer,
            toggleMobileDrawer: this.toggleMobileDrawer
        }
    }

    toggleDrawer = () => {
        this.setState(state => ({
            drawer: !state.drawer
        }))
    }

    toggleMobileDrawer = () => {
        this.setState(state => ({
            mobileDrawer: !state.mobileDrawer
        }))
    }

    render() {
        const {
            user,
            classes,
            title,
            children
        } = this.props
        const {
            drawer,
            signinRoute
        } = this.state

        if (!user) {
            return <Redirect to={signinRoute} />
        }

        return (
            <ThemeContext.Provider value={this.state}>
                <div className={classes.root}>
                    <CssBaseline />
                    <MainBar title={title} />
                    <MainDrawer />
                    <main
                        className={classNames(classes.content, {
                            [classes.contentShift]: drawer,
                        })}
                    >
                        <div className={classes.appBarSpacer} />
                        {children}
                    </main>
                </div>
            </ThemeContext.Provider>
        )
    }
}

const mapStateToProps = () => ({
    user: user()
})

const component = withStyles(styles)(Dashboard)

export default connect(mapStateToProps)(component)
