import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

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
        const {
            root,
            content
        } = classes

        if (user) {
            return <Redirect to={homeRoute} />
        }

        return (
            <div className={root}>
                <CssBaseline />
                <main className={content}>
                    {children}
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

const component = withStyles(styles)(App)

export default connect(mapStateToProps)(component)
