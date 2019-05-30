import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { Dashboard } from './../layouts'
import {
    BaseTable,
    BaseTableActions
} from './../components'

const styles = theme => ({
    //
})

class Users extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Хэрэглэгч',
            columns: [
                {
                    name: 'name',
                    title: 'Нэр'
                },
                {
                    name: 'email',
                    title: 'И-мэйл хаяг'
                },
                {
                    name: 'created',
                    title: 'Үүсгэсэн'
                },
                {
                    name: 'updated',
                    title: 'Шинэчилсэн'
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
                <BaseTableActions
                    newUrl="/users/new"
                    deletePath="/users/mass/destroy"
                />
                <BaseTable
                    path="users"
                    columns={columns}
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(Users)
