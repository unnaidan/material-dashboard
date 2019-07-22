import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
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

export default connect(mapStateToProps)(withStyles(styles)(App))
