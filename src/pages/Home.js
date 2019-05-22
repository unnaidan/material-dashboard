import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Dashboard } from './../layouts'
import { BaseTable } from './../components'

const styles = theme => ({
    //
})

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Нүүр',
            columns: [
                {
                    name: 'name',
                    title: 'Нэр'
                },
                {
                    name: 'email',
                    title: 'И-мэйл хаяг',
                },
                {
                    name: 'phoneNumber',
                    title: 'Утасны дугаар'
                }
            ]
        }
    }

    render() {
        const {
            title,
            columns
        } = this.state

        return (
            <Dashboard title={title}>
                <BaseTable columns={columns} />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(Home)
