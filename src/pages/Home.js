import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Dashboard } from './../layouts'

const styles = theme => ({
    //
})

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Нүүр'
        }
    }

    render() {
        const { title } = this.state

        return (
            <Dashboard title={title}>
                Home
            </Dashboard>
        )
    }
}

export default withStyles(styles)(Home)
