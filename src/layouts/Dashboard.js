import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
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
        const { drawer } = this.state
        const {
            root,
            appBarSpacer,
            content,
            contentShift
        } = classes

        if (!user) {
            return <Redirect to="/signin" />
        }

        return (
            <ThemeContext.Provider value={this.state}>
                <div className={root}>
                    <CssBaseline />
                    <MainBar title={title} />
                    <MainDrawer />
                    <main
                        className={classNames(content, {
                            [contentShift]: drawer,
                        })}
                    >
                        <div className={appBarSpacer} />
                        {children}
                    </main>
                </div>
            </ThemeContext.Provider>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

const component = withStyles(styles)(Dashboard)

export default connect(mapStateToProps)(component)
