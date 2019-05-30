import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
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
                
            </Dashboard>
        )
    }
}

export default withStyles(styles)(Home)
