import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { user } from './../redux/getters'

const styles = theme => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    }
})

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            homeRoute: '/'
        }
    }

    render() {
        const {
            user,
            classes,
            children
        } = this.props
        const { homeRoute } = this.state

        if (user) {
            return <Redirect to={homeRoute} />
        }

        return (
            <div className={classes.root}>
                <CssBaseline />
                <main className={classes.content}>
                    {children}
                </main>
            </div>
        )
    }
}

const mapStateToProps = () => ({
    user: user()
})

const component = withStyles(styles)(App)

export default connect(mapStateToProps)(component)
