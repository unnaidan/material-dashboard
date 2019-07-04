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

        this.table = React.createRef()

        this.state = {
            title: 'Хэрэглэгч',
            columns: [
                {
                    name: 'email',
                    title: 'И-мэйл хаяг'
                },
                {
                    name: 'createdAt',
                    title: 'Үүсгэсэн'
                },
                {
                    name: 'updatedAt',
                    title: 'Шинэчилсэн'
                }
            ],
            dateColumns: [
                'createdAt', 'updatedAt'
            ]
        }
    }

    onDelete = async () => {
        await this.table.current.fetchData()
    }

    render() {
        const {
            title,
            columns,
            dateColumns
        } = this.state

        return (
            <Dashboard title={title}>
                <BaseTableActions
                    newPath="/users/new"
                    deletePath="/users/mass/destroy"
                    onDelete={this.onDelete}
                />
                <BaseTable
                    path="users"
                    columns={columns}
                    dateColumns={dateColumns}
                    innerRef={this.table}
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(Users)
