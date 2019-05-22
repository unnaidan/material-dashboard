import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    Divider,
    InputBase,
    Paper
} from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import {
    PagingState,
    SearchState,
    SortingState,
    SelectionState,
    IntegratedPaging,
    IntegratedSorting,
    IntegratedSelection,
    IntegratedFiltering
} from '@devexpress/dx-react-grid'
import {
    Grid,
    Table,
    TableHeaderRow,
    TableSelection,
    PagingPanel
} from '@devexpress/dx-react-grid-material-ui'

const styles = theme => ({
    paper: {
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
    },
    search: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: theme.spacing.unit * 8,
        color: 'rgba(0, 0, 0, 0.54)'
    },
    inputRoot: {
        padding: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 8
    },
    input: {
        height: 16,
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit
    }
})

const Cell = ({ classes, ...restProps }) => (
    <TableHeaderRow.Cell
        {...restProps}
        style={{
            fontSize: 14
        }}
    />
)

const TableCell = ({ classes, ...restProps }) => (
    <Table.Cell
        {...restProps}
        style={{
            fontSize: 14,
            fontWeight: 300
        }}
    />
)

class BaseTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [{
                name: 'Найдан',
                email: 'byambanaidan@gmail.com',
                phoneNumber: 89376060
            }, {
                name: 'Алтанзул',
                email: 'byambanaidan@gmail.com',
                phoneNumber: 89376060
            }],
            selection: [],
            search: ''
        }
    }

    handleChange = e => {
        this.setState({
            search: e.target.value
        })
    }

    select = selection => this.setState({ selection })

    render() {
        const {
            items,
            selection,
            search
        } = this.state
        const { classes, columns } = this.props

        const SearchBar = (
            <div style={{
                position: 'relative'
            }}>
                <div className={classes.search}>
                    <SearchIcon />
                </div>
                <InputBase
                    classes={{
                        root: classes.inputRoot,
                        input: classes.input
                    }}
                    value={search}
                    onChange={this.handleChange}
                    type="search"
                    placeholder="Хайх утга оруулна уу"
                    fullWidth
                />
            </div>
        )

        return (
            <Paper
                className={classes.paper}
                square
            >
                {SearchBar}
                <Divider />
                <Grid
                    rows={items}
                    columns={columns}
                >
                    <SearchState value={search} />
                    <IntegratedFiltering />
                    <SortingState defaultSorting={[{ columnName: 'name', direction: 'desc' }]} />
                    <IntegratedSorting />
                    <PagingState
                        defaultCurrentPage={0}
                        pageSize={30}
                    />
                    <SelectionState
                        selection={selection}
                        onSelectionChange={this.select}
                    />
                    <IntegratedPaging />
                    <IntegratedSelection />
                    <Table cellComponent={TableCell} />
                    <TableHeaderRow
                        cellComponent={Cell}
                        showSortingControls
                    />
                    <TableSelection showSelectAll />
                    <PagingPanel />
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(styles)(BaseTable)
