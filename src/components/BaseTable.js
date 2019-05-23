import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    Divider,
    LinearProgress,
    InputBase,
    Paper
} from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import {
    SearchState,
    SortingState,
    SelectionState,
    PagingState,
    IntegratedSorting,
    IntegratedSelection,
    IntegratedFiltering,
    CustomPaging,
} from '@devexpress/dx-react-grid'
import {
    Grid,
    Table,
    TableHeaderRow,
    TableSelection,
    PagingPanel
} from '@devexpress/dx-react-grid-material-ui'
import axios from './../plugins/axios'

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

const tableMessages = {
    noData: 'Дата байхгүй'
}

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
            items: [],
            selection: [],
            search: '',
            fetching: false,
            sortBy: 'created',
            sortOrder: 'desc',
            page: 1,
            rowsPerPage: 30,
            total: 0
        }

        this.sort = this.sort.bind(this)
    }

    componentDidMount() {
        this.fetchData()
    }

    select = selection => this.setState({ selection })

    handleSearch = e => {
        this.setState({
            search: e.target.value
        }, () => {
            this.fetchData()
        })
    }

    sort = sorting => {
        const {
            direction,
            columnName
        } = sorting.shift()

        this.setState({
            sortBy: columnName,
            sortOrder: direction
        }, () => {
            this.fetchData()
        })
    }

    paginate = page => {
        this.setState({
            page: page + 1
        }, () => {
            this.fetchData()
        })
    }

    fetchData = async () => {
        this.setState({
            fetching: true
        })

        const {
            sortBy,
            sortOrder,
            search,
            page,
            rowsPerPage
        } = this.state

        try {
            const {
                total,
                currentPage,
                data
            } = await axios.get('users', {
                params: {
                    sortBy,
                    sortOrder,
                    search,
                    page: page,
                    rowsPerPage
                }
            })

            this.setState({
                items: data,
                fetching: false,
                page: currentPage,
                total
            })
        } catch (e) {
            //
        }
    }

    render() {
        const {
            items,
            selection,
            search,
            fetching,
            sortBy,
            sortOrder,
            page,
            rowsPerPage,
            total
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
                    onChange={this.handleSearch}
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
                {fetching && <LinearProgress />}
                <Grid
                    rows={items}
                    columns={columns}
                >
                    <SearchState value={search} />
                    <IntegratedFiltering />
                    <SortingState
                        sorting={[{ columnName: sortBy, direction: sortOrder }]}
                        onSortingChange={this.sort}
                    />
                    <IntegratedSorting />
                    <PagingState
                        currentPage={page - 1}
                        onCurrentPageChange={this.paginate}
                        pageSize={rowsPerPage}
                    />
                    <CustomPaging totalCount={total} />
                    <SelectionState
                        selection={selection}
                        onSelectionChange={this.select}
                    />
                    <IntegratedSelection />
                    <PagingPanel />
                    <Table
                        messages={tableMessages}
                        cellComponent={TableCell}
                    />
                    <TableHeaderRow
                        cellComponent={Cell}
                        showSortingControls
                    />
                    <TableSelection showSelectAll />
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(styles)(BaseTable)
