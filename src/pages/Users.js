import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import { Dashboard } from './../layouts'
import {
    ActionDelete,
    ActionNewButton,
    ActionUpdateButton,
    BaseTable,
    BaseTableActions
} from './../components'
import { pathJoin } from './../utils/helpers'

const columns = [
    {
        name: 'name',
        title: 'Нэр'
    },
    {
        name: 'email',
        title: 'И-мэйл хаяг'
    },
    {
        name: 'createdAt',
        title: 'Бүртгүүлсэн'
    },
    {
        getCellValue: ({ _id }) => <ActionUpdateButton path={pathJoin('users', _id)} />
    }
]

const dateColumns = [
    'createdAt', 'updatedAt'
]

export default class Users extends Component {
    constructor(props) {
        super(props)
        this.table = React.createRef()
    }

    fetchData = () => {
        return this.table.current.fetchData()
    }

    render() {
        return (
            <Dashboard title="Хэрэглэгч">
                <BaseTableActions>
                    <Grid item>
                        <ActionNewButton path="/users/new" />
                    </Grid>
                    <Grid item>
                        <ActionDelete
                            path="/users/mass/destroy"
                            onDelete={this.fetchData}
                        />
                    </Grid>
                </BaseTableActions>
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
